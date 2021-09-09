import { Injectable } from '@angular/core';
import { Annotation } from './annotation';
import {Song} from './song';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  annotations: Annotation[] = [];
  annotationsInitialised = false;

  constructor() {
  }

  getAnnotations(): Annotation[] {
    if (!this.annotationsInitialised) {
      this.initAnnotations();
    }
    return this.annotations;
  }

  getSongAnnotations(songID: string): Annotation[] {
    if (!this.annotationsInitialised) {
      this.initAnnotations();
    }

    // FIXME - Just returning a single dummy item for now for testing
    return [this.annotations[0]];
  }

  initAnnotations(): void {
    this.annotations.push(
      {
        id: '2001',
        songID: '1001',
        timestamp: 5,
        type: 'lyrics',
        relationships: [
          {
            songID: '1002',
            type: 'lyrics',
            score: 45
          }
        ],
        description: 'These lyrics refer to a barbershop in Liverpool'
      }
    );

    this.annotations.push(
      {
        id: '2002',
        songID: '1001',
        timestamp: 7,
        type: 'spatial',
        relationships: [
          {
            songID: '1001',
            type: 'spatial',
            score: 68
          }
        ],
        lat: 52.5,
        lng: -0.75,
        placeName: 'Liverpool',
      }
    );

    this.annotationsInitialised = true;
  }

}
