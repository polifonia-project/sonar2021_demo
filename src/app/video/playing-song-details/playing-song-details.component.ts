import { Component, Input, OnInit } from '@angular/core';
import { Song } from 'src/app/song';

@Component({
  selector: 'app-playing-song-details',
  templateUrl: './playing-song-details.component.html',
  styleUrls: ['./playing-song-details.component.css']
})
export class PlayingSongDetailsComponent implements OnInit {

  @Input() playingSong?: Song;

  constructor() { }

  ngOnInit(): void {
    console.log('Song:', this.playingSong);
  }

}
