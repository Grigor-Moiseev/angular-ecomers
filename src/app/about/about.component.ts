import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']  // Corrected styleUrls
})
export class AboutComponent {
  images: string[] = [];

  constructor() {
    this.loadImages();
  }

  loadImages() {
    for (let i = 10; i <= 19; i++) {
      this.images.push(`assets/caruselimg/${i}.png`);
    }
  }
}
