import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Annotation } from '../annotation';

@Component({
  selector: 'app-stream-item-details',
  templateUrl: './stream-item-details.component.html',
  styleUrls: ['./stream-item-details.component.css']
})
export class StreamItemDetailsComponent implements OnInit {


  @Input() annotation?: Annotation;
  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emit(value){
    this.emitter.emit(value);
  }

}
