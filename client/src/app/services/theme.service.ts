import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkTheme: boolean = false;
  private currentColorShading: string = 'green';
  private themeSubject = new BehaviorSubject<boolean>(this.isDarkTheme);
  private colorSubject = new BehaviorSubject<string>(this.currentColorShading);

  constructor() { }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    this.themeSubject.next(this.isDarkTheme);

    this.applyTheme();
  }

  changeColorShading(color: string) {
    this.currentColorShading = color;
    this.applyTheme(); // Reapply the theme with the new color
    this.colorSubject.next(this.currentColorShading);
  }

  applyTheme() {
    // Clear previously applied theme
    document.body.classList.remove(
      'theme-blue-light', 'theme-blue-dark',
      'theme-green-light', 'theme-green-dark',
      'theme-orange-light', 'theme-orange-dark',
      'theme-red-light', 'theme-red-dark',
      'theme-purple-light', 'theme-purple-dark'
    );

    // Add the new theme based on color and mode
    const themeClass = `theme-${this.currentColorShading}-${this.isDarkTheme ? 'dark' : 'light'}`;
    document.body.classList.add(themeClass);
  }

  isDarkMode() {
    return this.isDarkTheme;
  };

  getThemeObservable() {
    return this.themeSubject.asObservable();
  }

  getColorObservable() {
    return this.colorSubject.asObservable();
  }

  getCurrentColor() {
    return this.currentColorShading;
  }
}
