import { Component, Input, OnInit } from '@angular/core';
import { LocationMetadata } from 'src/app/annotation-metadata';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  @Input() metadata?: LocationMetadata;

  staticMapImageURL: string;

  constructor() {}

  ngOnInit(): void {
    if (this.metadata.long && this.metadata.lat) {
      this.staticMapImageURL = this.buildStaticMapImageURL(this.metadata.lat, this.metadata.long);
    }
    else {
      this.staticMapImageURL = null;
    }
  }

  buildStaticMapImageURL(latInput: number, lngInput: number, zoomInput: number = 8, pitchInput: number = 25): string {
    const apiKey = '28d8e857dddf4d96bd0798a8d575c34b';
    const base = 'https://maps.geoapify.com/v1/staticmap?';
    const style = 'osm-carto';
    const width = '400';
    const height = '300';
    const center = 'lonlat:' + lngInput + ',' + latInput;
    const zoom = zoomInput;
    const pitch = pitchInput;
    const marker = center + ';type:material;color:%23ff3421;icontype:awesome';
    const fullURL = base +
      'style=' + style +
      '&width=' + width +
      '&height=' + height +
      '&center=' + center +
      '&zoom=' + zoom +
      '&pitch=' + pitch +
      '&marker=' + marker +
      '&apiKey=' + apiKey;
    return fullURL;
  }

}
