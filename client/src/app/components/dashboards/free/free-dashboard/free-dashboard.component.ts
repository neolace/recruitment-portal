import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {EmployeeService} from "../../../../services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-free-dashboard',
  templateUrl: './free-dashboard.component.html',
  styleUrls: ['./free-dashboard.component.scss']
})
export class FreeDashboardComponent implements AfterViewInit, OnInit {

  employeeId: any;
  employeeName: any;
  employeeEmail: any;
  employeeProfile: any;

  organizationId: any;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private cookieService: AuthService) { }

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    this.organizationId = this.cookieService.organization();
    if (!this.organizationId || !this.employeeId) {
      window.location.reload();
      return;
    }
    this.getEmployee(this.employeeId);
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getEmployee(id: any) {
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employeeEmail = data?.employee?.email;
        this.employeeName = data?.employee?.firstname + ' ' + data?.employee?.lastname;
        this.employeeProfile = data?.employee?.image;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.cookieService.logout()
    this.router.navigate(['/login']);
  }
}
