import { Component } from '@angular/core';
import {InterviewPrepDataStore} from "../../../shared/data-store/interview-prep-data-store";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-interview-prep',
  templateUrl: './interview-prep.component.html',
  styleUrls: ['./interview-prep.component.scss']
})
export class InterviewPrepComponent {

  interviewPrepData:any[] = InterviewPrepDataStore.data;
  selectedQuestion: any = this.interviewPrepData[0].questions[0];

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<any> {
    await this.getAllQuestions().subscribe((data) => {
      this.interviewPrepData = [data];
      this.selectedQuestion = this.interviewPrepData[0].questions[0];
    })
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

  getAllQuestions(): Observable<any>{
    return this.http.get(`${this.baseUrl}/interview-questions/get`).pipe(
      tap(data => {
        this.interviewPrepData = [data];
      })
    );
  }
}
