import { Injectable } from '@angular/core';
import { Annotation } from './annotation';
import { Song } from './song';
// @ts-ignore
import ApplicationData from '../assets/data/data_v1.json';

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
    this.annotations = [];
    for (const annotation of ApplicationData.annotations) {
      this.annotations.push(annotation);
    }
    this.annotationsInitialised = true;
  }

}
