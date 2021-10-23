import {Component, Input, OnInit} from '@angular/core';
import {HarmonicsMetadata} from '../../../annotation-metadata';

@Component({
  selector: 'app-harmonic',
  templateUrl: './harmonic.component.html',
  styleUrls: ['./harmonic.component.css']
})
export class HarmonicComponent implements OnInit {
  @Input() metadata?: HarmonicsMetadata;

  initialTime : string
  endTime : string

  constructor() { }

  ngOnInit(): void {
    this.initialTime = new Date(this.metadata.beginCPA * 1000).toISOString().substr(14, 5)
    this.endTime = new Date(this.metadata.endCPA * 1000).toISOString().substr(14, 5)
  }

}
