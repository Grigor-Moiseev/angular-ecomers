import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-productsnav',
  templateUrl: './productsnav.component.html',
  styleUrl: './productsnav.component.css'
})
export class ProductsnavComponent implements OnInit {
  public productData: any = [];
  public laptopQuantity: number = 0;
  public monitorQuantity: number = 0;
  public printerQuantity: number = 0;
  public mobileQuantity: number = 0;

  constructor(public apiData: ServiceService) { }

  ngOnInit() {
    //GET DATA
    this.apiData.getData().subscribe(receivedData => {
      this.productData = receivedData;
      //Category counter
      this.productData.products.forEach((element: { category: string; }) => {
        switch (element.category) {
          case 'monitor':
            this.monitorQuantity++
            break;
          case 'laptops':
            this.laptopQuantity++
            break;
          case 'phones':
            this.mobileQuantity++
            break;
          case 'printer':
            this.printerQuantity++
            break;
          default:
            break;
        }
      });
    });
  }
}
