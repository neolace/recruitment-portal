import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-emp-followers',
  templateUrl: './emp-followers.component.html',
  styleUrls: ['./emp-followers.component.scss']
})
export class EmpFollowersComponent {

  @Input() followers: any[] = [];
}
