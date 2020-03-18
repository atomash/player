import Events from './events';

class Player extends Events {
  constructor() {
    super();
  }
  play(test: string) {
    this.emit('onPlay', test);
  }
}

const player = new Player();

player.on('onPlay', (test: any) => {
  console.log(test);
});

player.play('testfff');
