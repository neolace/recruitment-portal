import { Component } from '@angular/core';
import {countries} from "../../../shared/data-store/countries";

@Component({
  selector: 'app-emp-profile-settings',
  templateUrl: './emp-profile-settings.component.html',
  styleUrls: ['./emp-profile-settings.component.scss']
})
export class EmpProfileSettingsComponent {
  countriesSet: any[] = countries
}
