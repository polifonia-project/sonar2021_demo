import { Component, Input, OnInit } from '@angular/core';
import { Annotation } from '../annotation';

@Component({
  selector: 'app-stream-item-header',
  templateUrl: './stream-item-header.component.html',
  styleUrls: ['./stream-item-header.component.css']
})
export class StreamItemHeaderComponent implements OnInit {

  @Input() annotation?: Annotation;

  constructor() { }

  ngOnInit(): void {
  }

}
