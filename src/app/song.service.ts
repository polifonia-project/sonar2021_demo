import { Injectable } from '@angular/core';
import { Song } from './song';
// @ts-ignore

import ApplicationData from '../assets/data/data_v8.json';


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
    for (const item of this.songs) {
      if (item.id === songID) {
        return item;
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
