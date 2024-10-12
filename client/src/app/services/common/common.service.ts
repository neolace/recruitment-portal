import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  requestMoreData(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.post(`${this.baseUrl}/email/contact/${email}`, {}, {headers});
  }

  subscribeNewsLatter(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    return this.http.put(`${this.baseUrl}/news-latter/subscribe`, {email: email}, {headers});
  }
}
