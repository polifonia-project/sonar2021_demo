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

  getSongDetails(songID: string): Song {
    if (!this.songsInitialised) {
      this.songs = this.getSongs();
    }
    for (let i = 0; i < this.songs.length; i++){
      if (this.songs[i].id === songID) {
        return this.songs[i];
      }
    }

    return null;
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
      name: 'Don’t Stop \'Til You Get Enough',
      artist: 'Michael Jackson',
      youtubeID: 'yURRmWtbTbo'
    };
    this.songs.push(tempSong);
    tempSong = {
      id: '1003',
      name: 'Bright Lights, Big City',
      artist: 'The Rolling Stones',
      youtubeID: 'yZ1-46gCjus'
    };
    this.songs.push(tempSong);
    tempSong = {
      id: '1004',
      name: 'Africa',
      artist: 'Toto',
      youtubeID: 'QAo_Ycocl1E'
    };
    this.songs.push(tempSong);
    this.songsInitialised = true;
  }
}
