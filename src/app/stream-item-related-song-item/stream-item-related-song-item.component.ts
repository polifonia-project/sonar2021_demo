import { Component, Input, OnInit } from '@angular/core';
import { Relationship } from '../relationship';

@Component({
  selector: 'app-stream-item-related-song-item',
  templateUrl: './stream-item-related-song-item.component.html',
  styleUrls: ['./stream-item-related-song-item.component.css']
})
export class StreamItemRelatedSongItemComponent implements OnInit {

  @Input() song? : Relationship;

  constructor() { }

  ngOnInit(): void {
  }

  addToQueue(song) {

  }

}
