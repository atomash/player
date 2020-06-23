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
  isReplay: boolean;
  audioId: string;

  stop(): void;
  play(): void;
  pause(): void;
  togglePlay(): void;
  toggleReplay(): void;
  toggleMute(): void;
  setAudio(newAudio: { src: string; title: string }): void;
}
