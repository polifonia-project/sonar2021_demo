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
  queue: Song[] = [];
  queueSubscription: Subscription;

  constructor(
    private queueService: QueueService,
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.queueSubscription = this.queueService.currentQueue.subscribe(queue => this.queue = queue);
  }

  getSongDetails(id: string): Song {
    return this.songService.getSongDetails(id);
  }

  addToQueueByID(songID: string): void {
    this.songService.getSongDetails(songID);
    this.queueService.addToQueue(this.songService.getSongDetails(songID));
  }

  addToQueue(song: Song): void {
    this.queueService.addToQueue(song);
  }

  removeFromQueue(index: number): void {
    this.queueService.removeFromQueue(index);
  }

}
