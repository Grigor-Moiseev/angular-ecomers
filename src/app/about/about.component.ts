import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  images: string[] = [];
  currentIndex = 0;
  slideInterval: any;
  platformId!: Object;
  currentMall: string = 'East Point Mall';
  mallAddress: string = '2, AleKsandre Tvalchrelidze St, Tbilisi 0182';
  
  malls = [
    { name: 'East Point Mall', address: '2, AleKsandre Tvalchrelidze St, Tbilisi 0182' },
    { name: 'City Mall', address: '70 Vazha Pshavela Ave, Tbilisi 0186' },
    { name: 'Tbilisi Mall', address: 'Tbilisi Mall, Tbilisi' }
  ];

  constructor(@Inject(PLATFORM_ID) _platformId: Object) {
    this.platformId = _platformId;
    this.loadImages();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  loadImages() {
    for (let i = 10; i <= 19; i++) {
      this.images.push(`assets/caruselimg/${i}.png`);
    }
  }

  resetSlideInterval() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  prevSlide() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
      this.updateCarousel();
      this.resetSlideInterval();
    }
  }

  nextSlide() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
      this.updateCarousel();
      this.resetSlideInterval();
    }
  }

  goToSlide(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentIndex = index;
      this.updateCarousel();
      this.resetSlideInterval();
    }
  }

  updateCarousel() {
    if (isPlatformBrowser(this.platformId)) {
      const wrapper = document.querySelector('.carousel-wrapper') as HTMLElement;
      if (wrapper) {
        wrapper.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      }
    }
  }

  showMap(mallName: string, address: string) {
    this.currentMall = mallName;
    this.mallAddress = address;
  }
}
