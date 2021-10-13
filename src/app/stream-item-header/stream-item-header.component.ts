import { Component, Input, OnInit } from '@angular/core';
import { Annotation } from '../annotation';
import { AnnotationGraphics } from '../annotation-graphics';
import { AnnotationGraphicsService } from '../annotation-graphics.service';

@Component({
  selector: 'app-stream-item-header',
  templateUrl: './stream-item-header.component.html',
  styleUrls: ['./stream-item-header.component.css']
})
export class StreamItemHeaderComponent implements OnInit {

  @Input() annotation?: Annotation;
  annotationGraphics?: AnnotationGraphics;

  constructor(private annotationGraphicsService: AnnotationGraphicsService) {
  }

  ngOnInit(): void {
    if (this.annotation) {
      this.annotationGraphics = this.annotationGraphicsService.getAnnotationGraphics(this.annotation.type);
    }
  }
}
