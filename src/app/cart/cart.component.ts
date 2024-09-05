import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  showPopup: boolean = false;
  purchaseDetails = {
    name: '',
    address: '',
    paymentMethod: 'creditCard'
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cartService: CartService,
    private router: Router  // Inject Router
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    if (isPlatformBrowser(this.platformId)) {
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
      });
    }
  }

  deleteItem(itemId: number) {
    if (confirm("Are you sure you want to delete the item?")) {
      if (isPlatformBrowser(this.platformId)) {
        this.cartService.removeFromCart(itemId);  // Remove item by id
        this.cartItems = this.cartItems.filter(item => item.id !== itemId); // Remove item from local array
      }
    }
  }

  clearCart() {
    if (confirm("Are you sure you want to clear the cart?")) {
      if (isPlatformBrowser(this.platformId)) {
        this.cartService.clearCart();  // Clear cart via service
        this.loadCartItems(); // Re-fetch cart items
      }
    }
  }

  clearCartBay() {
      if (isPlatformBrowser(this.platformId)) {
        this.cartService.clearCart();  // Clear cart via service
        this.loadCartItems(); // Re-fetch cart items
      }
  }


  openPurchasePopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  getTotalCartPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  purchaseItems() {
    if (isPlatformBrowser(this.platformId)) {
      const purchaseData = {
        items: this.cartItems,
        buyerDetails: this.purchaseDetails
      };

      localStorage.setItem('purchasedItems', JSON.stringify(purchaseData));
      this.clearCartBay();
      this.closePopup();
      alert('Purchase successful!');

      // Redirect to the home page after the alert is closed
      this.router.navigate(['/']);
    }
  }

  getTotalPrice(item: any): number {
    return item.price * item.quantity;
  }
}
