/**
 * 「群蜂重建」的程序化音效 —— 对应原扩展 swarm.js 里的 Sound 类。
 *
 * 不加载任何音频文件，全部用 Web Audio API 现场合成：
 *   - 主链：master gain → compressor（-18dB / 5:1）→ destination
 *   - 混响：程序生成的指数衰减噪声脉冲 → ConvolverNode
 *   - 音高体系：E 大调五声音阶（PENTA = [0,2,4,7,9]，E2 = midi 40）
 *   - 「玻璃钢琴」：5 个 sine 泛音（含 2.756 非谐波泛音）+ 带通噪声锤击
 *
 * 行为绑定：
 *   place  元素落位 —— 面积越大音越低，x 坐标五等分定音级，立体声 pan
 *   clack  打字     —— 高/低两个带通噪声脆响（空格更低沉）
 *   press  按下拖拽 —— 双击感噪声
 *   arp    开场琶音 / chord 终场合弦 / swell 开场噪声扫频
 */

const PENTA = [0, 2, 4, 7, 9]
const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

export class SwarmSound {
  enabled = true

  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private verb: ConvolverNode | null = null
  private noise: AudioBuffer | null = null

  /** 必须在用户手势之后调用（点击「开始」就是手势）。 */
  ensure() {
    if (this.ctx) return
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return
    this.ctx = new AC({ latencyHint: 'interactive' })

    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -18
    comp.ratio.value = 5
    comp.connect(this.ctx.destination)

    this.master = this.ctx.createGain()
    this.master.gain.value = 0.9
    this.master.connect(comp)

    this.verb = this.ctx.createConvolver()
    this.verb.buffer = this.impulse(2.6, 2.4)
    const wet = this.ctx.createGain()
    wet.gain.value = 0.16
    this.verb.connect(wet)
    wet.connect(this.master)

    this.noise = this.whiteNoise(1.5)
  }

  resume() {
    void this.ctx?.resume().catch(() => {})
  }

  setEnabled(on: boolean) {
    this.enabled = on
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(on ? 0.9 : 0, this.ctx.currentTime, 0.05)
    }
  }

  /** 退场时快速压掉所有声音。 */
  duck() {
    if (this.ctx && this.master) {
      this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08)
    }
  }

  /* --- 基础件 ------------------------------------------------------------- */

  private impulse(duration: number, decay: number): AudioBuffer {
    const rate = this.ctx!.sampleRate
    const len = Math.floor(rate * duration)
    const buf = this.ctx!.createBuffer(2, len, rate)
    for (let c = 0; c < 2; c++) {
      const data = buf.getChannelData(c)
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay)
      }
    }
    return buf
  }

  private whiteNoise(duration: number): AudioBuffer {
    const rate = this.ctx!.sampleRate
    const len = Math.floor(rate * duration)
    const buf = this.ctx!.createBuffer(1, len, rate)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
    return buf
  }

  /** 一条发声链：voice gain → stereo pan → master，并按 send 比例送混响。 */
  private voice(pan: number, send = 0.4): GainNode {
    const ctx = this.ctx!
    const g = ctx.createGain()
    const p = ctx.createStereoPanner()
    p.pan.value = Math.max(-0.8, Math.min(0.8, pan))
    g.connect(p)
    p.connect(this.master!)
    const s = ctx.createGain()
    s.gain.value = send
    p.connect(s)
    s.connect(this.verb!)
    return g
  }

  /* --- 乐器 --------------------------------------------------------------- */

  /** 玻璃钢琴：5 个 sine 泛音 5ms 起音 + 指数衰减长尾 + 噪声锤击。 */
  piano(midi: number, vel = 0.5, pan = 0) {
    if (!this.ctx || !this.enabled) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const f = mtof(midi)
    const g = this.voice(pan)
    g.gain.value = vel

    const partials: Array<[number, number]> = [
      [1, 1],
      [2, 0.45],
      [3, 0.22],
      [2.756, 0.12],
      [4, 0.08],
    ]
    for (const [ratio, amp] of partials) {
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = f * ratio
      const og = ctx.createGain()
      og.gain.setValueAtTime(0, t)
      og.gain.linearRampToValueAtTime(amp, t + 0.005)
      og.gain.exponentialRampToValueAtTime(0.0008, t + 1.3 + Math.random() * 0.2)
      o.connect(og)
      og.connect(g)
      o.start(t)
      o.stop(t + 1.6)
    }
    this.burst(f * 4 + 1200, 8, vel * 0.25, 0.03, pan)
  }

  /** 带通噪声短促一击，打字、点击、吸附等「打击乐」的通用件。 */
  private burst(freq: number, q: number, gain: number, dur: number, pan = 0) {
    if (!this.ctx || !this.enabled || !this.noise) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    src.loop = true
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.frequency.value = freq
    bp.Q.value = q
    const g = this.voice(pan, 0.25)
    g.gain.setValueAtTime(gain, t)
    g.gain.exponentialRampToValueAtTime(0.0008, t + dur)
    src.connect(bp)
    bp.connect(g)
    src.start(t)
    src.stop(t + dur + 0.05)
  }

  /* --- 行为音效 ------------------------------------------------------------- */

  clack() {
    this.burst(3600 + Math.random() * 2000, 6, 0.08 + Math.random() * 0.06, 0.03)
    this.burst(850 + Math.random() * 650, 4, 0.06, 0.05)
  }

  space() {
    this.burst(380 + Math.random() * 180, 3, 0.11, 0.07)
  }

  press() {
    this.burst(2100 + Math.random() * 600, 7, 0.13, 0.025)
    this.burst(650 + Math.random() * 200, 5, 0.08, 0.04)
  }

  snap() {
    this.burst(4800, 9, 0.09, 0.03)
  }

  /** 元素落位：面积定八度（越大越低）、x 五等分定音级、立体声定位。 */
  place(area01: number, x01: number) {
    const deg = Math.min(4, Math.max(0, Math.floor(x01 * 5)))
    const oct = area01 > 0.4 ? 0 : area01 > 0.15 ? 1 : area01 > 0.05 ? 2 : 3
    const midi = 40 + PENTA[deg] + 12 * (4 - oct)
    this.piano(midi, 0.3 + Math.min(0.25, area01 * 0.5), (x01 - 0.5) * 1.6)
  }

  /** 复制：比普通落位轻一档、偏高一个音级的短促回响，暗示「这是复制不是新建」。 */
  dup(pan: number) {
    this.piano(52 + (Math.random() < 0.5 ? 0 : 7), 0.24, pan)
    this.burst(2400, 6, 0.07, 0.04, pan)
  }

  arp() {
    ;[40, 47, 52, 56, 59, 64].forEach((m, i) => {
      window.setTimeout(() => this.piano(m, 0.38, i / 5 - 0.5), i * 85)
    })
  }

  chord() {
    ;[40, 44, 47, 52, 56, 59, 64].forEach((m) => this.piano(m, 0.32, 0))
  }

  swell() {
    if (!this.ctx || !this.enabled || !this.noise) return
    const ctx = this.ctx
    const t = ctx.currentTime
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    src.loop = true
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.Q.value = 2.5
    bp.frequency.setValueAtTime(260, t)
    bp.frequency.exponentialRampToValueAtTime(2400, t + 0.55)
    bp.frequency.exponentialRampToValueAtTime(900, t + 1.15)
    const g = this.voice(0, 0.6)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.2, t + 0.5)
    g.gain.exponentialRampToValueAtTime(0.0008, t + 1.2)
    src.connect(bp)
    bp.connect(g)
    src.start(t)
    src.stop(t + 1.25)
  }
}
