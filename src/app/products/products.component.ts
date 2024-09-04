import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productData: any = [];
  public headerText!: string;
  public uniqueBrands: any[] = [];
  public uniqueCategories: any[] = [];

  public searchBrand: string = '';
  public searchCategory: string = '';
  public searchTitle: string = '';
  public minPrice: number | null = null;
  public maxPrice: number | null = null;

  constructor(public apiData: ServiceService, private cartService: CartService) { }

  ngOnInit() {
    this.apiData.getData().subscribe(receivedData => {
      this.productData = receivedData;
      this.uniqueBrands = [...new Set(this.productData.products.map((product: any) => product.brand))];
      this.uniqueCategories = [...new Set(this.productData.products.map((product: any) => product.category))];
      this.setPriceRange();
      this.updateHeaderText();
    });
  }

  public setPriceRange() {
    const filteredProducts = this.filteredProducts;
    if (filteredProducts.length > 0) {
      const prices = filteredProducts.map((product: any) => product.price);
      this.minPrice = Math.min(...prices);
      this.maxPrice = Math.max(...prices);
    } else {
      this.minPrice = null;
      this.maxPrice = null;
    }
  }

  public updateHeaderText() {
    let text = 'All Products';
    if (this.searchBrand) {
      text = `${this.searchBrand.toLocaleUpperCase()}`;
    }
    if (this.searchCategory) {
      text = `${this.searchCategory.toLocaleUpperCase()}`;
    }
    if (this.searchBrand && this.searchCategory) {
      text = `${this.searchBrand.toLocaleUpperCase()} | ${this.searchCategory.toLocaleUpperCase()}`;
    }
    if (this.filteredProducts.length === 0) {
      text = 'Product was not found';
    }
    this.headerText = text;
  }

  hasDiscount(product: any): boolean {
    return product.beforeDiscount !== 0;
  }

  get filteredProducts() {
    if (!this.productData || !this.productData.products) {
      return [];
    }

    return this.productData.products.filter((product: any) => {
      const matchesBrand = this.searchBrand === '' || product.brand.toLowerCase() === this.searchBrand.toLowerCase();
      const matchesCategory = this.searchCategory === '' || product.category.toLowerCase() === this.searchCategory.toLowerCase();
      const matchesTitle = this.searchTitle === '' || product.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesMinPrice = this.minPrice === null || product.price >= this.minPrice;
      const matchesMaxPrice = this.maxPrice === null || product.price <= this.maxPrice;

      return matchesBrand && matchesCategory && matchesTitle && matchesMinPrice && matchesMaxPrice;
    });
  }

  clearFilters() {
    this.searchBrand = '';
    this.searchCategory = '';
    this.searchTitle = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.setPriceRange();
    this.updateHeaderText();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product); // Use addToCart method
    alert(`${product.title} has been added to your cart.`);
  }
}
