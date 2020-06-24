export interface IEvent {
  on(name: string, fn: any): void;
  emit(name: string, ...params: any[]): void;
}

export interface IPlayer {
  formattedDuration: string;
  formattedCurrentTime: string;
  currentTimePercentage: number;
  currentTimeRange: number;
  $player: HTMLElement;
  event: IEvent;
  audio: HTMLAudioElement;
  isRandom: boolean;
  audioId: string;

  stop(): void;
  play(): void;
  pause(): void;
  togglePlay(): void;
  toggleReplay(): void;
  toggleRandom(): void;
  toggleMute(): void;
  setAudio(newAudio: { src: string; title: string }): void;
}
