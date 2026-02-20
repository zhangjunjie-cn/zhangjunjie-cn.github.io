export type AudioFormat = 'mp3' | 'wav' | 'ogg' | 'flac'

export interface AudioFormats {
  mp3?: string
  wav?: string
  ogg?: string
  flac?: string
}

export interface Track {
  id: string
  title: string
  artist: string
  album: string
  url: string
  cover: string
  //duration: string
  formats?: AudioFormats
}

const formatPriority: AudioFormat[] = ['mp3', 'wav', 'ogg', 'flac']

function checkFlacSupport(): boolean {
  const audio = new Audio()
  const canPlayFlac = audio.canPlayType('audio/flac')
  
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
  const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1 && !isChrome

  if (isSafari) {
    console.warn('Safari浏览器不支持FLAC格式')
    return false
  }
  
  return canPlayFlac === 'probably' || canPlayFlac === 'maybe'
}

export function getBestAudioFormat(track: Track): string {
  if (track.formats) {
    const audio = new Audio()
    const supportsFlac = checkFlacSupport()
    
    console.log(`检测 ${track.title} 的音频格式支持:`)

    const availableFormats = supportsFlac 
      ? formatPriority 
      : formatPriority.filter(format => format !== 'flac')
    
    console.log(`可用格式: ${availableFormats.join(', ')}`)
    
    for (const format of availableFormats) {
      const url = track.formats[format]
      
      if (url) {
        const mimeTypeMap: Record<AudioFormat, string> = {
          mp3: 'audio/mpeg',
          wav: 'audio/wav',
          ogg: 'audio/ogg',
          flac: 'audio/flac'
        }
        
        const mimeType = mimeTypeMap[format]
        const support = audio.canPlayType(mimeType)

        if (format === 'flac') {
          if (support === 'probably') {
            // console.log(`✅ 为 ${track.title} 选择高质量FLAC格式`)
            return url
          } else {
            // console.warn(`⚠️ FLAC格式支持度不确定(${support})，跳过`)
            continue
          }
        }

        if (support === 'probably' || support === 'maybe') {
          // console.log(`✅ 为 ${track.title} 选择 ${format.toUpperCase()} 格式 (支持度: ${support})`)
          return url
        }
      }
    }
    
    if (track.formats.mp3) {
      // console.warn(`🔄 为 ${track.title} 强制使用MP3备用格式`)
      return track.formats.mp3
    }
    
    for (const format of ['mp3', 'wav', 'ogg']) {
      const url = track.formats[format as AudioFormat]
      if (url) {
        // console.warn(`🆘 为 ${track.title} 使用最后备用格式: ${format.toUpperCase()}`)
        return url
      }
    }
  }
  
  // console.log(`📁 为 ${track.title} 使用默认URL: ${track.url}`)
  return track.url
}

export const playlist: Track[] = [
  {
    id: '1',
    title: '挞挞',
    artist: '相遇才是意外',
    album: '单曲',
    url: 'https://gitee.com/zhangjunjiee/article-images/raw/master/music/淘淘zonzon - 相遇才是意外（氛围版）-挞挞.mp3',
    cover: '/music/covers/相遇才是意外（氛围版）.png',
    formats: {
      // flac: '/music/淘淘zonzon - 相遇才是意外（氛围版）-挞挞.flac'  // 高质量选项，仅在完全支持时使用
      // 注意：如果你的FLAC文件有问题，可以暂时注释掉这行
      // flac: '/music/黄诗扶 - 九万字.flac'
    }
  },
]

// 你可以根据实际的音乐文件来修改这个列表
// 示例文件结构：
// public/
// ├── music/
// │   ├── covers/           # 封面图片文件夹
// │   │   ├── nocturne.jpg
// │   │   ├── thousands-miles-away.jpg
// │   │   └── ...
// │   ├── nocturne.mp3      # 音乐文件
// │   ├── thousands-miles-away.mp3
// │   └── ...

// 使用说明：
// 1. 将你的音乐文件放入 public/music/ 文件夹
// 2. 将对应的封面图片放入 public/music/covers/ 文件夹
// 3. 修改上面的 playlist 数组，更新文件路径和信息
// 4. 确保文件名和路径正确匹配

// 添加新歌曲的模板：
/*
{
  id: '9',                                    // 唯一ID
  title: '歌曲名称',                          // 歌曲标题
  artist: '艺术家',                          // 演唱者
  album: '专辑名称',                         // 专辑名称
  url: '/music/your-song-file.mp3',          // 音乐文件路径（相对于public目录）
  cover: '/music/covers/your-cover.jpg',     // 封面图片路径（相对于public目录）
  duration: '3:45'                            // 歌曲时长
}
*/

// 如果你没有封面图片，可以使用默认封面：
export const defaultCover = '/music/covers/default.jpg'

export function addTrack(track: Omit<Track, 'id'>): Track {
  const newTrack: Track = {
    ...track,
    id: Date.now().toString(), 
    cover: track.cover || defaultCover
  }
  playlist.push(newTrack)
  return newTrack
}

export function removeTrack(id: string): boolean {
  const index = playlist.findIndex(track => track.id === id)
  if (index > -1) {
    playlist.splice(index, 1)
    return true
  }
  return false
}

export function getShuffledPlaylist(): Track[] {
  const shuffled = [...playlist]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getTracksByArtist(artist: string): Track[] {
  return playlist.filter(track => 
    track.artist.toLowerCase().includes(artist.toLowerCase())
  )
}

export function getTracksByAlbum(album: string): Track[] {
  return playlist.filter(track => 
    track.album.toLowerCase().includes(album.toLowerCase())
  )
}

export function searchTracks(query: string): Track[] {
  const lowercaseQuery = query.toLowerCase()
  return playlist.filter(track => 
    track.title.toLowerCase().includes(lowercaseQuery) ||
    track.artist.toLowerCase().includes(lowercaseQuery) ||
    track.album.toLowerCase().includes(lowercaseQuery)
  )
}
