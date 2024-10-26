import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewQuestionsComponent } from './interview-questions.component';

const routes: Routes = [{ path: '', component: InterviewQuestionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewQuestionsRoutingModule { }
