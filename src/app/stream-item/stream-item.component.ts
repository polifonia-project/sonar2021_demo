import { Component, OnInit, Input } from '@angular/core';
import {Annotation} from '../annotation';

@Component({
  selector: 'app-stream-item',
  templateUrl: './stream-item.component.html',
  styleUrls: ['./stream-item.component.css']
})
export class StreamItemComponent implements OnInit {
  @Input() annotation?: Annotation;

  constructor(
  ) { }

  ngOnInit(): void {

  }
}
