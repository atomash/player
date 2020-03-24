export interface EventsInterface {
  on(name: string, fn: any): void;
  emit(name: string, ...params: any[]): void;
}
