import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {ThemeService} from "./services/theme.service";
import {NavigationEnd, Router} from "@angular/router";
import {LockScreenComponent} from "./components/lock-screen/lock-screen.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('navbarNav') navbarNav: ElementRef | any;
  title = 'SPARKC HR System';

  showNavbar = true;
  showFooter = true;

  constructor(public themeService: ThemeService, private router: Router, private renderer: Renderer2 ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Logic to update active class based on the current route
        this.updateActiveClass();

        const mainBody = document.querySelector('.main-body');
        if (mainBody) {
          mainBody.scrollTop = 0;
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
  }

  ngAfterViewInit() {
  }

  updateActiveClass() {
    const currentRoute = this.router.url;

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });

    const activeLink = document.querySelector(`.nav-link[href="${currentRoute}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isActive(s: string) {
    return this.router.url === s;
  }

  collapseNavbar() {
    const navbar = this.navbarNav.nativeElement;
    if (navbar.classList.contains('show')) {
      this.renderer.removeClass(navbar, 'show');
    }
  }

  toggleCommonComponent(component: any) {
    if (component instanceof LockScreenComponent){
      this.showNavbar = false;
      this.showFooter = false;
    } else {
      this.showNavbar = true;
      this.showFooter = true;
    }
  }
}
