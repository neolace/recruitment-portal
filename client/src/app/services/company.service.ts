import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient ) { }

  private companySubject = new BehaviorSubject<any>(null);
  company$ = this.companySubject.asObservable();
  private companiesSubject = new BehaviorSubject<any>(null);
  companies$ = this.companiesSubject.asObservable();

  cacheInitialized = false;
  companiesCacheInitialized = false;

  fetchCompanies(): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });

    if (!this.companiesCacheInitialized) {
      this.http.get<any>(`${this.baseUrl}/company/getAll`, {headers}).subscribe(data => {
        this.companiesSubject.next(data);
        this.companiesCacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.companies$;
  }

  getCompany(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get<any>(`${this.baseUrl}/company/get/${id}`, {headers});
  }

  fetchFullCompany(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });

    // Use the cache if initialized
    if (this.cacheInitialized) {
      return this.company$; // Return the cached company data as observable
    }

    // Fetch from API and cache
    return this.http.get<any>(`${this.baseUrl}/batch/async/getCompany/${id}`, { headers }).pipe(
      tap((data) => {
        this.companySubject.next(data); // Cache main company data
        this.cacheInitialized = true; // Cache is initialized after the first fetch
      })
    );
  }
}
