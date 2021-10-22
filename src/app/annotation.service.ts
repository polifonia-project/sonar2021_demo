import { Injectable } from '@angular/core';
import { Annotation } from './annotation';
import { Song } from './song';
import {HarmonicsMetadata, LocationMetadata, LyricsMetadata} from './annotation-metadata';
import ApplicationData from '../assets/data/merged.json';

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
    let annotation: Annotation;
    for (annotation of ApplicationData.annotations) {
      // assign a timestamp if necessary
      if (annotation.timestamp === 0) {
        annotation.timestamp = this.getRandomTimestamp();
      }
      // build annotation description
      annotation = this.generateAnnotationDescriptions(annotation);

      // push to main annotations list
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

  generateAnnotationDescriptions(annotation: Annotation): Annotation {
    let description: string = '';
    let shortDescription: string = '';

    switch (annotation.type) {
      case 'spatial':
        const spatialMetadata: LocationMetadata = annotation.metadata;
        shortDescription = this.capitalizeFirstLetter(spatialMetadata.sessionTypeLabel) + ' ' + spatialMetadata.placeLabel;
        description = spatialMetadata.sessionTypeLabel +
          ' ' + spatialMetadata.placeLabel +
          ' - ' + spatialMetadata.placeFullAddress;
        break;
      case 'harmonic':
        const harmonicMetadata: HarmonicsMetadata = annotation.metadata;
        shortDescription = 'Harmonic: Chord progression';
        description = 'Longest chord progression: ' + harmonicMetadata.longestChordProgression;
        break;
      case 'lyrics':
        const lyricsMetadata: LyricsMetadata = annotation.metadata;
        shortDescription = 'Lyric line: ' + lyricsMetadata.lyricLine;
        description = 'Lyric line' + lyricsMetadata.lyricLine;
        break;
      default:
        shortDescription = 'Generic annotation';
        description = '';
      // code block
    }
    annotation.description = description;
    annotation.shortDescription = shortDescription;
    return annotation;
  }

  capitalizeFirstLetter(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

}
