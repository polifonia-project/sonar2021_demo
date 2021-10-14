import {Component, Input, OnInit} from '@angular/core';
import {HarmonicsMetadata} from '../../../annotation-metadata';

@Component({
  selector: 'app-harmonic',
  templateUrl: './harmonic.component.html',
  styleUrls: ['./harmonic.component.css']
})
export class HarmonicComponent implements OnInit {
  @Input() metadata?: HarmonicsMetadata;

  constructor() { }

  ngOnInit(): void {
  }

}
