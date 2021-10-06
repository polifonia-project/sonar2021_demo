import { Component, Input, OnInit } from '@angular/core';
import { QueueService } from '../queue.service';
import { Relationship } from '../relationship';
import {SongService} from '../song.service';
import {Song} from '../song';
import {MessageService} from '../message.service';
import {Annotation} from '../annotation';
import {AnnotationService} from '../annotation.service';

@Component({
  selector: 'app-stream-item-related-song-item',
  templateUrl: './stream-item-related-song-item.component.html',
  styleUrls: ['./stream-item-related-song-item.component.css']
})
export class StreamItemRelatedSongItemComponent implements OnInit {

  @Input() relationship?: Relationship;

  fullSong: Song;
  targetAnnotation: Annotation;

  constructor(
    private queueService: QueueService,
    private songService: SongService,
    private messageService: MessageService,
    private annotationService: AnnotationService
  ) { }

  ngOnInit(): void {
    if (this.relationship) {
      this.targetAnnotation = this.annotationService.getAnnotationFromID(this.relationship.annotationID);
      this.fullSong = this.getSongDetails(this.targetAnnotation.songID);
    }
  }

  addToQueue(songID: string): void {
    // const song = this.songService.getSongDetails(songID);
    // this.queueService.addToQueue(song);
    this.queueService.addToQueue(this.fullSong);
    this.messageService.showMessage(this.fullSong.name + ' added to your playlist', 'done');
  }

  getSongDetails(songID: string): Song {
    return this.songService.getSongDetails(songID);
  }

}
