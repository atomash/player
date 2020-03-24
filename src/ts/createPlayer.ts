export default function createPlayer(opt: any): HTMLElement {
  const block = document.createElement('div');
  block.classList.add('player');
  block.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="player-visualizer"></div>
      <div class="player-wrap">
      
      <div class="player-item"><span class="audio-title">unknown</span></div>
      <div class="player-item"><div class="play-btn"><i class="icon-play"></i></div></div>
      <div class="player-item">
        <div class="wrap">
        <span id="time">00:00</span>
            <input type="range" min="0" max="100" value="0" class="range current-time-range" data-range="current-time-range" />
          <span id="duration">00:00</span>
        </div>

    </div>
      <div class="player-item "> 
        <div class="wrap volume">
        <span><i class="icon-volume-off"></i></span>
            <input type="range" min="0" max="100" value="50" class="range volume-range" data-range="volume-range" />
          <span><i class="icon-volume-up"></i></span>
        </div></div>
      </div>
    `
  );

  opt.render.appendChild(block);
  return block;
}
