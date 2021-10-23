export interface AnnotationMetadata {

}

export interface LocationMetadata extends AnnotationMetadata {
  placeLabel?: string;
  placeFullAddress?: string;
  placeLong?: number;
  placeLat?: number;
  sessionTypeLabel?: string;
}

export interface LyricsMetadata extends AnnotationMetadata {
    lyricLine?: string;
}

export interface HarmonicsMetadata extends AnnotationMetadata {
  longestChordProgression?: string;
  beginCPA?: number;
  endCPA?: number;
}
