import { Injectable } from '@angular/core';
import {Song} from './song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  songs: Song[];
  songsInitialised = false;

  constructor() { }

  getSongs(): Song[] {
    if (!this.songsInitialised) {
      this.initSongs();
    }
    return this.songs;
  }

  initSongs(): void {
    this.songs = [];
    let tempSong: Song = {
      id: '1001',
      name: 'Penny Lane',
      artist: 'The Beatles',
      youtubeID: 'vfxQ1oDiEJM'
    };
    this.songs.push(tempSong);
    tempSong = {
      id: '1002',
      name: 'The Captain',
      artist: 'Biffy Clyro',
      youtubeID: '2Evn9MiIuqM'
    };
    this.songs.push(tempSong);
    tempSong = {
      id: '1003',
      name: 'Sledgehammer',
      artist: 'Peter Gabriel',
      youtubeID: 'OJWJE0x7T4Q'
    };
    this.songs.push(tempSong);
    tempSong = {
      id: '1004',
      name: 'By The Way',
      artist: 'Red Hot Chilli Peppers',
      youtubeID: 'JnfyjwChuNU'
    };
    this.songs.push(tempSong);
    this.songsInitialised = true;
  }
}
