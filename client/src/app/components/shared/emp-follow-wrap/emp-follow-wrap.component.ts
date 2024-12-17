import { Component } from '@angular/core';
import {singleEmployeeDataStore} from "../../../shared/data-store/single-employee-data-store";

@Component({
  selector: 'app-emp-follow-wrap',
  templateUrl: './emp-follow-wrap.component.html',
  styleUrls: ['./emp-follow-wrap.component.scss']
})
export class EmpFollowWrapComponent {
  activeFollowerTab: boolean = true;
  activeFollowingTab: boolean = false;
  employee: any;

  ngOnInit() {
    this.employee = singleEmployeeDataStore[0]
  }

  isActive(name: string) {
    switch (name) {
      case 'follower':
        this.activeFollowerTab = true;
        this.activeFollowingTab = false;
        break;
      case 'following':
        this.activeFollowingTab = true;
        this.activeFollowerTab = false;
        break;
      default:
        this.activeFollowerTab = true;
        this.activeFollowingTab = false;
        break;
    }
  }
}
