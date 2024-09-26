import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobApplyService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private jobApplySubject = new BehaviorSubject<any>(null);
  private jobApplySubjectByCompanyId = new BehaviorSubject<any>(null);
  jobApply$ = this.jobApplySubject.asObservable();
  jobApplyByCompanyId$ = this.jobApplySubjectByCompanyId.asObservable();

  private jobApplyCacheInitialized = false;
  private jobApplyByCompanyIdCacheInitialized = false;

  fetchJobApply(): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    if (!this.jobApplyCacheInitialized) {
      this.http.get<any>(`${this.baseUrl}/cmp_job-apply/getAll`, {headers}).subscribe(data => {
        this.jobApplySubject.next(data);
        this.jobApplyCacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.jobApply$;
  }

  fetchJobApplyByCompanyId(companyId: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    if (!this.jobApplyByCompanyIdCacheInitialized) {
      this.http.get<any>(`${this.baseUrl}/cmp_job-apply/getByCompanyId/${companyId}`, {headers}).subscribe(data => {
        this.jobApplySubjectByCompanyId.next(data);
        this.jobApplyByCompanyIdCacheInitialized = true; // Cache is initialized after the first fetch
      });
    }
    return this.jobApplyByCompanyId$;
  }

  addApplicant(companyId: any, jobId: any, jobApplicant: any): Observable<any>|any {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post<any>(`${this.baseUrl}/cmp_job-apply/addApplicant/${companyId}/${jobId}`, jobApplicant, {headers});
  }
}
