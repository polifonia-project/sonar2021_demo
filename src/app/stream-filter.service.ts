import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StreamFilterItem} from './stream-filter-item';

@Injectable({
  providedIn: 'root'
})
export class StreamFilterService {
  private filtersSource = new BehaviorSubject<any>(null);
  currentFilters = this.filtersSource.asObservable();

  constructor() { }

  initFilters(): void {
    // Initialise filters
    // FIXME - This can load from local storage to preserve state for users, eventually.
    const filters = {
      spatial: undefined,
      lyrics: undefined
    };
    filters.spatial = {
      type: 'spatial',
      label: 'Locations',
      enabled: true
    };
    filters.lyrics = {
      type: 'lyrics',
      label: 'Lyrics',
      enabled: true
    };
    this.filtersSource.next(filters);
  }

  setFilterStatus(type: string, enabled: boolean): void {
    const localFilters = this.filtersSource.getValue();
    localFilters[type].enabled = enabled;
    this.filtersSource.next(localFilters);
  }

  getFilterStatus(type: string): boolean {
    return this.filtersSource.getValue()[type].enabled;
  }
}
