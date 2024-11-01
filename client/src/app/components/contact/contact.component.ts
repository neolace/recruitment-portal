import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValueIncrementService} from "../../services/value-increment.service";
import {CommonService} from "../../services/common/common.service";
import {AlertsService} from "../../services/alerts.service";
import {Utilities} from "../../shared/utilities/utilities";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
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

  contactUsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  })
  loading: boolean = false;

  utilities = Utilities;

  constructor(private commonService: CommonService, private alertService: AlertsService) { }

  ngOnInit() {
    this.initMap();
  }

  initMap(){
    this.center = {
      lat: 6.918604,
      lng: 79.865564,
    };
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
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

  contactUs() {
    if (this.contactUsForm.valid) {
      this.loading = true;
      this.commonService.contactUs({
        name: this.contactUsForm.get('name')?.value,
        email: this.contactUsForm.get('email')?.value,
        subject: this.contactUsForm.get('subject')?.value,
        message: this.contactUsForm.get('message')?.value
      }).subscribe((res: any) => {
        this.loading = false;
        this.contactUsForm.reset();
        this.alertService.successMessage('Thank you for contacting us. We will get back to you shortly.', 'Contact Us');
      }, (err: any) => {
        this.loading = false;
        this.alertService.errorMessage('Something went wrong. Please try again.', 'Contact Us');
      })
    } else {
      this.alertService.errorMessage('Please fill in all the required fields.', 'Contact Us');
    }
  }
}
