import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent {
  subscription: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadSubscription();
  }

  loadSubscription() {
    this.httpClient.get('/api/subscriptions').subscribe((data) => {
      this.subscription = data;
    });
  }
}
