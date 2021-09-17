import { Component, Input, OnInit } from '@angular/core';
import { LocationMetadata } from 'src/app/annotation-metadata';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() metadata? : LocationMetadata;

  constructor() {}

  ngOnInit(): void {
  }

}
