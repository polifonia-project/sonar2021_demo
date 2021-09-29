import { Component, Input, OnInit } from '@angular/core';
import { Annotation } from '../annotation';

@Component({
  selector: 'app-stream-item-details',
  templateUrl: './stream-item-details.component.html',
  styleUrls: ['./stream-item-details.component.css']
})
export class StreamItemDetailsComponent implements OnInit {


  @Input() annotation?: Annotation;

  constructor() { }

  ngOnInit(): void {
  }

}
