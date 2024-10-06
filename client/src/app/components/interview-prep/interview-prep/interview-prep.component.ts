import { Component } from '@angular/core';
import {InterviewPrepDataStore} from "../../../shared/data-store/interview-prep-data-store";

@Component({
  selector: 'app-interview-prep',
  templateUrl: './interview-prep.component.html',
  styleUrls: ['./interview-prep.component.scss']
})
export class InterviewPrepComponent {

  interviewPrepData:any[] = InterviewPrepDataStore.data;
  selectedQuestion: any = this.interviewPrepData[0].questions[0];

  constructor() {}

  ngOnInit(): void {
    this.incrementViewCount(this.selectedQuestion);
  }

  selectQuestion(question: any) {
    this.selectedQuestion = question;
    this.incrementViewCount(question);
  }

  incrementViewCount(question: any) {
    if (!sessionStorage.getItem(`token_${question.id}`)) {
      sessionStorage.setItem(`token_${question.id}`, 'true');
      question.viewCount++;
    }
  }
}
