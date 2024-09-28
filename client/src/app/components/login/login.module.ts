import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {CommonModule, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {GoogleAuthService} from "../../services/google-auth.service";
import {OAuthLogger, OAuthModule, OAuthService, UrlHelperService} from "angular-oauth2-oidc";

class MyOAuthLogger extends OAuthLogger {
  debug(message?: any, ...optionalParams: any[]): void {
  }

  error(message?: any, ...optionalParams: any[]): void {
  }

  info(message?: any, ...optionalParams: any[]): void {
  }

  log(message?: any, ...optionalParams: any[]): void {
  }

  warn(message?: any, ...optionalParams: any[]): void {
  }
}

@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        OAuthModule.forRoot()
    ],
  providers: [
    OAuthService,
    { provide: OAuthLogger, useClass: MyOAuthLogger },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    GoogleAuthService,
    UrlHelperService
  ],
})
export class LoginModule { }
