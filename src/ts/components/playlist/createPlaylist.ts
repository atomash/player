export default function createPlaylist(opt: {
  render: HTMLElement;
}): HTMLElement {
  const block = document.createElement('div');
  block.classList.add('playlist');
  block.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="playlist-wrap">
      <div class="playlist-title">
        <i class="icon-music"></i>
        <h3>Music list</h3>
      </div>
      
      <div class="search-container">
        <span class="icon"><i class="icon-search"></i></span>
        <input type="search" id="search" placeholder="Search music..." />
      </div>

      <div class="music-container"></div>
    </div>
    `
  );

  opt.render.appendChild(block);
  return block;
}
