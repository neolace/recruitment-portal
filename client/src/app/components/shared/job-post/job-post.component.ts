import { Component } from '@angular/core';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent {

  selectedCategory: any = 'IT';
  selectedJobType: any = 'Web Developer';
  isOtherCategorySelected: boolean = false;
  isOtherJobTypeSelected: boolean = false;

  onCategoryChange(): void {
    this.isOtherCategorySelected = this.selectedCategory === 'Other';
  }

  onJobTypeChange(): void {
    this.isOtherJobTypeSelected = this.selectedJobType === 'Other';
  }
}
