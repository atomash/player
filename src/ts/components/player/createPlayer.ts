export default function createPlayer(opt: {
  render: HTMLElement;
}): HTMLElement {
  const block = document.createElement('div');
  block.classList.add('player');
  block.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="player-wrap">
    <div class="player-visualizer">
      <canvas id="canvas" width="900px" height="260px"></canvas>
    </div>
    <div class="player-item"><span class="audio-title">unknown</span></div>
    <div class="player-item">

      <div class="player-control">
        <div class="control-btns">
        <div class="btn mute-btn">
            <i class="icon-volume-up"></i>
          </div>
          <div class="btn stop-btn">
            <i class="icon-stop"></i>
          </div>
        </div>
        <div class="control-btns">
          <div class="btn prev-btn">
            <i class="icon-backward"></i>
          </div>
          <div class="btn play-btn">
            <i class="icon-play"></i>
          </div>
          <div class="btn next-btn">
            <i class="icon-forward"></i>
          </div>
        </div>
        <div class="control-btns">
          <div class="btn replay-btn">
            <i class="icon-refresh"></i>
          </div>
          <div class="btn random-btn"><i class="icon-random"></i></div>
        </div>
      </div>
    </div>
    <div class="player-item">
      <div class="wrap">
        <span id="time">00:00</span>
        <input type="range" min="0" max="100" value="0" class="range current-time-range"
          data-range="current-time-range" />
        <span id="duration">00:00</span>
      </div>

    </div>
    <div class="player-item ">
      <div class="wrap volume">
        <span><i class="icon-volume-off"></i></span>
        <input type="range" min="0" max="100" value="50" class="range volume-range" data-range="volume-range" />
        <span><i class="icon-volume-up"></i></span>
      </div>
    </div>
  </div>
</div>
    `
  );

  opt.render.appendChild(block);
  return block;
}
