import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewPrepFullAnswerRoutingModule } from './interview-prep-full-answer-routing.module';
import { InterviewPrepFullAnswerComponent } from './interview-prep-full-answer.component';


@NgModule({
  declarations: [
    InterviewPrepFullAnswerComponent
  ],
  imports: [
    CommonModule,
    InterviewPrepFullAnswerRoutingModule
  ]
})
export class InterviewPrepFullAnswerModule { }
