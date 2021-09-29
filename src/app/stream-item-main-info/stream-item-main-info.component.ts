import { Component, Input, OnInit } from '@angular/core';
import { Annotation } from '../annotation';

@Component({
  selector: 'app-stream-item-main-info',
  templateUrl: './stream-item-main-info.component.html',
  styleUrls: ['./stream-item-main-info.component.css']
})
export class StreamItemMainInfoComponent implements OnInit {

  @Input() annotation?: Annotation;

  constructor() { }

  ngOnInit(): void {
  }

}
