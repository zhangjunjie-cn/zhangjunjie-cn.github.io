#!/usr/bin/env node
/**
 * 批量压缩视频：转码 + faststart（把 moov 移到文件头，浏览器才能边下边播）。
 *
 * 用法见 `pnpm video --help`。默认处理 docs/public/video 下的 mp4，
 * 原地替换，原文件备份到系统临时目录。
 */
import { spawnSync } from 'node:child_process'
import { closeSync, copyFileSync, existsSync, mkdirSync, openSync, readSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, extname, join, resolve } from 'node:path'

const DEFAULT_DIR = 'docs/public/video'
/** 脚本写入的 comment 标记，用来识别“已经处理过”，避免重复转码造成二次损失。 */
const MARKER = 'video-script'
/** 没有标记的旧文件用码率密度兜底判断：估算每像素每帧的比特数。 */
const BPP_SKIP = 0.2

const HELP = `用法：
  pnpm video                      压缩 ${DEFAULT_DIR} 下所有 mp4
  pnpm video <文件或目录>         压缩指定文件/目录（可多个）
  pnpm video --dry-run            只检查，不转码

参数：
  --crf <n>         质量，越小越清晰也越大，默认 24
  --preset <name>   x264 预设，默认 slow；想快可用 medium
  --max-height <n>  最大高度，默认 1080，超过才等比缩放
  --force           强制重新转码（包括脚本处理过的文件）
  --no-backup       不备份原文件
  --dry-run         只打印计划，不写文件
  -h, --help        显示帮助

依赖：
  ffmpeg / ffprobe 需在 PATH 中，或用 FFMPEG_PATH / FFPROBE_PATH 指定。
  Windows 安装：winget install Gyan.FFmpeg

说明：
  转码后文件名不变，并自动加 -movflags +faststart。
  处理过的文件会写入 comment=video-script 标记，下次默认跳过；
  没有标记但已经 faststart、码率密度很低的文件也会跳过。
  要改画质参数重新压，请加 --force。
  重新上传视频时建议换文件名或加 ?v=，否则浏览器端 Service Worker
  要等下一次播放才会通过 Last-Modified 发现更新。`

function fail(message) {
  console.error(`\n${message}\n`)
  console.error(HELP)
  process.exit(1)
}

function parseArgs(argv) {
  const options = {
    crf: 24,
    preset: 'slow',
    maxHeight: 1080,
    force: false,
    backup: true,
    dryRun: false,
    inputs: [],
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--') continue
    if (arg === '-h' || arg === '--help') {
      console.log(HELP)
      process.exit(0)
    }
    if (arg === '--force') {
      options.force = true
      continue
    }
    if (arg === '--no-backup') {
      options.backup = false
      continue
    }
    if (arg === '--dry-run') {
      options.dryRun = true
      continue
    }

    const numeric = ['--crf', '--preset', '--max-height']
    const matched = numeric.find((name) => arg === name || arg.startsWith(`${name}=`))
    if (matched) {
      const value = arg.includes('=') ? arg.slice(matched.length + 1) : argv[(i += 1)]
      if (!value) fail(`参数 ${matched} 缺少取值`)
      if (matched === '--preset') {
        if (!['ultrafast', 'superfast', 'veryfast', 'faster', 'fast', 'medium', 'slow', 'slower', 'veryslow'].includes(value)) {
          fail(`不支持的 preset：${value}`)
        }
        options.preset = value
      } else {
        const number = Number(value)
        if (!Number.isFinite(number) || number <= 0) fail(`参数 ${matched} 需要正数，收到：${value}`)
        if (matched === '--crf') options.crf = number
        else options.maxHeight = Math.round(number)
      }
      continue
    }

    if (arg.startsWith('-')) fail(`未知参数：${arg}`)
    options.inputs.push(arg)
  }

  if (options.inputs.length === 0) options.inputs.push(DEFAULT_DIR)
  return options
}

