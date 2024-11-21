import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  baseUrl = environment.apiUrlSimple;

  constructor(private http: HttpClient) { }

  getHealthMetrics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get(`${this.baseUrl}/actuator/health`, {headers});
  }

  getPerformanceMetrics(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.get(`${this.baseUrl}/actuator/metrics`, {headers});
  }
}
