import { Component } from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-free-main-db',
  templateUrl: './free-main-db.component.html',
  styleUrls: ['./free-main-db.component.scss']
})
export class FreeMainDbComponent {
  progressValue = 50;
  progressMode: ProgressSpinnerMode = 'determinate';
}
