import { Component, OnInit, Input } from '@angular/core';
import {Annotation} from '../annotation';
import {QueueService} from '../queue.service';

@Component({
  selector: 'app-stream-item',
  templateUrl: './stream-item.component.html',
  styleUrls: ['./stream-item.component.css']
})
export class StreamItemComponent implements OnInit {
  @Input() annotation?: Annotation;

  constructor(
    private queueService: QueueService
  ) { }

  ngOnInit(): void {

  }

  addToQueue(songID: string): void {
    this.queueService.addToQueue(songID);
  }

}
