import { Component, OnInit, Input } from '@angular/core';
import {Annotation} from '../annotation';
import { AnnotationGraphics } from '../annotation-graphics';
import { AnnotationGraphicsService } from '../annotation-graphics.service';

@Component({
  selector: 'app-stream-item',
  templateUrl: './stream-item.component.html',
  styleUrls: ['./stream-item.component.css']
})
export class StreamItemComponent implements OnInit {
  @Input() annotation?: Annotation;
  isRendered: boolean;
  annotationGraphics?: AnnotationGraphics


  constructor(private annotationGraphicsService: AnnotationGraphicsService) {
  }
  
  ngOnInit(): void {
    if (this.annotation) {
      this.annotationGraphics = this.annotationGraphicsService.getAnnotationGraphics(this.annotation.type)
    }
  }
  
  ngAfterContentInit() {
    setTimeout(
      () => {
        this.isRendered = true
      }, 10);    
  }
}
