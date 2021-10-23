import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {YouTubePlayer} from '@angular/youtube-player';
import { Song } from '../song';
import {StreamService} from '../stream.service';
import {QueueService} from '../queue.service';
import {SongService} from '../song.service';
import {Subscription} from 'rxjs';
import {QueueItem} from '../queueitem';
import {MessageService} from '../message.service';

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
  currentPlayTimeString: string = '0:00';
  totalPlayTime = 0;
  totalPlayTimeString: string;
  timer;
  queue: Song[];
  queueSubscription: Subscription;
  currentSongSubscription: Subscription;
  waitingToJump = 0;

  constructor(
    private streamService: StreamService,
    private queueService: QueueService,
    private songService: SongService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.queueSubscription = this.queueService.currentQueue.subscribe( queue => this.queue = queue);
    this.currentSongSubscription = this.queueService.currentSong.subscribe( song => this.currentSong = song);
    this.queueService.addToQueueByID('https://w3id.org/polifonia/resource/Recording/isophonics_258');
    // this.queueService.addToQueueByID('https://w3id.org/polifonia/resource/Recording/isophonics_243')
    // this.queueService.addToQueueByID('https://w3id.org/polifonia/resource/Recording/00188');
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

  formatSeconds(totalTime: number): string {
    const minutes = Math.floor(totalTime / 60);
    const seconds = Math.round(totalTime - (minutes * 60));
    let minStr = minutes.toString();
    let secStr = seconds.toString();
    if (minStr.length < 2) {
      minStr = '0' + minStr;
    }
    if (secStr.length < 2) {
      secStr = '0' + secStr;
    }
    return minStr + ':' + secStr;
  }

  onStateChange(event): void {
    // console.log(this.youtubePlayer);
    // console.log(this.youtubePlayer.getCurrentTime());
    if (this.youtubePlayer) {
      this.totalPlayTime = this.youtubePlayer.getDuration();
      this.totalPlayTimeString = this.formatSeconds(this.totalPlayTime);
    }
    if (this.youtubePlayer
      && this.youtubePlayer.getPlayerState() === YT.PlayerState.PLAYING) {
      this.playing = true;
      this.startTicker();
      if (this.waitingToJump > 0) {
        this.youtubePlayer.seekTo(this.waitingToJump, true);
        this.currentPlayTime = Math.round(this.youtubePlayer.getCurrentTime());
        this.streamService.setPlayTime(this.currentPlayTime);
        this.waitingToJump = 0;
      }
    }
    else {
      if (this.playing) {
        // We think we're still playing but the YT player thinks not, we've probably reached the end of a song or just loaded a new song
        this.play();
      } else {
        this.pause();
      }
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
    this.currentPlayTimeString = this.formatSeconds(this.currentPlayTime);
    this.streamService.setPlayTime(this.currentPlayTime);
  }

  play(): void {
    // PLAY THE SONG
    if (this.youtubeTarget.getPlayerState() === 0) { // state 0 = video ended
      // Video has ended, move forwards
      this.forward();
    }
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
      this.youtubePlayer.seekTo(20, true);
    }
  }

  jumpTo(songID: string, timestamp: number): void {
    timestamp = Math.round(timestamp);
    this.waitingToJump = timestamp;
    this.queueService.addToQueueByID(songID, true);
    this.queueService.forwards();
  }

}
