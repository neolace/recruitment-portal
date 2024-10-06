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

  ngOnInit(): void {}

  selectQuestion(question: any) {
    this.selectedQuestion = question;
  }

  incrementViewCount(answer: any) {
    answer.viewCount++;
  }
}
