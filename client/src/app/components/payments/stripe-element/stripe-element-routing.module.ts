import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StripeElementComponent } from './stripe-element.component';

const routes: Routes = [{ path: '', component: StripeElementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StripeElementRoutingModule { }
