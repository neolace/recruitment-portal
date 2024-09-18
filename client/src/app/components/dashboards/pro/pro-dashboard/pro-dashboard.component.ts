import {AfterViewInit, Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-pro-dashboard',
  templateUrl: './pro-dashboard.component.html',
  styleUrls: ['./pro-dashboard.component.scss']
})
export class ProDashboardComponent implements AfterViewInit{

  constructor(private router: Router, private route: ActivatedRoute, private cookieService: AuthService) { }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  logout() {
    this.cookieService.logout()
    this.router.navigate(['/login']);
  }
}
