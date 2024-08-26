import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  cCheck = true;
  eCheck = false;
  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['from'] === 'companies') {
        this.cCheck = false;
        this.eCheck = true;
      } else {
        this.cCheck = true;
        this.eCheck = false;
      }
    })
  }

}
