import Player from './ts/player';

declare global {
  interface Window {
    DemoPlayer: any;
  }
}

window.DemoPlayer = Player;
export default Player;
