import { Component } from '@angular/core';
import {InterviewPrepDataStore} from "../../../shared/data-store/interview-prep-data-store";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {DomSanitizer} from "@angular/platform-browser";

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

  constructor(private route: ActivatedRoute, private location: Location, private sanitizer: DomSanitizer) {}

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
          this.incrementViewCount(answer);
        }
      })
    });
  }

  getVideoUrl(url: string): any {
    // Assuming the video URL is a YouTube URL, convert it to an embeddable format
    const videoId = this.extractVideoId(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  extractVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length == 11) ? match[2] : null;
  }

  incrementViewCount(answer: any) {
    if (!sessionStorage.getItem(`token_${this.selectedAnswer.id}`)) {
      answer.viewCount++;
      sessionStorage.setItem(`token_${this.selectedAnswer.id}`, 'true');
    }
  }

  goBack() {
    this.location.back();
  }
}
