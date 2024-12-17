import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-emp-followings',
  templateUrl: './emp-followings.component.html',
  styleUrls: ['./emp-followings.component.scss']
})
export class EmpFollowingsComponent {

  @Input() followings: any[] = []
}
