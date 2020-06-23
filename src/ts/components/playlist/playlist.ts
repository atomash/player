import { IEvent, IPlayer } from '../../interfaces/index';
import SDeezer, { ISDeezer } from '../../services/deezer';
import CreatePlaylist from './CreatePlaylist';
import Player from '../player/player';
import Debounce, { IDebounce } from '../../utils/debounce';
import { formatTime } from '../../utils/index';
import Events from '../../services/events';

interface IMusic {
  id: string;
  title: string;
  src: string;
  duration: string;
}

const emptyList = `
    <div class="info-block">
      <i class="icon-inbox"></i>
      <h3>Playlist is empty</h3>
    </div>
`;
const loadingList = `<div class="info-block"><div id="loading"></div></div>`;

class Playlist {
  private sdeezer: ISDeezer;
  private loading: boolean;

  public $playlist: HTMLElement;
  public $myPlayer: IPlayer;
  public musicData: IMusic[];
  public searchInput: IDebounce;
  public currentEl: {
    el: HTMLDivElement;
    duration: number;
  };
  public event: IEvent;

  constructor(opt: { render: HTMLElement }) {
    this.$myPlayer = new Player(opt);
    this.$playlist = CreatePlaylist({ render: this.$myPlayer.$player });
    this.sdeezer = new SDeezer();
    this.musicData = [];
    this.event = new Events();
    this.searchInput = new Debounce(
      this.$playlist.querySelector('#search'),
      600
    );
    this.loading = false;
    this.init();
  }

  init = () => {
    this.render();
    this.searchInput.event.on('onDebounce', (value: string) => {
      if (value.length >= 2) this.getMusic(value);
    });

    this.$myPlayer.event.on('onPlay', () => {
      this.currentEl.el.querySelector('i').className = 'icon-pause';
    });
    this.$myPlayer.event.on('onPause', () => {
      this.currentEl.el.querySelector('i').className = 'icon-play';
    });
    this.$myPlayer.event.on('onListening', () => {
      this.currentEl.el.querySelector(
        '.right span'
      ).innerHTML = this.$myPlayer.formattedCurrentTime;
    });

    this.$myPlayer.event.on('onNext', () => {
      const currentIndex = this.musicData.findIndex((e) => {
        return e.id.toString() === this.currentEl.el.dataset.id;
      });
      if (this.musicData.length > currentIndex + 1) {
        this.selectMusic(this.musicData[currentIndex + 1]);
      } else {
        this.$myPlayer.stop();
      }
    });
    this.$myPlayer.event.on('onPrev', () => {
      const currentIndex = this.musicData.findIndex((e) => {
        return e.id.toString() === this.currentEl.el.dataset.id;
      });
      if (currentIndex - 1 >= 0) {
        this.selectMusic(this.musicData[currentIndex - 1]);
      }
    });
  };

  selectMusic = async (music: any) => {
    if (this.$myPlayer.audioId !== music.id.toString()) {
      if (this.currentEl) {
        this.currentEl.el.querySelector('i').className = 'icon-play';
        this.currentEl.el.classList.remove('active');
        this.currentEl.el.querySelector(
          '.right span'
        ).innerHTML = `${this.currentEl.duration}`;
      }

      const el = this.$playlist.querySelector<HTMLDivElement>(
        `.music-item[data-id="${music.id}"]`
      );
      this.currentEl = { el, duration: music.duration };
      this.currentEl.el.classList.add('active');
      await this.$myPlayer.setAudio(music);
      await this.$myPlayer.play();
    } else {
      this.$myPlayer.togglePlay();
    }
  };

  getMusic = async (query: string) => {
    this.loading = true;
    this.render();
    const data = await this.sdeezer.search(query);
    const musicArray = data?.parsedBody?.data || [];
    this.loading = false;
    this.musicData = musicArray.map((item: any) => {
      return {
        id: item.id,
        title: `${item.artist?.name} - ${item.title}`,
        src: item.preview,
        duration: formatTime(item.duration),
      };
    });

    this.render();
  };

  render = () => {
    const container = this.$playlist.querySelector('.music-container');
    container.innerHTML = '';
    if (this.loading) {
      return container.insertAdjacentHTML('afterbegin', loadingList);
    }

    !this.musicData.length
      ? container.insertAdjacentHTML('afterbegin', emptyList)
      : this.renderList(container);
  };

  renderList = (container: Element) => {
    const thisplaylist = this;
    this.musicData.forEach((item: IMusic) => {
      const block = document.createElement('div');
      block.classList.add('music-item');
      block.setAttribute('data-id', item.id);
      block.setAttribute('data-src', item.src);
      block.setAttribute('data-title', item.title);
      block.addEventListener('click', function (this) {
        const { id, title, src } = this.dataset;
        if (id && title && src) {
          thisplaylist.selectMusic({ id, title, src, duration: item.duration });
        }
      });
      block.insertAdjacentHTML(
        'afterbegin',
        `<div class="left">
          <i class="icon-play"></i>
          <span>${item.title}</span>
        </div>
        <div class="right">
          <span>${item.duration}</span>
        </div>`
      );
      container.appendChild(block);
    });
  };
}

export default Playlist;
