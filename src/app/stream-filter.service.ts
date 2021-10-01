import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StreamFilterItem} from './stream-filter-item';

@Injectable({
  providedIn: 'root'
})
export class StreamFilterService {
  private filtersSource = new BehaviorSubject<StreamFilterItem[]>(null);
  currentFilters = this.filtersSource.asObservable();

  constructor() { }

  initFilters(): void {
    // Initialise filters
    // FIXME - This can load from local storage to preserve state for users, eventually.
    const filters: StreamFilterItem[] = [
      {
        type: 'spatial',
        label: 'Locations',
        enabled: true
      },
      {
        type: 'lyrics',
        label: 'Lyrics',
        enabled: true
      },
      {
        type: 'harmonics',
        label: 'Harmonics',
        enabled: true
      }
    ];
    this.filtersSource.next(filters);
  }

  setFilterStatus(type: string, enabled: boolean): void {
    let locaFilters = this.filtersSource.getValue();
    locaFilters.forEach(value => {
      if (value.type === type) {
        value.enabled = enabled;
      }
    });
    this.filtersSource.next(locaFilters);
  }
}
