import { Component } from '@angular/core';

@Component({
  selector: 'app-emp-follow-wrap',
  templateUrl: './emp-follow-wrap.component.html',
  styleUrls: ['./emp-follow-wrap.component.scss']
})
export class EmpFollowWrapComponent {
  activeFollowerTab: boolean = true;
  activeFollowingTab: boolean = false;

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
