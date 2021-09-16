import {Component, OnInit, ViewChild} from '@angular/core';
import {YouTubePlayer} from '@angular/youtube-player';
import { Song } from '../song';
import {StreamService} from '../stream.service';

@Component({
  selector: 'app-video',
  // template: '<youtube-player (ready)="onReady($event)" videoId="vfxQ1oDiEJM"></youtube-player>',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild(YouTubePlayer) youtubePlayer!: YouTubePlayer;
  youtubeTarget: any;
  playing = false;
  currentPlayTime = 0;
  timer;

  constructor(
    private streamService: StreamService
  ) { }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  onReady($event): void {
    console.log($event);
    this.youtubeTarget = $event.target;
  }

  onStateChange(event): void {
    console.log(this.youtubePlayer);
    console.log(this.youtubePlayer.getCurrentTime());
    if (this.youtubePlayer
      && this.youtubePlayer.getPlayerState() === YT.PlayerState.PLAYING) {
      this.playing = true;
      this.startTicker();
    }
    else {
      this.playing = false;
      this.stopTicker();
    }
  }

  startTicker(): void {
    this.timer = setInterval(() => { this.tick(); }, 500);
  }

  stopTicker(): void {
    clearInterval(this.timer);
  }

  tick(): any {
    this.currentPlayTime = Math.round(this.youtubePlayer.getCurrentTime());
    this.streamService.setPlayTime(this.currentPlayTime);
  }

  play(): void {
    // PLAY THE SONG
    console.log('calling play function');
    this.youtubeTarget.playVideo();
  }

  pause(): void {
    // PAUSE THE SONG
    console.log('calling pause function');
    this.youtubeTarget.pauseVideo();
  }

  back(): void {
    // GO BACK IN THE PLAY QUEUE
  }

  forward(): void {
    // GO FORWARD IN THE PLAY QUEUE
  }

}
