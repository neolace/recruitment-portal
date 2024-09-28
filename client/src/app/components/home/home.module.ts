import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {HomeRoutingModule} from "./home-routing.module";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {GoogleAuthService} from "../../services/google-auth.service";

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
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    SharedPipesModule
  ],
  providers: [
    OAuthService,
    { provide: OAuthLogger, useClass: MyOAuthLogger },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: DateTimeProvider, useValue: new Date() },
    GoogleAuthService,
    UrlHelperService
  ],
})
export class HomeModule { }
