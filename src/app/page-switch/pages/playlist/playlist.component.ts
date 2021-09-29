import { Component, OnInit } from '@angular/core';
import { QueueService } from 'src/app/queue.service';
import { QueueItem } from '../../../queueitem';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(private queueService: QueueService) {
  }

  ngOnInit(): void {
  }


}
