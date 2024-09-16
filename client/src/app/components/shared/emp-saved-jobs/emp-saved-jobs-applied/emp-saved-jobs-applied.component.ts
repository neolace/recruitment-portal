import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../../../services/employee.service";
import {AuthService} from "../../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {jobAdDataStrore} from "../../../../shared/data-store/JobAd-data-strore";

@Component({
  selector: 'app-emp-saved-jobs-applied',
  templateUrl: './emp-saved-jobs-applied.component.html',
  styleUrls: ['./emp-saved-jobs-applied.component.scss']
})
export class EmpSavedJobsAppliedComponent implements AfterViewInit, OnInit {

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  userSavedIds: any[] = [];

  jobAdDataStore: any[] = jobAdDataStrore; //for test
  constructor(private employeeService: EmployeeService, private cookieService: AuthService, private toastr: ToastrService ) { }

  ngAfterViewInit(): void {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  ngOnInit(): void {
    this.employeeId = this.cookieService.userID();
    this.getEmployee(this.employeeId);
  }

  getEmployee(id: any) {
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.userSavedIds = this.employee.employee.savedJobs.map((job: any) => job.jobId);
      },
      (error: any) => {
        this.warningMessage('Please Login First to Apply Jobs', 'Reminder');
      }
    );
  }

  filterJobs():any[] {
    return this.jobAdDataStore.filter((job: any) => this.userSavedIds.includes(job.JobId) && job.status === 'applied' || job.status === 'expired');
  }

  successMessage(msg: string, title: string) {
    this.toastr.success(msg, title, {
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    });
  }

  errorMessage(msg: string, title: string) {
    this.toastr.error(msg, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
    });
  }

  warningMessage(msg: string, title: string) {
    this.toastr.warning(msg, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
}
