import { Injectable } from '@angular/core';
import { Annotation } from './annotation';
import { Song } from './song';
// @ts-ignore
import ApplicationData from '../assets/data/data_v7b-harmonic-test.json';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {
  annotations: Annotation[] = [];
  annotationsInitialised = false;
  randomTimestampWindow = 15;

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
    const tempAnnotationArray: Annotation[] = [];
    for (const item of this.annotations) {
      if (item.songID === songID){
        tempAnnotationArray.push(item);
      }
    }
    return tempAnnotationArray;
  }

  getRelatedSongs(sourceSongID: string): string[] {
    const relatedSongs: string[] = [];
    let songAnnotations: Annotation[];
    songAnnotations = this.getSongAnnotations(sourceSongID);
    for (const annotation of songAnnotations) {
      for (const relation of annotation.relationships) {
        const targetSongID = this.getAnnotationFromID(relation.annotationID).songID;
        relatedSongs.push(targetSongID);
      }
    }
    return relatedSongs;
  }

  initAnnotations(): void {
    this.annotations = [];
    for (const annotation of ApplicationData.annotations) {
      if (annotation.timestamp === 0) {
        annotation.timestamp = this.getRandomTimestamp();
      }
      this.annotations.push(annotation);
    }
    this.annotationsInitialised = true;
  }

  getAnnotationFromID(annotationID: string): Annotation {
    if (!this.annotationsInitialised) {
      this.initAnnotations();
    }
    for (const item of this.annotations) {
      if (item.id === annotationID) {
        return item;
      }
    }
    return null;
  }

  getRandomTimestamp(): number {
    return Math.floor(Math.random() * (this.randomTimestampWindow + 1));
  }

}
