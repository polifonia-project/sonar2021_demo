import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();

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

  emit(value){
    const message = 'Skipping ahead to : ' + value.timestamp + 'seconds';
    this.messageService.showMessage(message,'info')
    this.emitter.emit(value);
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

  formatChordProgressionTimeInterval(begin: number, end: number) : string {
    const b = new Date(begin * 1000).toISOString().substr(14, 5) 
    const e = new Date(end * 1000).toISOString().substr(14, 5)
    return b + " - " + e
  }

}
