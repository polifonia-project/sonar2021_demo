import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoComponent } from './video.component';
import { PlayingSongDetailsComponent } from './playing-song-details/playing-song-details.component';



@NgModule({
  declarations: [
    VideoComponent,
    PlayingSongDetailsComponent
  ],
  imports: [
    CommonModule,
    YouTubePlayerModule
  ],
  exports: [
    VideoComponent
  ]
})
export class VideoModule { }
