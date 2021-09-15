import { Component, Input, OnInit } from '@angular/core';
import { Annotation } from '../annotation';

@Component({
  selector: 'app-stream-item-social-buttons',
  templateUrl: './stream-item-social-buttons.component.html',
  styleUrls: ['./stream-item-social-buttons.component.css']
})
export class StreamItemSocialButtonsComponent implements OnInit {

  @Input() annotation?: Annotation;

  constructor() { }

  ngOnInit(): void {
  }

}