function collectVideos(inputs) {
  const files = []
  for (const input of inputs) {
    const target = resolve(input)
    if (!existsSync(target)) fail(`找不到路径：${input}`)
    const stat = statSync(target)
    if (stat.isFile()) {
      if (extname(target).toLowerCase() !== '.mp4') fail(`只支持 mp4：${input}`)
      files.push(target)
      continue
    }
    for (const entry of readdirSync(target, { withFileTypes: true })) {
      if (!entry.isFile()) continue
      if (entry.name.startsWith('.')) continue
      if (extname(entry.name).toLowerCase() !== '.mp4') continue
      files.push(join(target, entry.name))
    }
  }
  return files
}

function hasFaststart(file) {
  const size = statSync(file).size
  const length = Math.min(size, 1024 * 1024)
  const buffer = Buffer.alloc(length)
  const fd = openSync(file, 'r')
  try {
    readSync(fd, buffer, 0, length, 0)
  } finally {
    closeSync(fd)
  }
  return buffer.includes('moov')
}

function probe(file) {
  if (!probeAvailable) return null
  const result = spawnSync(
    ffprobe,
    [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-show_entries', 'format_tags=comment',
      '-show_entries', 'stream=codec_type,width,height,r_frame_rate',
      '-of', 'json',
      file,
    ],
    { encoding: 'utf8' },
  )
  if (result.status !== 0 || !result.stdout) return null
  try {
    const data = JSON.parse(result.stdout)
    const video = (data.streams || []).find((stream) => stream.codec_type === 'video') || {}
    return {
      duration: Number(data.format?.duration) || 0,
      width: Number(video.width) || 0,
      height: Number(video.height) || 0,
      fps: parseRate(video.r_frame_rate),
      comment: data.format?.tags?.comment || '',
    }
  } catch {
    return null
  }
}

function parseRate(value) {
  const [numerator, denominator] = String(value || '').split('/').map(Number)
  if (!denominator) return Number(numerator) || 0
  return numerator / denominator
}

/** 已是 faststart 且码率密度很低，说明大概率已经压过，没必要再转一次。 */
function looksCompressed(file, info, maxHeight) {
  if (!info || info.height > maxHeight) return false
  if (!info.width || !info.fps || !(info.duration > 0)) return false
  const bitrate = (statSync(file).size * 8) / info.duration
  return bitrate / (info.width * info.height * info.fps) <= BPP_SKIP
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}

function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

/**
 * 用 tmp 替换目标文件。
 * Windows 上目标 mp4 若被浏览器/本地 dev server 打开，rename 会直接报 EPERM，
 * 所以先重试几次，仍失败就退化为覆盖写入（这类程序通常允许共享写）。
 */
function replaceFile(tmp, target) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      renameSync(tmp, target)
      return
    } catch (error) {
      if (!['EPERM', 'EBUSY', 'EACCES'].includes(error.code)) throw error
      if (attempt < 4) sleepSync(200 * (attempt + 1))
    }
  }
  try {
    copyFileSync(tmp, target)
  } catch (error) {
    throw new Error(
      `无法写入 ${basename(target)}（${error.code}）：文件正被其他程序占用，` +
        '请关闭播放该视频的浏览器标签页和本地 dev server 后重试',
    )
  }
  rmSync(tmp, { force: true })
  console.warn(`提示：${basename(target)} 被占用，已改为覆盖写入`)
}

const options = parseArgs(process.argv.slice(2))

const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg'
let ffprobe = process.env.FFPROBE_PATH || 'ffprobe'
if (process.env.FFMPEG_PATH && !process.env.FFPROBE_PATH) {
  const sibling = join(dirname(process.env.FFMPEG_PATH), process.platform === 'win32' ? 'ffprobe.exe' : 'ffprobe')
  if (existsSync(sibling)) ffprobe = sibling
}

const version = spawnSync(ffmpeg, ['-version'], { encoding: 'utf8' })
if (version.error) {
  fail(
    `未找到 ffmpeg（${ffmpeg}）。\n` +
      'Windows 可执行：winget install Gyan.FFmpeg\n' +
      '或用 FFMPEG_PATH 指向 ffmpeg.exe 的完整路径。',
  )
}

