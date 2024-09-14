import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements AfterViewInit{

  selectedCategory: any = 'IT';
  selectedJobType: any = 'Web Developer';
  isOtherCategorySelected: boolean = false;
  isOtherJobTypeSelected: boolean = false;

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  onCategoryChange(): void {
    this.isOtherCategorySelected = this.selectedCategory === 'Other';
  }

  onJobTypeChange(): void {
    this.isOtherJobTypeSelected = this.selectedJobType === 'Other';
  }
}
