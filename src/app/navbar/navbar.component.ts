import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItems: any[] = [];
  cartCount: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cartService: CartService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.cartCount = this.cartService.getCartCount();  // Assuming getCartCount is implemented
      });
    }
  }
}
