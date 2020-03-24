const player = new DemoPlayer({ render: document.querySelector('.root') });

player.event.on('onPlay', () => {
  console.log('play');
});

player.event.on('onProgress', val => {
  console.log(val);
});

player.event.on('onSetAudio', val => {
  console.log(val);
});

player.event.on('onListening', val => {
  console.log(val);
});

// player.setAudio(
//   'https://cdns-preview-d.dzcdn.net/stream/c-d43367795fdbe907cb9cfd50a0f5b904-3.mp3'
// );

setTimeout(() => {
  player.setAudio(
    'https://cdns-preview-d.dzcdn.net/stream/c-d43367795fdbe907cb9cfd50a0f5b904-2.mp3'
  );
}, 1000);

// setTimeout(() => {
//   player.setAudio(
//     'https://cdns-preview-d.dzcdn.net/stream/c-d43367795fdbe907cb9cfd50a0f5b904-3.mp3'
//   );
// }, 2000);

// setTimeout(() => {
//   player.setAudio(
//     'https://cdns-preview-d.dzcdn.net/stream/c-d43367795fdbe907cb9cfd50a0f5b904-2.mp3'
//   );
// }, 3000);
