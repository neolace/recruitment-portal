import { Component } from '@angular/core';
import {InterviewPrepDataStore} from "../../../shared/data-store/interview-prep-data-store";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-interview-prep-full-answer',
  templateUrl: './interview-prep-full-answer.component.html',
  styleUrls: ['./interview-prep-full-answer.component.scss']
})
export class InterviewPrepFullAnswerComponent {
  questionId: any;
  answerId: any;
  selectedQuestion: any;
  selectedAnswer: any;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.questionId = params.get('qid');
      this.answerId = params.get('aid');

      this.selectedQuestion = InterviewPrepDataStore.data
        .flatMap(q => q.questions)
        .find(question => question.id === this.questionId);

      this.selectedQuestion.answers.forEach((answer: any) => {
        if (answer.id === this.answerId) {
          this.selectedAnswer = answer;
        }
      })

      console.log(this.selectedQuestion);

      console.log(this.selectedAnswer);
    });
  }

  goBack() {
    this.location.back();
  }
}
