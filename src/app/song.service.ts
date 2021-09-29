import { Injectable } from '@angular/core';
import { Song } from './song';
// @ts-ignore

import ApplicationData from '../assets/data/data_v1.json';
// import ApplicationData from '../assets/data/data_v3.json';


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

  getSongDetails(songID: string): Song {
    if (!this.songsInitialised) {
      this.songs = this.getSongs();
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.songs.length; i++){
      if (this.songs[i].id === songID) {
        return this.songs[i];
      }
    }

    return null;
  }

  initSongs(): void {
    this.songs = [];
    for (const song of ApplicationData.songs) {
      this.songs.push(song);
    }
    this.songsInitialised = true;
  }
}
