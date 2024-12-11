import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "../../../services/alerts.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-pre-order',
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.scss']
})
export class PreOrderComponent implements OnInit{
  subscriptionForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    product: new FormControl('', [Validators.required])
  })

  constructor(private alertService: AlertsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  order(){
    this.alertService.warningMessage('This feature will available soon', 'warning')
  }
}
