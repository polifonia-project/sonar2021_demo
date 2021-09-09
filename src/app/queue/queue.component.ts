import { Component, OnInit } from '@angular/core';
import {QueueItem} from '../queueitem';
import {Subscription} from 'rxjs';
import {QueueService} from '../queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  queue: QueueItem[] = [];
  queueSubscription: Subscription;

  constructor(
    private queueService: QueueService
  ) { }

  ngOnInit(): void {
    this.queueSubscription = this.queueService.currentQueue.subscribe(queue => this.queue = queue);
    this.addToQueue('1001');
    this.addToQueue('1002');
  }

  addToQueue(songID: string): void {
    this.queueService.addToQueue(songID);
  }

}
