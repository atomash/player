import SFetch, { ISFetch } from './fetch';

export interface ISDeezer {
  search(music: string): any;
}

export default class SDeezer {
  private sfetch: ISFetch;
  constructor() {
    this.sfetch = new SFetch('https://deezerdevs-deezer.p.rapidapi.com', {
      headers: {
        'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
        'x-rapidapi-key': '',
      },
    });
  }

  search = async (music: string) => {
    return await this.sfetch.get<any>(`/search?q=${music}`);
  };
}
