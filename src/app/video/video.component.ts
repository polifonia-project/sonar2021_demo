import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {YouTubePlayer} from '@angular/youtube-player';
import { Song } from '../song';
import {StreamService} from '../stream.service';
import {QueueService} from '../queue.service';
import {SongService} from '../song.service';
import {Subscription} from 'rxjs';
import {QueueItem} from '../queueitem';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild(YouTubePlayer) youtubePlayer!: YouTubePlayer;

  youtubeTarget: any;
  playing = false;
  currentSong: Song;
  currentPlayTime = 0;
  timer;
  queue: Song[];
  queueSubscription: Subscription;
  currentSongSubscription: Subscription;

  constructor(
    private streamService: StreamService,
    private queueService: QueueService,
    private songService: SongService
  ) { }

  ngOnInit(): void {
    this.queueSubscription = this.queueService.currentQueue.subscribe( queue => this.queue = queue);
    this.currentSongSubscription = this.queueService.currentSong.subscribe( song => this.currentSong = song);
    this.queueService.addToQueueByID('https://w3id.org/polifonia/resource/Recording/00001');
    this.queueService.addToQueueByID('https://w3id.org/polifonia/resource/Recording/00002');
    // this.queueService.addToQueueByID('https://w3id.org/polifonia/resource/Recording/00003');
    // this.queueService.addToQueueByID('https://w3id.org/polifonia/resource/Recording/00004');
    // this.queueService.addToQueueByID('1001');
    // this.queueService.addToQueueByID('1002');
    // this.queueService.addToQueueByID('1003');
    // this.queueService.addToQueueByID('1004');
    this.forward();
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.initPlayer();
  }

  initPlayer(): void {
    // Called when we move to a new song. Reset counters, stream(??), status and so on
    this.currentPlayTime = 0;
    this.streamService.setPlayTime(this.currentPlayTime);
  }

  onReady($event): void {
    // console.log($event);
    this.youtubeTarget = $event.target;
  }

  onStateChange(event): void {
    // console.log(this.youtubePlayer);
    // console.log(this.youtubePlayer.getCurrentTime());
    if (this.youtubePlayer
      && this.youtubePlayer.getPlayerState() === YT.PlayerState.PLAYING) {
      this.playing = true;
      this.startTicker();
    }
    else {
      if (this.playing) {
        // We think we're still playing but the YT player thinks now, we've probably reached the end of a song or just loaded a new song
        this.play();
      }
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
    // FIXME - If there is no current song, move forward in the queue
    // console.log('calling play function');
    this.playing = true;
    this.youtubeTarget.playVideo();
  }

  pause(): void {
    // PAUSE THE SONG
    // console.log('calling pause function');
    this.playing = false;
    this.youtubeTarget.pauseVideo();
  }

  backwards(): void {
    // GO BACK IN THE PLAY QUEUE
    // If we're more than 2 seconds into the current song, just return to the start of the song.
    // Else jump back to the previous song.
    if (this.currentPlayTime > 2) {
      this.youtubeTarget.seekTo(0, true);
      this.initPlayer();
    }
    else {
      this.queueService.backwards();
      this.initPlayer();
      if (this.youtubePlayer && this.youtubePlayer.getPlayerState() >= 0) {
        this.youtubePlayer.seekTo(0, true);
      }
    }
  }

  forward(): void {
    // GO FORWARD IN THE PLAY QUEUE
    this.queueService.forwards();
    this.initPlayer();
    if (this.youtubePlayer && this.youtubePlayer.getPlayerState() >= 0) {
      this.youtubePlayer.seekTo(0, true);
    }

  }

}
