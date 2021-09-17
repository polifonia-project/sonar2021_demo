import { Injectable } from '@angular/core';
import { AnnotationGraphics } from './annotation-graphics';

type AnnotationGraphicsMap = {
  lyrics: AnnotationGraphics,
  spatial: AnnotationGraphics
}

@Injectable({
  providedIn: 'root'
})
export class AnnotationGraphicsService {

  annotationGraphicsMap : AnnotationGraphicsMap = {
    lyrics: {
      title: "Lyrics",
      color: "purple",
      iconName: "border_color"
    },
    spatial: {
      title: "Musical Locations",
      color: "green",
      iconName: "place"
    }
  }

  constructor() {}

  getAnnotationGraphics(annotationType : string) : AnnotationGraphics | undefined {

    // define what to do if annotation type is not in the map

    return this.annotationGraphicsMap[annotationType]
  }

}
