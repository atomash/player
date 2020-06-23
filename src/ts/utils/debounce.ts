import Events from '../services/events';
import { IEvent } from '../interfaces/index';

export interface IDebounce {
  input: HTMLInputElement;
  time: number;
  event: IEvent;
}

export default class Debounce {
  public input: HTMLInputElement;
  public time: number;
  public event: IEvent;
  private timer: any;

  constructor(el: HTMLInputElement, time: number) {
    this.input = el;
    this.time = time || 0;
    this.input.addEventListener('input', this.oninput);
    this.event = new Events();
  }

  private oninput = (e: any) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.event.emit('onDebounce', e.target.value);
    }, this.time);
  };
}
