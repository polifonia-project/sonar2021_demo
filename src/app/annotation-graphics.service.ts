import { Injectable } from '@angular/core';
import { AnnotationGraphics } from './annotation-graphics';

type AnnotationGraphicsMap = {
  lyrics: AnnotationGraphics,
  spatial: AnnotationGraphics,
  harmonic: AnnotationGraphics
};

@Injectable({
  providedIn: 'root'
})
export class AnnotationGraphicsService {

  annotationGraphicsMap: AnnotationGraphicsMap = {
    lyrics: {
      title: 'Lyrics',
      color: '#d020d0',
      iconName: 'border_color'
    },
    spatial: {
      title: 'Location',
      color: '#90ff90',
      iconName: 'place'
    },
    harmonic: {
      title: 'Harmonic',
      color: '#9090ff',
      iconName: 'music_note'
    }
  };

  constructor() {}

  getAnnotationGraphics(annotationType: string): AnnotationGraphics | undefined {

    // define what to do if annotation type is not in the map

    return this.annotationGraphicsMap[annotationType];
  }

}
