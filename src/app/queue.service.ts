/* tslint:disable:prefer-const */
import { Injectable } from '@angular/core';
import {QueueItem} from './queueitem';
import {Song} from './song';
import {BehaviorSubject} from 'rxjs';
import {Annotation} from './annotation';
import {SongService} from './song.service';
import {AnnotationService} from './annotation.service';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  // queue and history managed here
  private queueSource = new BehaviorSubject([]);
  currentQueue = this.queueSource.asObservable();
  history: Song[] = [];
  private currentSongSource = new BehaviorSubject( null);
  currentSong = this.currentSongSource.asObservable();
  queueIndex = 0;
  queueInitialised = false;

  constructor(
    private songService: SongService,
    private annotationService: AnnotationService
  ) { }

  addToQueue(song: Song, addToHead: boolean = false): void {
    let newQueue = this.queueSource.getValue();
    if (addToHead) {
      newQueue.unshift(song);
    }
    else {
      newQueue.push(song);
    }
    this.queueSource.next(newQueue);
  }

  addToQueueByID(songID: string, addToHead: boolean = false): void {
    const song = this.songService.getSongDetails(songID);
    this.addToQueue(song, addToHead);
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
    // if no more songs in the queue, add a random one from the list of related songs.
    if (this.currentSongSource.getValue() != null) {
      this.history.unshift(this.currentSongSource.getValue());
    }

    if (this.queueSource.getValue().length === 0) {
      // We have an empty queue, get all related songs and add a random one to the queue
      const relatedSongs = this.annotationService.getRelatedSongs(this.currentSongSource.getValue().id);
      this.addToQueueByID(relatedSongs[Math.floor(Math.random() * relatedSongs.length)]);
    }

    let newCurrentSong = this.queueSource.getValue()[0];
    this.currentSongSource.next(newCurrentSong);
    this.removeFromQueue(0);
  }

  backwards(): void {
    // Move backwards to the previous song in the queue

    if (this.history.length === 0) {
      return;
    }

    // Before we move back, put the current playing song on the head of the queue
    this.addToQueue(this.currentSongSource.getValue(), true);
    let newCurrentSong = this.history[0];
    this.currentSongSource.next(newCurrentSong);
    this.history.shift();
  }
}
