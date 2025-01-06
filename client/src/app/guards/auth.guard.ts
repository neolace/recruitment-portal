import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private cookieService:AuthService,
              private route:Router) {
  }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
    if(this.cookieService.isExists() && !this.cookieService.isLocked()){
      return true;
    }
    else{
      this.route.navigateByUrl('/login');
      return false;
    }
  }

}
