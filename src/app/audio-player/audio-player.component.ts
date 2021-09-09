import { Component, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';
import {QueueService} from '../queue.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  public YT: any;
  public video: any;
  public player: any;

  songs: Song[];

  constructor(
    private songService: SongService,
    private queueService: QueueService
  ) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  getSongs(): void {
    this.songs = this.songService.getSongs();
  }

}
