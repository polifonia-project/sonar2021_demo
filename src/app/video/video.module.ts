import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoComponent } from './video.component';



@NgModule({
  declarations: [
    VideoComponent
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
