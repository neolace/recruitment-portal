import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ValueIncrementService} from "../../services/value-increment.service";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('achievementsSection') achievementsSection!: ElementRef;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | any;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | any;

  jobsAch: number = 0;
  branchesAch: number = 0;
  countriesAch: number = 2;
  jobsAchValue: number = 0;
  branchesAchValue: number = 0;
  countriesAchValue: number = 0;
  observer!: IntersectionObserver;

  zoom = 12;
  center: google.maps.LatLngLiteral | any;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8
  };
  markers:any = [
    {
      position: {
        lat: 6.918604,
        lng: 79.865564,
      },
      label: {
        color: '#fff',
        text: 'Meet Us Here',
        weight: 'bold',
        fontSize: '20px'
      },
      title: 'Talent Boozt Pvt LTD',
      info: 'Visit our location',
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    }
  ];
  infoContent = '';

  constructor(private valueIncrementService: ValueIncrementService) { }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  ngOnInit(): void {
    this.jobsAch = localStorage.getItem('jobsAch') ? Number(localStorage.getItem('jobsAch')) : 0;
    this.branchesAch = localStorage.getItem('branchesAch') ? Number(localStorage.getItem('branchesAch')) : 0;
    this.center = {
      lat: 6.918604,
      lng: 79.865564,
    };
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is in view, start the animation
          this.incrementJobsValue(this.jobsAch, 100);
          this.incrementBranchesValue(this.branchesAch, 100);
          this.incrementCountriesValue(this.countriesAch, 100);
          // Once the animation has started, we can stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Start observing the achievements section
    if (this.achievementsSection) {
      this.observer.observe(this.achievementsSection.nativeElement);
    }
  }

  incrementJobsValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.jobsAchValue = value;
    }, interval);
  }

  incrementBranchesValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.branchesAchValue = value;
    }, interval);
  }

  incrementCountriesValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.countriesAchValue = value;
    }, interval);
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
