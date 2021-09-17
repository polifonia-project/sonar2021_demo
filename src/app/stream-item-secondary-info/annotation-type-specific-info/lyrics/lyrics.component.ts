import { Component, Input, OnInit } from '@angular/core';
import { LyricsMetadata } from 'src/app/annotation-metadata';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.css']
})
export class LyricsComponent implements OnInit {

  @Input() metadata? : LyricsMetadata;

  constructor() { }

  ngOnInit(): void {
  }

}
