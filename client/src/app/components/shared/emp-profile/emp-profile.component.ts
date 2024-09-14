import {Component, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {EmployeeService} from "../../../services/employee.service";

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit{

  progressValue = 8;
  progressMode: ProgressSpinnerMode = 'determinate';

  employee: any;
  employeeId: any = '66e31aa7217eb911ad764373'; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  loading: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  async ngOnInit(): Promise<any> {
    this.getEmployee(this.employeeId)
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.calculateProfileProgress(this.employee?.employee);
      },
      (error) => {
        console.error('Error fetching employee data', error);
        this.loading = false;
      }
    );
  }

  calculateProfileProgress(data: any) {
    this.loading = false;
    if (!data || !data.profileCompleted) {
      this.progressValue = 0; // Or any other default value
      return;
    }

    const profileCompletion = data.profileCompleted;
    if (typeof profileCompletion !== 'object' || profileCompletion === null) {
      // Handle case where profileCompletion is not an object or is null
      this.progressValue = 0; // Or any other default value
      return;
    }

    const completionArray = Object.values(profileCompletion);
    const total = completionArray.length;
    const completed = completionArray.filter((item: any) => item === true).length;
    this.progressValue = Math.round((completed / total) * 100);
  }
}
