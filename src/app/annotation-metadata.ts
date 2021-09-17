export interface AnnotationMetadata {

}

export interface LocationMetadata extends AnnotationMetadata {
    long? : number
    lat?: number
}

export interface LyricsMetadata extends AnnotationMetadata {
    lyrics?: string[]
}