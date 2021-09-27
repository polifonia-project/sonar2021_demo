import { Component, Input, OnInit } from '@angular/core';
import { Relationship } from '../relationship';

@Component({
  selector: 'app-stream-item-related-songs',
  templateUrl: './stream-item-related-songs.component.html',
  styleUrls: ['./stream-item-related-songs.component.css']
})
export class StreamItemRelatedSongsComponent implements OnInit {

  @Input() relationships?: Relationship[];

  constructor() { }

  ngOnInit(): void {
  }

}
