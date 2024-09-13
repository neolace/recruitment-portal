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

  // Fetch all employees with caching
  fetchEmployees(): Observable<EmployeeModel[]>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('username:password')
    });

    if (!this.cacheInitialized) {
      this.http.get<EmployeeModel[]>(`${this.baseUrl}/employee/getAll`, {headers}).subscribe(data => {
        this.employeesSubject.next(data);
        this.cacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.employees$;
  }

  // Get a single employee by ID, cache the result
  getEmployee(id: any): Observable<EmployeeModel>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('username:password')
    });
    if (!this.cacheInitialized) {
      this.http.get<EmployeeModel>(`${this.baseUrl}/employee/get/${id}`, {headers}).subscribe(data => {
        this.employeeSubject.next(data); // Cache the single employee data
        this.cacheInitialized = true;
      });
    }
    return this.employee$;
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
      'Authorization': 'Basic ' + btoa('username:password')
    });

    return this.http.delete(`${this.baseUrl}/employee/delete/${id}`, {headers}).subscribe(() => {
      this.clearCache();  // Clear cache after deletion
      this.fetchEmployees(); // Re-fetch all employees
    });
  }

  // Update employee's personal details and refresh cache
  updateEmployee(employee: EmployeeModel) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('username:password')
    });
    return this.http.post(`${this.baseUrl}/employee/update` , employee, {headers}).subscribe(() => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullEmployee(employee.id); // Refresh the cache after updating
    });
  }

  // Clear cache
  private clearCache() {
    this.cacheInitialized = false;
    this.employeeSubject.next(null);  // Clear the cached data
  }
}
