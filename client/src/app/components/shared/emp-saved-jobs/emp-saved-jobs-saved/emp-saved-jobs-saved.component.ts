import {AfterViewInit, Component} from '@angular/core';
import {jobAdDataStrore} from "../../../../shared/data-store/JobAd-data-strore";
import {EmployeeService} from "../../../../services/employee.service";
import {AuthService} from "../../../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-emp-saved-jobs-saved',
  templateUrl: './emp-saved-jobs-saved.component.html',
  styleUrls: ['./emp-saved-jobs-saved.component.scss']
})
export class EmpSavedJobsSavedComponent implements AfterViewInit{

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  userSavedIds: any[] = [];

  jobAdDataStore: any[] = jobAdDataStrore; //for test
  filteredJobs: any[] = []; //for test
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
    this.filteredJobs = this.jobAdDataStore.filter((job: any) => this.userSavedIds.includes(job.id));
    return this.filteredJobs;
  }

  removeFav(id: string) {
    this.employeeService.removeFavJobs(this.employeeId, id).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.successMessage('Job Removed Successfully', 'Success');
    }, (error: any) => {
      this.errorMessage('Something went wrong. Please try again', 'Error');
    });
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

  isExpired(savedJobs:any, id:any, expiryDate: any) {
    const currentDate = new Date().getTime();
    const jobExpiryDate = new Date(expiryDate).getTime();

    const job = savedJobs.find((j: any) => j.jobId === id);
    if (job.status === 'Expired') {
      if (currentDate < jobExpiryDate) {
        this.employeeService.editFavJobStatus(this.employeeId, {
          jobId: id,
          status: 'Saved'
        })
        return false;
      }
      return true;
    } else {
      if (currentDate > jobExpiryDate) {
        this.employeeService.editFavJobStatus(this.employeeId, {
          jobId: id,
          status: 'Expired'
        }).subscribe((data) => {
          this.getEmployee(this.employeeId);
        })
        return true;
      }
    }

    return false;
  }
}
