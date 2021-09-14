import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StreamComponent } from './stream/stream.component';
import { QueueComponent } from './queue/queue.component';
import { StreamItemComponent } from './stream-item/stream-item.component';
import {VideoModule} from './video/video.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';


@NgModule({
  declarations: [
    AppComponent,
    AudioPlayerComponent,
    HomepageComponent,
    StreamComponent,
    QueueComponent,
    StreamItemComponent,
    NavbarComponent,
    NavbarItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YouTubePlayerModule,
    VideoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
