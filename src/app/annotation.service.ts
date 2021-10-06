import { Injectable } from '@angular/core';
import { Annotation } from './annotation';
import { Song } from './song';
// @ts-ignore
import ApplicationData from '../assets/data/data_v4.json';

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
    let tempAnnotationArray: Annotation[] = [];
    for (const item of this.annotations) {
      if (item.songID === songID){
        tempAnnotationArray.push(item);
      }
    }
    return tempAnnotationArray;
  }

  initAnnotations(): void {
    this.annotations = [];
    for (const annotation of ApplicationData.annotations) {
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

}
