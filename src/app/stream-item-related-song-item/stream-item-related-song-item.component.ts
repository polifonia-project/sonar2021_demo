import { Component, Input, OnInit } from '@angular/core';
import { QueueService } from '../queue.service';
import { Relationship } from '../relationship';

@Component({
  selector: 'app-stream-item-related-song-item',
  templateUrl: './stream-item-related-song-item.component.html',
  styleUrls: ['./stream-item-related-song-item.component.css']
})
export class StreamItemRelatedSongItemComponent implements OnInit {

  @Input() song? : Relationship;

  constructor(private queueService: QueueService) { }

  ngOnInit(): void {
  }

  addToQueue(songID: string): void {
    this.queueService.addToQueue(songID);
  }

}
