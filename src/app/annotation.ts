import { AnnotationMetadata } from './annotation-metadata';
import {Relationship} from './relationship';

export interface Annotation {
  id: string;
  simpleID?: string;
  type: string;
  songID: string;
  timestamp: number;
  relationships: Relationship[];
  description?: string;
  shortDescription?: string;
  metadata?: AnnotationMetadata;
}
