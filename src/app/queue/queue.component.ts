import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {QueueService} from '../queue.service';
import {SongService} from '../song.service';
import {Song} from '../song';
import {MessageService} from '../message.service';

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
    private songService: SongService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.queueSubscription = this.queueService.currentQueue.subscribe(queue => this.queue = queue);
  }

  getSongDetails(id: string): Song {
    return this.songService.getSongDetails(id);
  }

  addToQueueByID(songID: string): void {
    const song = this.songService.getSongDetails(songID);
    this.queueService.addToQueue(song);
    this.messageService.showMessage(song.name + ' has been added to your playlist', 'done');
  }

  addToQueue(song: Song): void {
    this.queueService.addToQueue(song);
  }

  removeFromQueue(index: number): void {
    this.queueService.removeFromQueue(index);
    this.messageService.showMessage('Song deleted from queue', 'delete');
  }

}
