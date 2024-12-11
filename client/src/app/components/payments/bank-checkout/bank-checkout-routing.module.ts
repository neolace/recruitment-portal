import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankCheckoutComponent } from './bank-checkout.component';

const routes: Routes = [{ path: '', component: BankCheckoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankCheckoutRoutingModule { }
