import { Component, OnInit } from '@angular/core';
import {Song} from './song';
import {Annotation} from './annotation';
import {QueueItem} from './queueitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SONAR Demo';

  ngOnInit(): void {
  }


}


