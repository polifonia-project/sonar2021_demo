import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Annotation} from '../annotation';
import {Subscription} from 'rxjs';
import {StreamService} from '../stream.service';
import {AnnotationService} from '../annotation.service';
import {QueueService} from '../queue.service';
import {Song} from '../song';
import { SongService } from '../song.service';
import {last} from 'rxjs/operators';
import {StreamFilterService} from '../stream-filter.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit, OnDestroy {
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  stream: Annotation[] = [];
  filters: {};
  currentSongAnnotations: Annotation[] = [];
  currentTime = 0;
  lastCheckedTime = 0;
  timer;
  currentSong: Song;

  playing = false;
  streamSubscription: Subscription;
  timeSubscription: Subscription;
  currentSongSubscription: Subscription;
  filtersSubscription: Subscription;

  constructor(
    private streamService: StreamService,
    private annotationService: AnnotationService,
    private queueService: QueueService,
    private songService: SongService,
    private streamFilterService: StreamFilterService
  ) { }

  ngOnInit(): void {
    this.streamSubscription = this.streamService.currentStream.subscribe(stream => this.stream = stream);
    this.timeSubscription = this.streamService.currentTime.subscribe( time => this.currentTime = time);
    this.currentSongSubscription = this.queueService.currentSong.subscribe( song => this.currentSong = song);
    this.filtersSubscription = this.streamFilterService.currentFilters.subscribe( filters => this.filters = filters);

    // Start timer
    this.timer = setInterval(() => { this.checkForUpdates(); }, 1000);

    if (this.currentSong) {
      this.getCurrentSongAnnotations(this.currentSong.id);
    }
  }

  ngOnDestroy(): void {
    // Kill the timer
    clearInterval(this.timer);
  }

  emit(value){
    this.emitter.emit(value);
  }

  getSimpleString(input: string): string {
    // Take a complex URL string and return the part after the last slash, special characters removed
    let lastPart = input.split('/').pop();
    lastPart.replace(/[^a-zA-Z ]/g, '');
    return lastPart;
  }

  getCurrentSongAnnotations(songID: string): void {
    this.currentSongAnnotations = this.annotationService.getSongAnnotations(songID);
    // console.log (this.currentSongAnnotations);
  }

  checkForUpdates(): void {
    // Code here
    this.getCurrentSongAnnotations(this.currentSong.id);
    this.currentSongAnnotations.forEach( (annotation) => {
      const visible = (annotation.timestamp <= this.currentTime);
      let inStream = false;
      this.stream.forEach( (streamItem) => {
        if (streamItem.id === annotation.id) {
          inStream = true;
        }
      });
      if (!inStream && visible) {
        annotation.simpleID = this.getSimpleString(annotation.id);
        this.streamService.addToStream(annotation);
      }
    });
  }

  isPreviousSongAnnotation(annotationIndex: number): boolean {

    const playingSong = this.currentSong.id;
    const lastAnnotationIndex = 0;
    const scannedAnnotationSong = this.stream[annotationIndex].songID;
    const lastAnnotationSongInTheStream = this.stream[lastAnnotationIndex].songID;

    // this condition makes divisor pops when a song change but no annotation from new song are in the stream
    if (scannedAnnotationSong == lastAnnotationSongInTheStream && annotationIndex == lastAnnotationIndex) {
      if (scannedAnnotationSong != playingSong) {
        return true;
      }
    }


    if (annotationIndex === 0) {
      return false
    }
    const previousSongAnnotation = this.stream[annotationIndex-1].songID
    // this condition makes divisor pops when an annotation is from a song different from following annotation
    if (scannedAnnotationSong != previousSongAnnotation) {
      return true;
    }

    return false;
  }

  getSongDetailsByAnnotationIndex(annotationIndex: number): Song {
    return this.songService.getSongDetails(this.stream[annotationIndex].songID);
  }

}
