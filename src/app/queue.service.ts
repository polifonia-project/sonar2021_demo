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

  addToQueue(songID: string): void {
    let newQueue = this.queueSource.getValue();
    newQueue.push(
      {
        songID,
        played: false
      }
    );
    this.queueSource.next(newQueue);
  }

  removeFromQueue(index: number): void {
    // Remove item from the play queue at this index
    let newQueue = this.queueSource.getValue();
    newQueue.splice(index, 1);
    this.queueSource.next(newQueue);
  }

  getCurrentQueueItem(): QueueItem {
    const currentQueue = this.queueSource.getValue();
    return currentQueue[this.queueIndex];
  }

  forwards(): void {
    // Move forwards to the next song in the queue
    // FIXME - Currently breaks when the queue is empty
    console.log (this.queueSource.getValue());
    let newCurrentSong = this.songService.getSongDetails(this.queueSource.getValue()[0].songID);
    this.currentSongSource.next(newCurrentSong);
    this.removeFromQueue(0);
  }

  backwards(): void {
    // Move backwards to the previous song in the queue

  }
}
