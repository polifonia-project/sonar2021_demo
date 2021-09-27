import { Component, Input, OnInit } from '@angular/core';
import { QueueService } from '../queue.service';
import { Relationship } from '../relationship';
import {SongService} from '../song.service';
import {Song} from '../song';

@Component({
  selector: 'app-stream-item-related-song-item',
  templateUrl: './stream-item-related-song-item.component.html',
  styleUrls: ['./stream-item-related-song-item.component.css']
})
export class StreamItemRelatedSongItemComponent implements OnInit {

  @Input() relationship?: Relationship;

  fullSong: Song;

  constructor(
    private queueService: QueueService,
    private songService: SongService
  ) { }

  ngOnInit(): void {
    if (this.relationship) {
      this.fullSong = this.getSongDetails(this.relationship.songID);
    }
  }

  addToQueue(songID: string): void {
    this.queueService.addToQueueByID(songID);
  }

  getSongDetails(songID: string): Song {
    return this.songService.getSongDetails(songID);
  }

}
