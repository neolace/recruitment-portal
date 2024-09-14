import { Injectable } from '@angular/core';
import { EmployeeModel } from "../shared/data-models/Employee.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // BehaviorSubject to store the employee data
  private employeeSubject = new BehaviorSubject<EmployeeModel | null>(null);
  employee$ = this.employeeSubject.asObservable();
  private employeesSubject = new BehaviorSubject<EmployeeModel[] | null>(null);
  employees$ = this.employeesSubject.asObservable();

  private cacheInitialized = false;
  private employeesCacheInitialized = false;

  // Fetch all employees with caching
  fetchEmployees(): Observable<EmployeeModel[]>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });

    if (!this.employeesCacheInitialized) {
      this.http.get<EmployeeModel[]>(`${this.baseUrl}/employee/getAll`, {headers}).subscribe(data => {
        this.employeesSubject.next(data);
        this.employeesCacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.employees$;
  }

  // Get a single employee by ID, cannot cache because it's need to fetch other employee data
  getEmployee(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get<EmployeeModel>(`${this.baseUrl}/employee/get/${id}`, {headers});
  }

  // Fetch all employee-related data asynchronously (from async batch API) with caching
  fetchFullEmployee(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });

    if (!this.cacheInitialized) {
      this.http.get<any>(`${this.baseUrl}/batch/async/getEmployee/${id}`, {headers}).subscribe(data => {
        this.employeeSubject.next(data); // Cache main employee data
        // You can store other data (contact, education, etc.) separately if needed
        this.cacheInitialized = true;
      });
    }
    return this.employee$;
  }

  // Delete employee and invalidate cache
  deleteEmployee(id: any) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });

    return this.http.delete(`${this.baseUrl}/employee/delete/${id}`, {headers}).subscribe(() => {
      this.clearCache();  // Clear cache after deletion
      this.fetchEmployees(); // Re-fetch all employees
    });
  }

  // Update employee's personal details and refresh cache
  updateEmployee(employee: EmployeeModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/employee/update` , employee, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullEmployee(employee.id); // Refresh the cache after updating
    });

    return this.employees$;
  }

  updateProfilePic(employee: EmployeeModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/employee/update/updateProfilePic` , employee, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullEmployee(employee.id); // Refresh the cache after updating
    });

    return this.employees$;
  }

  updateCoverPic(employee: EmployeeModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/employee/update/updateCoverPic` , employee, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullEmployee(employee.id); // Refresh the cache after updating
    });

    return this.employees$;
  }

  updateResume(employee: EmployeeModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/employee/update/updateResume` , employee, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullEmployee(employee.id); // Refresh the cache after updating
    });

    return this.employees$;
  }

  // Clear cache
  private clearCache() {
    this.cacheInitialized = false;
    this.employeeSubject.next(null);
  }

  private clearEmployeesCache() {
    this.employeesCacheInitialized = false;
    this.employeesSubject.next(null);
  }
}