let probeAvailable = true
if (spawnSync(ffprobe, ['-version'], { encoding: 'utf8' }).error) {
  probeAvailable = false
  console.warn('未找到 ffprobe：将跳过“已压缩”判断，所有文件都会重新转码。')
}

const files = collectVideos(options.inputs)
if (files.length === 0) {
  console.log('没有找到可处理的 mp4 文件。')
  process.exit(0)
}

const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)
const backupDir = options.backup && !options.dryRun ? join(tmpdir(), `video-originals-${stamp}`) : null

let processed = 0
let skipped = 0
let bytesBefore = 0
let bytesAfter = 0
let failed = 0

console.log(`ffmpeg: ${ffmpeg}`)
console.log(`待处理 ${files.length} 个文件，crf=${options.crf} preset=${options.preset} max-height=${options.maxHeight}`)
if (backupDir) console.log(`原文件备份目录：${backupDir}`)
console.log('')

for (const file of files) {
  const before = statSync(file).size
  const info = probe(file)
  const faststart = hasFaststart(file)
  const alreadyCompressed =
    faststart &&
    (String(info?.comment || '').includes(MARKER) || looksCompressed(file, info, options.maxHeight))

  if (!options.force && alreadyCompressed) {
    skipped += 1
    console.log(`跳过 ${basename(file)}（已是 faststart，且看起来已经压过）`)
    continue
  }

  const tmp = join(dirname(file), `.${basename(file, '.mp4')}.tmp.mp4`)
  const args = [
    '-y', '-hide_banner', '-loglevel', 'error', '-stats',
    '-i', file,
    '-map', '0:v:0', '-map', '0:a?',
    '-c:v', 'libx264',
    '-preset', options.preset,
    '-crf', String(options.crf),
    '-pix_fmt', 'yuv420p',
  ]
  if (info?.height > options.maxHeight) args.push('-vf', `scale=-2:${options.maxHeight}`)
  args.push(
    '-c:a', 'aac', '-b:a', '96k',
    '-metadata', `comment=${MARKER}`,
    '-movflags', '+faststart',
    tmp,
  )

  if (options.dryRun) {
    console.log(`计划 ${basename(file)}：${formatMB(before)}${faststart ? '' : '，moov 在文件尾'}`)
    console.log(`  ${ffmpeg} ${args.join(' ')}`)
    continue
  }

  console.log('')
  console.log(`压缩 ${basename(file)}（${formatMB(before)}${faststart ? '' : '，moov 在文件尾'}）`)
  const started = Date.now()
  const result = spawnSync(ffmpeg, args, { stdio: 'inherit' })
  const elapsed = ((Date.now() - started) / 1000).toFixed(1)

  if (result.status !== 0 || !existsSync(tmp) || statSync(tmp).size === 0) {
    failed += 1
    if (existsSync(tmp)) rmSync(tmp, { force: true })
    console.error(`失败 ${basename(file)}（ffmpeg 退出码 ${result.status}）`)
    continue
  }

  if (!hasFaststart(tmp)) {
    failed += 1
    rmSync(tmp, { force: true })
    console.error(`失败 ${basename(file)}：输出没有 faststart，已保留原文件`)
    continue
  }

  if (options.backup) {
    mkdirSync(backupDir, { recursive: true })
    copyFileSync(file, join(backupDir, basename(file)))
  }

  const after = statSync(tmp).size
  replaceFile(tmp, file)

  processed += 1
  bytesBefore += before
  bytesAfter += after
  console.log(`${basename(file)}  ${formatMB(before)} → ${formatMB(after)}（${Math.round((after / before) * 100)}%，${elapsed}s）`)
}

console.log('')
console.log(`完成：处理 ${processed} 个，跳过 ${skipped} 个${failed ? `，失败 ${failed} 个` : ''}`)
if (processed > 0) {
  console.log(`总体积：${formatMB(bytesBefore)} → ${formatMB(bytesAfter)}（${Math.round((bytesAfter / bytesBefore) * 100)}%）`)
  if (backupDir) console.log(`备份：${backupDir}`)
  console.log('视频文件名未变；如需让浏览器缓存立即失效，请改名或加 ?v= 后重新引用。')
}
