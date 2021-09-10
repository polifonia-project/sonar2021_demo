import {Component, OnInit, ViewChild} from '@angular/core';
import { Song } from '../song';
import { SongService } from '../song.service';
import {QueueService} from '../queue.service';
import {YouTubePlayer} from '@angular/youtube-player';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  @ViewChild('YouTubePlayer') youtube?: YouTubePlayer;

  public YT: any;
  public video: any;
  public player: any;
  videoID = 'vfxQ1oDiEJM';

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
