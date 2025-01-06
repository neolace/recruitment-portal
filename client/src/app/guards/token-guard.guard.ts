import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {ApiResponse} from "../DTO/ApiResponse";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard  {

  baseUrl = environment.apiUrl

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token = route.queryParamMap.get('token');

    if (!token) {
      this.router.navigate(['/403']);
      return of(false);
    }

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa('admin:password')}`
    });

    return this.http.get<ApiResponse>(`${this.baseUrl}/validate-token?token=${token}`, { headers }).pipe(
      map(response => {
        return response.message === "Valid token";
      }),
      catchError(error => {
        this.router.navigate(['/403']);
        return of(false);
      })
    );
  }
}
