import { Injectable } from '@angular/core';
import {EmployeeModel} from "../shared/data-models/Employee.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private employeeSubject = new BehaviorSubject<EmployeeModel[]>([]);
  employee$ = this.employeeSubject.asObservable();
  private cacheInitialized = false;

  fetchEmployees(): Observable<EmployeeModel[]> {
    if (!this.cacheInitialized) {
      this.http.get<EmployeeModel[]>(this.baseUrl+'/employee/getAll').subscribe(data => {
        this.employeeSubject.next(data);
        this.cacheInitialized = true; // Mark cache as initialized
      });
    }
    return this.employee$;
  }

  getEmployee(id: number) {
    return this.http.get<EmployeeModel[]>(this.baseUrl+'/employee/get/'+id).subscribe((data) => {
      this.employeeSubject.next(data);
      this.cacheInitialized = true; // Mark cache as initialized
    });
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.baseUrl+'/employee/delete/'+id).subscribe(() => {
      this.fetchEmployees();
    });
  }

  updatePersonalDetails(employee: EmployeeModel){
    return this.http.post(this.baseUrl+'/employee/update', employee).subscribe(() => {
      this.fetchEmployees();
    });
  }

  updateContactDetails(employee: EmployeeModel) {
    return this.http.post(this.baseUrl+'/employee/updateContact', employee).subscribe(() => {
      this.fetchEmployees();
    });
  }

  addSkills(employee: EmployeeModel) {
    return this.http.post(this.baseUrl+'/employee/addSkills', employee).subscribe(() => {
      this.fetchEmployees();
    });
  }

  addExperience(employee: EmployeeModel) {
    return this.http.post(this.baseUrl+'/employee/addExperience', employee).subscribe(() => {
      this.fetchEmployees();
    });
  }

  addEducation(employee: EmployeeModel) {
    return this.http.post(this.baseUrl+'/employee/addEducation', employee).subscribe(() => {
      this.fetchEmployees();
    });
  }

  addSocialLinks(employee: EmployeeModel) {
    return this.http.post(this.baseUrl+'/employee/addSocialLinks', employee).subscribe(() => {
      this.fetchEmployees();
    });
  }

  addAccountNotifications(employee: EmployeeModel) {
    return this.http.post(this.baseUrl+'/employee/addAccountNotifications', employee).subscribe(() => {
      this.fetchEmployees();
    });
  }

  addMarketingNotifications(employee: EmployeeModel) {
    return this.http.post(this.baseUrl+'/employee/addMarketingNotifications', employee).subscribe(() => {
      this.fetchEmployees();
    });
  }
}
