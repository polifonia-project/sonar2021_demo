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
    let tempAnnotationArray: Annotation[] = [];
    for (let i = 0; i < this.annotations.length; i++){
      if (this.annotations[i].songID === songID){
        tempAnnotationArray.push(this.annotations[i]);
      }
    }
    return tempAnnotationArray;
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
        timestamp: 15,
        type: 'spatial',
        relationships: [
          {
            songID: '1001',
            type: 'spatial',
            score: 68
          },
          {
            songID: '1002',
            type: 'spatial',
            score: 38
          }
        ],
        description: 'This barbershop was in Liverpool',
        metadata: {
          lat: 52.5,
          lng: -0.75,
          placeName: 'Liverpool',
        }
      }
    );

    // NEXT SONG

    this.annotations.push(
      {
        id: '2003',
        songID: '1002',
        timestamp: 5,
        type: 'lyrics',
        relationships: [
          {
            songID: '1003',
            type: 'lyrics',
            score: 45
          }
        ],
        description: 'These lyrics demonstrate Michael Jackson\'s early work'
      }
    );

    this.annotations.push(
      {
        id: '2004',
        songID: '1002',
        timestamp: 15,
        type: 'spatial',
        relationships: [
          {
            songID: '1001',
            type: 'spatial',
            score: 68
          },
          {
            songID: '1004',
            type: 'spatial',
            score: 38
          }
        ],
        description: 'This song was written in Atlanta, Texas',
        metadata: {
          lat: 52.5,
          lng: -0.75,
          placeName: 'Atlanta, Texas',
        }
      }
    );

    // NEXT SONG

    this.annotations.push(
      {
        id: '2005',
        songID: '1003',
        timestamp: 5,
        type: 'lyrics',
        relationships: [
          {
            songID: '1004',
            type: 'lyrics',
            score: 45
          }
        ],
        description: 'Mick Jagger\'s lyrics here are heavily blues influenced.'
      }
    );

    this.annotations.push(
      {
        id: '2006',
        songID: '1003',
        timestamp: 15,
        type: 'spatial',
        relationships: [
          {
            songID: '1001',
            type: 'spatial',
            score: 68
          },
          {
            songID: '1002',
            type: 'spatial',
            score: 38
          }
        ],
        description: 'The Rolling Stones recorded this album in Alabama',
        metadata: {
          lat: 52.5,
          lng: -0.75,
          placeName: 'Alabama, USA',
        }
      }
    );

    // NEXT SONG

    this.annotations.push(
      {
        id: '2007',
        songID: '1004',
        timestamp: 5,
        type: 'lyrics',
        relationships: [
          {
            songID: '1002',
            type: 'lyrics',
            score: 45
          }
        ],
        description: 'This song is often cited as one of the greatest songs ever written.'
      }
    );

    this.annotations.push(
      {
        id: '2008',
        songID: '1004',
        timestamp: 15,
        type: 'spatial',
        relationships: [
          {
            songID: '1001',
            type: 'spatial',
            score: 68
          },
          {
            songID: '1003',
            type: 'spatial',
            score: 38
          }
        ],
        description: 'Toto makes extensive reference to Africa in this song.',
        metadata: {
          lat: 52.5,
          lng: -0.75,
          placeName: 'Africa',
        }
      }
    );

    this.annotationsInitialised = true;
  }

}
