export interface AnnotationMetadata {

}

export interface LocationMetadata extends AnnotationMetadata {
    long?: number;
    lat?: number;
}

export interface LyricsMetadata extends AnnotationMetadata {
    lyrics?: string[];
}

export interface HarmonicsMetadata extends AnnotationMetadata {
  longestChordProgression?: string;
  timestampIn?: number;
  timestampOut?: number;
}
