import Events from './events';
import CreatePlayer from './createPlayer';
import { EventsInterface } from './interfaces/index';
import { updateRange, formatTime, getPercentage } from './utils/index';

class Player {
  private currentTimeRange: number;
  private volume: number;
  public currentTime: number;
  public duration: number;
  public formattedDuration: string;
  public formattedCurrentTime: string;
  public currentTimePercentage: number;
  public event: EventsInterface;
  public audio: HTMLAudioElement;
  public $player: HTMLElement;
  constructor(opt: { render: any }) {
    this.audio = new Audio();
    this.event = new Events();
    this.$player = CreatePlayer(opt);
    this.currentTime = 0;
    this.duration = 0;
    this.currentTimeRange = 0;
    this.volume = 0.5;
    this.formattedDuration = '00:00';
    this.formattedCurrentTime = '00:00';
    this.currentTimePercentage = 0;
    this.init();
  }

  private init() {
    this.audio.onloadeddata = this.audioLoaded.bind(this);
    this.audio.ontimeupdate = this.listening.bind(this);
    this.audio.volume = this.volume;
    this.initCurrentTimeRange();
    this.initVolume();
    this.$player
      .querySelector('.play-btn')
      .addEventListener('click', this.togglePlay.bind(this));
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
    updateRange(this.currentTimeRange, currentTimeRange);
  }

  private initVolume() {
    const volumeRange = this.$player.querySelector<HTMLInputElement>(
      '.volume-range'
    );

    volumeRange.addEventListener('input', this.rangeChange.bind(this));
    updateRange(this.volume * 100, volumeRange);
  }

  private rangeChange(e: { target: HTMLInputElement }) {
    const val = Number(e.target.value);
    if (e.target.dataset.range === 'current-time-range') {
      this.currentTimeRange = val;
      this.event.emit('onCurrentTimeRange', this.currentTimeRange);
    }
    if (e.target.dataset.range === 'volume-range') {
      this.volume = val / 100;
      this.event.emit('onVolume', this.volume);
      this.audio.volume = this.volume;
    }

    updateRange(val, e.target);
  }

  private updateCurrentTimeRange() {
    const currentTimeRange = this.$player.querySelector<HTMLInputElement>(
      '.current-time-range'
    );
    this.formattedCurrentTime = formatTime(this.audio.currentTime);
    this.$player.querySelector<HTMLElement>(
      '#time'
    ).innerHTML = this.formattedCurrentTime;

    this.currentTimePercentage = getPercentage(
      this.audio.currentTime,
      this.audio.duration
    );
    currentTimeRange.value = `${this.currentTimePercentage}`;
    updateRange(this.currentTimePercentage, currentTimeRange);
  }

  private listening() {
    if (!this.audio.paused) {
      this.updateCurrentTimeRange();
      this.event.emit('onListening', {
        currentTime: this.audio.currentTime,
        duration: this.audio.duration,
        formattedDuration: formatTime(this.audio.duration),
        currentTimePercentage: getPercentage(
          this.audio.currentTime,
          this.audio.duration
        ),
        formattedCurrentTime: formatTime(this.audio.currentTime)
      });
    }
  }

  public play() {
    this.audio.play();
    this.event.emit('onPlay');
    this.$player.querySelector('.icon-play').className = 'icon-pause';
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

  public setAudio(src: string) {
    this.audio.setAttribute('src', src);
    this.audio.load();
  }
}

export default Player;
