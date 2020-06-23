export function updateRange(val: number, target: HTMLInputElement) {
  target.style['background'] =
    'linear-gradient(to right, #22211f 0%, #22211f ' +
    val +
    '%, rgb(214, 214, 214) ' +
    val +
    '%, rgb(214, 214, 214)';
}

export function formatTime(time: number): string {
  let mins: string | number = Math.floor(time / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }
  let secs: string | number = Math.floor(time % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  return `${mins}:${secs}`;
}

export function getPercentage(portion: number, total: number): number {
  if (portion <= 0) {
    return 0;
  }
  return Math.round((portion / total) * 100);
}
