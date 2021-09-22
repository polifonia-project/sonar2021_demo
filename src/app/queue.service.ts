/* tslint:disable:prefer-const */
import { Injectable } from '@angular/core';
import {QueueItem} from './queueitem';
import {Song} from './song';
import {BehaviorSubject} from 'rxjs';
import {Annotation} from './annotation';
import {SongService} from './song.service';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  // queue and history managed here
  private queueSource = new BehaviorSubject([]);
  currentQueue = this.queueSource.asObservable();
  history: QueueItem[] = [];
  private currentSongSource = new BehaviorSubject( null);
  currentSong = this.currentSongSource.asObservable();
  queueIndex = 0;
  queueInitialised = false;

  constructor(
    private songService: SongService
  ) { }

  addToQueue(songID: string, addToHead: boolean = false): void {
    let newQueue = this.queueSource.getValue();
    if (addToHead) {
      newQueue.unshift(
        {
          songID,
          played: false
        }
      );
    }
    else {
      newQueue.push(
        {
          songID,
          played: false
        }
      );
    }
    this.queueSource.next(newQueue);
  }

  removeFromQueue(index: number): void {
    // Remove item from the play queue at this index
    let newQueue = this.queueSource.getValue();
    newQueue.splice(index, 1);
    this.queueSource.next(newQueue);
  }

  forwards(): void {
    // Move forwards to the next song in the queue

    // if there's a current song playing, move it into the history.
    if (this.currentSongSource.getValue() != null) {
      this.history.unshift(
        {
          songID: this.currentSongSource.getValue().id
        }
      );
    }

    if (this.queueSource.getValue().length === 0) {
      return;
    }

    let newCurrentSong = this.songService.getSongDetails(this.queueSource.getValue()[0].songID);
    this.currentSongSource.next(newCurrentSong);
    this.removeFromQueue(0);
  }

  backwards(): void {
    // Move backwards to the previous song in the queue

    if (this.history.length === 0) {
      return;
    }

    // Before we move back, put the current playing song on the head of the queue
    this.addToQueue(this.currentSongSource.getValue().id, true);
    let newCurrentSong = this.songService.getSongDetails(this.history[0].songID);
    this.currentSongSource.next(newCurrentSong);
    this.history.shift();
  }
}
