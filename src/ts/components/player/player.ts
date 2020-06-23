import Events from '../../services/events';
import CreatePlayer from './createPlayer';
import { IEvent, IPlayer } from '../../interfaces/index';
import { updateRange, formatTime, getPercentage } from '../../utils/index';

class Player {
  private volume: number;
  private currentTimeRangeHold: boolean;
  private audio_ctx: AudioContext;
  private analyser: AnalyserNode;
  private mediaSource: MediaElementAudioSourceNode;
  private $canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  public currentTimeRange: number;
  public formattedDuration: string;
  public formattedCurrentTime: string;
  public currentTimePercentage: number;
  public $player: HTMLElement;
  public event: IEvent;
  public audio: HTMLAudioElement;
  public isReplay: boolean;
  public audioId: string;

  constructor(opt: { render: HTMLElement }) {
    this.audio = new Audio();
    this.event = new Events();
    this.$player = CreatePlayer(opt);
    this.$canvas = this.$player.querySelector('#canvas');
    this.ctx = this.$canvas.getContext('2d');
    this.currentTimeRange = 0;
    this.volume = 0.5;
    this.currentTimeRangeHold = false;
    this.formattedDuration = '00:00';
    this.formattedCurrentTime = '00:00';
    this.currentTimePercentage = 0;
    this.init();
  }

  private init() {
    const thisPayer = this;
    this.audio.autoplay = false;
    this.audio.crossOrigin = 'anonymous';
    this.audio.onloadeddata = this.audioLoaded.bind(this);
    this.audio.ontimeupdate = this.listening.bind(this);
    this.audio.onended = this.endedAudio.bind(this);
    this.audio.onerror = () =>
      (this.$player.querySelector<HTMLInputElement>(
        '.current-time-range'
      ).disabled = true);
    this.audio.volume = this.volume;

    this.initCurrentTimeRange();
    this.initVolume();

    this.$player
      .querySelector('.play-btn')
      .addEventListener('click', this.togglePlay.bind(this));
    this.$player.querySelector('.stop-btn').addEventListener('click', () => {
      if (!this.audio.paused) {
        this.stop();
      }
    });
    this.$player
      .querySelector('.mute-btn')
      .addEventListener('click', this.toggleMute.bind(this));
    this.$player
      .querySelector('.replay-btn')
      .addEventListener('click', this.toggleReplay.bind(this));

    this.$player
      .querySelector('.next-btn')
      .addEventListener('click', () => this.event.emit('onNext'));

    this.$player
      .querySelector('.prev-btn')
      .addEventListener('click', () => this.event.emit('onPrev'));
    // window.onload = function () {
    //   thisPayer.createAudioContext();
    // };
  }

  private endedAudio() {
    this.event.emit('onNext');
  }

  private createAudioContext() {
    this.audio_ctx = new AudioContext();
    console.log(this.audio_ctx);
    this.analyser = this.audio_ctx.createAnalyser();
    this.mediaSource = this.audio_ctx.createMediaElementSource(this.audio);
    this.mediaSource.connect(this.analyser);
    this.analyser.connect(this.audio_ctx.destination);
    this.analyser.fftSize = 256;
  }

  private animationFrame() {
    const bufferLen = this.analyser.frequencyBinCount;
    const data = new Uint8Array(bufferLen);
    const width = (this.$canvas.width / bufferLen) * 2.5;
    let x = 0;
    this.analyser.getByteFrequencyData(data);
    this.ctx.fillStyle = '#f7f7f7';
    this.ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
    if (!(this.audio.paused && !data[0] && !data[1] && !data[2])) {
      window.requestAnimationFrame(this.animationFrame.bind(this));
    }

    for (let i = 0; i < bufferLen; i++) {
      const h = data[i];
      const r = 195;
      const g = 170 + i;
      const b = 164 + 2 * i;

      this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      this.ctx.fillRect(x, this.$canvas.height - h, width / 2, h);
      x += width + 1;
    }
  }

  private audioLoaded() {
    this.event.emit('onSetAudio');
    if (this.audio.duration) {
      this.$player.querySelector<HTMLInputElement>(
        '.current-time-range'
      ).disabled = false;
    } else {
      this.$player.querySelector<HTMLInputElement>(
        '.current-time-range'
      ).disabled = true;
    }

    this.formattedDuration = formatTime(this.audio.duration);
    this.$player.querySelector<HTMLElement>(
      '#duration'
    ).innerHTML = this.formattedDuration;
  }

