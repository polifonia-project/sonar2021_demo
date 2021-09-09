import {Relationship} from './relationship';

export interface Annotation {
  id: string;
  type: string;
  songID: string;
  timestamp: number;
  relationships: Relationship[];
  description?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
  details?: string;
}

