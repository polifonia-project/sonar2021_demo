import { Component, OnInit } from '@angular/core';
import {QueueItem} from '../queueitem';
import {Subscription} from 'rxjs';
import {QueueService} from '../queue.service';
import {SongService} from '../song.service';
import {Song} from '../song';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  queue: QueueItem[] = [];
  queueSubscription: Subscription;

  constructor(
    private queueService: QueueService,
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.queueSubscription = this.queueService.currentQueue.subscribe(queue => this.queue = queue);
    // this.addToQueue('1001');
    // this.addToQueue('1004');
    // this.addToQueue('1003');
    // this.addToQueue('1002');
  }

  getSongDetails(id: string): Song {
    return this.songService.getSongDetails(id);
  }

  addToQueue(songID: string): void {
    this.queueService.addToQueue(songID);
  }

  removeFromQueue(index: number): void {
    this.queueService.removeFromQueue(index);
  }

}
