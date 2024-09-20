import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {CompanyModel} from "../shared/data-models/Company.model";

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

  updateCompany(company: CompanyModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/company/update` , company, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullCompany(company.id); // Refresh the cache after updating
    });

    return this.company$;
  }

  updateLogoPic(company: CompanyModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/company/update/updateLogo` , company, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullCompany(company.id); // Refresh the cache after updating
    });

    return this.company$;
  }

  updateCoverPic(company: CompanyModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/company/update/updateCover` , company, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullCompany(company.id); // Refresh the cache after updating
    });

    return this.company$;
  }

  updateThumb1Pic(company: CompanyModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/company/update/updateThumb1` , company, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullCompany(company.id); // Refresh the cache after updating
    });

    return this.company$;
  }

  updateThumb2Pic(company: CompanyModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/company/update/updateThumb2` , company, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullCompany(company.id); // Refresh the cache after updating
    });

    return this.company$;
  }

  updateThumb3Pic(company: CompanyModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/company/update/updateThumb3` , company, {headers}).subscribe(data => {
      this.clearCache(); // Invalidate the cache
      this.fetchFullCompany(company.id); // Refresh the cache after updating
    });

    return this.company$;
  }

  addSocial(social: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post(`${this.baseUrl}/cmp_socials/add` , social, {headers}).pipe(
      tap((data) => {
        this.clearCache(); // Invalidate the cache
        this.fetchFullCompany(social.companyId); // Refresh the cache after updating
      }),
      catchError((error) => {
        return throwError(error); // Re-throw the error so that the component can handle it
      })
    )
  }

  editSocial(companyId: string, social: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.put(`${this.baseUrl}/cmp_socials/edit-single/${companyId}`, social, { headers }).pipe(
      tap((data) => {
        this.clearCache(); // Invalidate the cache
        this.fetchFullCompany(social.companyId); // Refresh the cache after updating
      }),
      catchError((error) => {
        return throwError(error); // Re-throw the error so that the component can handle it
      })
    );
  }

  updateNotifications(company: CompanyModel): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.put(`${this.baseUrl}/company/update/notifications` , company, {headers}).subscribe(data => {

    });

    return this.company$;
  }

  private clearCache() {
    this.cacheInitialized = false;
    this.companySubject.next(null);
  }

  clearCompaniesCache() {
    this.companiesCacheInitialized = false;
    this.companiesSubject.next(null);
  }
}
