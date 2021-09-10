import { Injectable } from '@angular/core';
import {Song} from './song';
import {BehaviorSubject} from 'rxjs';
import {Annotation} from './annotation';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  currentSong: Song;
  // currentPlayTime = 0;
  private streamSource = new BehaviorSubject([]);
  currentStream = this.streamSource.asObservable();
  private timeSource = new BehaviorSubject(0);
  currentTime = this.timeSource.asObservable();

  constructor() { }

  setPlayTime(timestamp: number): void {
    // this.currentPlayTime = timestamp;
    this.timeSource.next(timestamp);
  }

  setSong(song: Song): void {
    this.currentSong = song;
  }

  addToStream(item: Annotation): void {
    let newStreamArray = this.streamSource.getValue();
    newStreamArray.push(item);
    this.streamSource.next(newStreamArray);
  }
}