  private initCurrentTimeRange() {
    const currentTimeRange = this.$player.querySelector<HTMLInputElement>(
      '.current-time-range'
    );
    if (!this.audio.duration) {
      currentTimeRange.disabled = true;
    }

    currentTimeRange.addEventListener('input', this.rangeChange.bind(this));
    currentTimeRange.addEventListener(
      'mousedown',
      () => (this.currentTimeRangeHold = true)
    );
    currentTimeRange.addEventListener('mouseup', () => {
      this.currentTimeRangeHold = false;
      this.changeCurrentTime(this.currentTimeRange);
    });
    updateRange(this.currentTimeRange, currentTimeRange);
  }

  private initVolume() {
    const volumeRange = this.$player.querySelector<HTMLInputElement>(
      '.volume-range'
    );

    volumeRange.addEventListener('input', this.rangeChange.bind(this));
    updateRange(this.volume * 100, volumeRange);
  }

  private changeCurrentTime(timePercentage: number) {
    const c_time = Math.round(this.audio.duration * timePercentage) / 100;
    if (!this.currentTimeRangeHold) {
      this.audio.currentTime = c_time;
    }

    this.updateCurrentTimeRange(c_time);
  }

  private rangeChange(e: { target: HTMLInputElement }) {
    const val = Number(e.target.value);
    if (e.target.dataset.range === 'current-time-range') {
      this.currentTimeRange = val;
      this.changeCurrentTime(val);
      this.event.emit('onCurrentTimeRange', this.currentTimeRange);
    }
    if (e.target.dataset.range === 'volume-range') {
      this.volume = val / 100;
      this.event.emit('onVolume', this.volume);
      this.audio.volume = this.volume;
      updateRange(val, e.target);
    }
  }

  private updateCurrentTimeRange(time: number) {
    const currentTimeRange = this.$player.querySelector<HTMLInputElement>(
      '.current-time-range'
    );
    this.formattedCurrentTime = formatTime(time);
    this.$player.querySelector<HTMLElement>(
      '#time'
    ).innerHTML = this.formattedCurrentTime;
    this.currentTimePercentage = getPercentage(time, this.audio.duration);

    currentTimeRange.value = `${this.currentTimePercentage}`;
    updateRange(this.currentTimePercentage, currentTimeRange);
  }

  private listening() {
    if (!this.audio.paused && !this.currentTimeRangeHold) {
      this.updateCurrentTimeRange(this.audio.currentTime);
    }
    this.event.emit('onListening');
  }

  public stop() {
    this.pause();
    this.updateCurrentTimeRange(0);
    this.audio.currentTime = 0;
  }

  public play() {
    if (!this.audio_ctx) this.createAudioContext();
    this.audio.play();
    this.event.emit('onPlay');
    this.animationFrame();
    const playIcon = this.$player.querySelector('.player-item .icon-play');
    if (playIcon) {
      playIcon.className = 'icon-pause';
    }
  }

  public pause() {
    this.audio.pause();
    this.event.emit('onPause');
    this.$player.querySelector('.icon-pause').className = 'icon-play';
  }

  public togglePlay() {
    if (this.audio.duration) {
      this.audio.paused ? this.play() : this.pause();
    }
  }

  public toggleReplay() {
    if (this.audio.duration) {
      const replayBtn = this.$player.querySelector<HTMLElement>('.replay-btn');
      replayBtn.style.color = this.audio.loop ? '#989898' : '#22211f';
      this.audio.loop = !this.audio.loop;
    }
  }

  public toggleMute() {
    !this.audio.muted
      ? (this.$player.querySelector('.icon-volume-up').className =
          'icon-volume-off')
      : (this.$player.querySelector('.icon-volume-off').className =
          'icon-volume-up');
    this.audio.muted = !this.audio.muted;
  }

  public setAudio(newAudio: { id: string; src: string; title: string }) {
    if (!this.audio.paused) {
      this.stop();
    }
    if (newAudio.src) {
      this.audioId = newAudio.id;
      this.audio.setAttribute('src', newAudio.src);
      this.$player.querySelector('.audio-title').innerHTML =
        newAudio.title || 'unknown';
      this.audio.load();
    }
  }
}

export default Player;
