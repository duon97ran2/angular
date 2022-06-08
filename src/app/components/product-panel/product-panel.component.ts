import { LocalStorageService } from './../../services/local-storage.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/type/product';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.css']
})
export class ProductPanelComponent implements OnInit {
  // quantity: number = 1;
  screenHeight: number = 0;
  screenWidth: number = 0;
  cols: number = 4;



  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, this.screenWidth);
    if (this.screenWidth > 1000) {
      this.cols = 4
    } else if (this.screenWidth > 750) {
      this.cols = 3
    } else {
      this.cols = 2
    }
  }
  products: Product[] = [];
  constructor(private ProductService: ProductService, private lsService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.ProductService.getProduct().subscribe(data => this.products = data);
    this.getScreenSize();
  }
  // increase() {
  //   this.quantity += 1;
  // }
  // decrease() {
  //   this.quantity -= 1;
  //   if (this.quantity <= 1) {
  //     this.quantity = 1;
  //   }
  // }
  // inputChange(quantity: string) {
  //   this.quantity = +quantity;
  // }
  onAddToCart(product: Product) {
    const cartItem = {
      ...product,
      quantity: 1,
      totalPrice: (product.newPrice == 0 ? product.price : product.newPrice)
    };
    this.lsService.setItem(cartItem);
    // this.quantity = 1;
  }

}
