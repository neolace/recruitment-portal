import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | any;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | any;

  zoom = 12;
  center: google.maps.LatLngLiteral | any;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  markers:any = [
    {
      position: {
        lat: 6.918604,
        lng: 79.865564,
      },
      label: {
        color: '#5faee3',
        text: 'We are here',
      },
      title: 'SPARKC pvt ltd',
      info: 'Visit our location',
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    }
  ];
  infoContent = '';

  ngOnInit() {
    this.center = {
      lat: 6.918604,
      lng: 79.865564,
    };
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }

  openInfo(marker: HTMLElement, content: any) {
    const mark = marker as unknown as MapMarker;
    this.infoContent = content;
    this.info.open(mark);
  }

}
