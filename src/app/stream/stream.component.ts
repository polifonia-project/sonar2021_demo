import { Component, OnInit } from '@angular/core';
import {Annotation} from '../annotation';
import {Subscription} from 'rxjs';
import {StreamService} from '../stream.service';
import {AnnotationService} from '../annotation.service';
import {QueueService} from '../queue.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  stream: Annotation[] = [];
  streamSubscription: Subscription;

  constructor(
    private streamService: StreamService,
    private annotationService: AnnotationService,
    private queueService: QueueService
  ) { }

  ngOnInit(): void {
    this.streamSubscription = this.streamService.currentStream.subscribe(stream => this.stream = stream);

    //FIXME - This is for testing
    this.addDummyAnnotation();

    console.log(this.stream);
  }

  addDummyAnnotation(): void {
    const tempAnnotation = this.annotationService.getSongAnnotations('1001')[0];
    this.streamService.addToStream(tempAnnotation);
  }

}
