type Queue = {
  [key: string]: any[];
};

export default class Events {
  private queue: Queue;
  constructor() {
    this.queue = {};
  }

  public on(name: string, fn: any): void {
    if (!this.queue[name]) {
      this.queue[name] = [];
    }
    this.queue[name].push(fn);
  }

  public emit(name: string, ...params: any[]): void {
    if (this.queue[name]) {
      this.queue[name].forEach(fn => fn(...params));
      delete this.queue[name];
    }
  }
}
