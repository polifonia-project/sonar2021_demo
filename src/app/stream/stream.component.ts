import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Annotation} from '../annotation';
import {Subscription} from 'rxjs';
import {StreamService} from '../stream.service';
import {AnnotationService} from '../annotation.service';
import {QueueService} from '../queue.service';
import {Song} from '../song';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit, OnDestroy {
  stream: Annotation[] = [];
  currentSongAnnotations: Annotation[] = [];
  currentTime = 0;
  lastCheckedTime = 0;
  timer;
  currentSong: Song;

  playing = false;
  streamSubscription: Subscription;
  timeSubscription: Subscription;
  currentSongSubscription: Subscription;

  constructor(
    private streamService: StreamService,
    private annotationService: AnnotationService,
    private queueService: QueueService
  ) { }

  ngOnInit(): void {
    this.streamSubscription = this.streamService.currentStream.subscribe(stream => this.stream = stream);
    this.timeSubscription = this.streamService.currentTime.subscribe( time => this.currentTime = time);
    this.currentSongSubscription = this.queueService.currentSong.subscribe( song => this.currentSong = song);

    // Start timer
    this.timer = setInterval(() => { this.checkForUpdates(); }, 1000);

    this.getCurrentSongAnnotations(this.currentSong.id);

    console.log(this.stream);
  }

  ngOnDestroy(): void {
    // Kill the timer
    clearInterval(this.timer);
  }

  getCurrentSongAnnotations(songID: string): void {
    this.currentSongAnnotations = this.annotationService.getSongAnnotations(songID);
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
        this.streamService.addToStream(annotation);
      }
    });
  }

}
