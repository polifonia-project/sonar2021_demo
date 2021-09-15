import {Relationship} from './relationship';

export interface Annotation {
  id: string;
  type: string;
  songID: string;
  timestamp: number;
  relationships: Relationship[];
  description?: string;
  metadata?: any;
}

