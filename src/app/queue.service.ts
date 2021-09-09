/* tslint:disable:prefer-const */
import { Injectable } from '@angular/core';
import {QueueItem} from './queueitem';
import {Song} from './song';
import {BehaviorSubject} from 'rxjs';
import {Annotation} from './annotation';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private queueSource = new BehaviorSubject([]);
  currentQueue = this.queueSource.asObservable();
  queueIndex = 0;
  queueInitialised = false;

  constructor() { }

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
}
