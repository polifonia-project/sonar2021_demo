import { Component, Input, OnInit } from '@angular/core';
import { QueueService } from '../queue.service';
import { Relationship } from '../relationship';
import {SongService} from '../song.service';
import {Song} from '../song';
import {MessageService} from '../message.service';

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
    private songService: SongService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    if (this.relationship) {
      this.fullSong = this.getSongDetails(this.relationship.songID);
    }
  }

  addToQueue(songID: string): void {
    const song = this.songService.getSongDetails(songID);
    this.queueService.addToQueue(song);
    this.messageService.showMessage(song.name + ' added to your playlist');
  }

  getSongDetails(songID: string): Song {
    return this.songService.getSongDetails(songID);
  }

}
