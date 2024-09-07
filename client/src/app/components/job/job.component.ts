import { Component } from '@angular/core';
import {jobAdDataStrore} from "../../shared/data-store/JobAd-data-strore";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {

  heart: boolean = false; //test
  jobAdDataStore: any = jobAdDataStrore;
}
