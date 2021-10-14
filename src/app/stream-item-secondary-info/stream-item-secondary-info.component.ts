import { Component, Input, OnInit } from '@angular/core';
import { Annotation } from '../annotation';

@Component({
  selector: 'app-stream-item-secondary-info',
  templateUrl: './stream-item-secondary-info.component.html',
  styleUrls: ['./stream-item-secondary-info.component.css']
})
export class StreamItemSecondaryInfoComponent implements OnInit {

  @Input() annotation?: Annotation;

  constructor() { }

  ngOnInit(): void {
  }

}
