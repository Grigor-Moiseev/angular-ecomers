import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public productData: any = [];
  public discountedProducts: any = [];

  constructor(public apiData: ServiceService, private cartService: CartService) { }

  ngOnInit() {
    this.apiData.getData().subscribe(receivedData => {
      this.productData = receivedData;
      if (this.productData) {
        this.productData.products.filter((item: any) => {
          if (item.beforeDiscount !== 0) {
            this.discountedProducts.push(item);
          }
        });
      }
    });
  }

  hasDiscount(product: any): boolean {
    return product.beforeDiscount !== 0;
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(`${product.title} has been added to your cart.`);
  }
}
