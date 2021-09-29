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
import { TopbarComponent } from './topbar/topbar.component';
import { StreamItemHeaderComponent } from './stream-item-header/stream-item-header.component';
import { StreamItemMainInfoComponent } from './stream-item-main-info/stream-item-main-info.component';
import { StreamItemDetailsComponent } from './stream-item-details/stream-item-details.component';
import { StreamItemSocialButtonsComponent } from './stream-item-social-buttons/stream-item-social-buttons.component';
import { StreamItemRelatedSongsComponent } from './stream-item-related-songs/stream-item-related-songs.component';
import { StreamItemRelatedSongItemComponent } from './stream-item-related-song-item/stream-item-related-song-item.component';
import { StreamItemSecondaryInfoComponent } from './stream-item-secondary-info/stream-item-secondary-info.component';
import { LyricsComponent } from './stream-item-secondary-info/annotation-type-specific-info/lyrics/lyrics.component';
import { LocationComponent } from './stream-item-secondary-info/annotation-type-specific-info/location/location.component';
import { PageSwitchComponent } from './page-switch/page-switch.component';
import { HomeComponent } from './page-switch/pages/home/home.component';
import { PlaylistComponent } from './page-switch/pages/playlist/playlist.component';
import { FilterComponent } from './page-switch/pages/filter/filter.component';


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
    TopbarComponent,
    StreamItemHeaderComponent,
    StreamItemMainInfoComponent,
    StreamItemDetailsComponent,
    StreamItemSocialButtonsComponent,
    StreamItemRelatedSongsComponent,
    StreamItemRelatedSongItemComponent,
    StreamItemSecondaryInfoComponent,
    LyricsComponent,
    LocationComponent,
    PageSwitchComponent,
    HomeComponent,
    PlaylistComponent,
    FilterComponent,
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
