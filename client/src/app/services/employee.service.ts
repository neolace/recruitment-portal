import { Injectable } from '@angular/core';
import { EmployeeModel } from "../shared/data-models/Employee.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
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

    // Use the cache if initialized
    if (this.cacheInitialized) {
      return this.employee$; // Return the cached employee data as observable
    }

    // Fetch from API and cache
    return this.http.get<any>(`${this.baseUrl}/batch/async/getEmployee/${id}`, { headers }).pipe(
      tap((data) => {
        this.employeeSubject.next(data); // Cache main employee data
        this.cacheInitialized = true;
      }),
      catchError((error) => {
        return throwError(error); // Re-throw the error so that the component can handle it
      })
    );
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

  addSkills(skills: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post(`${this.baseUrl}/emp_skills/add` , skills, {headers}).pipe(
      tap((data) => {
        this.clearCache(); // Invalidate the cache
        this.fetchFullEmployee(skills.employeeId); // Refresh the cache after updating
      }),
      catchError((error) => {
        return throwError(error); // Re-throw the error so that the component can handle it
      })
    )
  }

  deleteSkill(employeeId: string, skillId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.delete(`${this.baseUrl}/emp_skills/delete-single/${employeeId}/${skillId}`, { headers }).pipe(
      tap((data) => {
        this.clearCache(); // Invalidate the cache
        this.fetchFullEmployee(employeeId); // Refresh the cache after updating
      }),
      catchError((error) => {
        return throwError(error); // Re-throw the error so that the component can handle it
      })
    );
  }

  editSkill(employeeId: string, updatedSkill: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.put(`${this.baseUrl}/emp_skills/edit-single/${employeeId}`, updatedSkill, { headers }).pipe(
      tap((data) => {
        this.clearCache(); // Invalidate the cache
        this.fetchFullEmployee(employeeId); // Refresh the cache after updating
      }),
      catchError((error) => {
        return throwError(error); // Re-throw the error so that the component can handle it
      })
    );
  }

  addExperience(experience: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post(`${this.baseUrl}/emp_experiences/add` , experience, {headers}).pipe(
      tap((data) => {
        this.clearCache(); // Invalidate the cache
        this.fetchFullEmployee(experience.employeeId); // Refresh the cache after updating
      }),
      catchError((error) => {
        return throwError(error); // Re-throw the error so that the component can handle it
      })
    )
  }

  deleteExperience(employeeId: string, experienceId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.delete(`${this.baseUrl}/emp_experiences/delete-single/${employeeId}/${experienceId}`, { headers }).pipe(
      tap((data) => {
        this.clearCache(); // Invalidate the cache
        this.fetchFullEmployee(employeeId); // Refresh the cache after updating
      }),
      catchError((error) => {
        return throwError(error); // Re-throw the error so that the component can handle it
      })
    );
  }

  editExperience(employeeId: string, updatedExperience: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.put(`${this.baseUrl}/emp_experiences/edit-single/${employeeId}`, updatedExperience, { headers }).pipe(
      tap((data) => {
        this.clearCache(); // Invalidate the cache
        this.fetchFullEmployee(employeeId); // Refresh the cache after updating
      }),
      catchError((error) => {
        return throwError(error); // Re-throw the error so that the component can handle it
      })
    );
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
