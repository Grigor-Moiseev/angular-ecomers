import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>(this.loadCartFromStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private loadCartFromStorage(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      const cartData = localStorage.getItem('cart');
      return cartData ? JSON.parse(cartData) : [];
    }
    return [];
  }

  private saveCartToStorage(cart: any[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartItemsSubject.next(cart);
    }
  }

  addToCart(product: any): void {
    const cart = this.loadCartFromStorage();
    const existingProductIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    this.saveCartToStorage(cart);
  }

  removeFromCart(productId: number): void {
    let cart = this.loadCartFromStorage();
    cart = cart.filter((item: any) => item.id !== productId);
    this.saveCartToStorage(cart);
  }

  clearCart(): void {
    this.saveCartToStorage([]);
  }

  getCart(): any[] {
    return this.loadCartFromStorage();
  }

  getCartCount(): number {
    const cart = this.loadCartFromStorage();
    return cart.reduce((total: number, item: any) => total + item.quantity, 0);
  }
}
