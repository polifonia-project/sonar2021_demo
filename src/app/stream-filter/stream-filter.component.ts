import { Component, OnInit } from '@angular/core';
import {StreamService} from '../stream.service';
import {StreamFilterService} from '../stream-filter.service';
import {Subscription} from 'rxjs';
import {StreamFilterItem} from '../stream-filter-item';
import { AnnotationGraphicsService } from '../annotation-graphics.service';

@Component({
  selector: 'app-stream-filter',
  templateUrl: './stream-filter.component.html',
  styleUrls: ['./stream-filter.component.css']
})
export class StreamFilterComponent implements OnInit {
  streamFilterSubscription: Subscription;
  filters: {};

  constructor(
    private streamService: StreamService,
    private streamFilterService: StreamFilterService,
    private graphicsService: AnnotationGraphicsService
  ) { }

  ngOnInit(): void {
    this.streamFilterService.initFilters();
    this.streamFilterSubscription = this.streamFilterService.currentFilters.subscribe( filters => this.filters = filters);
  }

  getFilterGraphics(filter) {
    return  this.graphicsService.getAnnotationGraphics(filter.type);
  }

  onSwitchToggle(type: string, event: any): void {
    this.streamFilterService.setFilterStatus(type, event.currentTarget.checked);
  }

}
