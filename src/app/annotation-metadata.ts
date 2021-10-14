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
    lyrics?: string[];
}

export interface HarmonicsMetadata extends AnnotationMetadata {
  longestChordProgression?: string;
  timestampIn?: number;
  timestampOut?: number;
}
