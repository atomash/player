import { EventsInterface } from './interfaces/index';

type events = {
  [key: string]: any[];
};

export default class Events implements EventsInterface {
  private events: events;
  constructor() {
    this.events = {};
  }

  public on(name: string, fn: () => {}): void {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    this.events[name].push(fn);
  }

  public emit(name: string, ...params: any[]): void {
    if (this.events[name]) {
      this.events[name].forEach(fn => fn(...params));
    }
  }
}
