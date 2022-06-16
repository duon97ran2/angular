import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, CartType } from 'src/app/type/product';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: string | null;
  product: Product;
  cartValue: number = 1;
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private lsService: LocalStorageService) {
    this.id = "";
    this.product = {} as Product;
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.productService.getProductDetail(this.id).subscribe(data => this.product = data);
  }
  onChangeCartValue(event: any) {
    this.cartValue = event.target.value;
  }
  onAddToCart() {
    const cartItem = {
      ...this.product,
      quantity: +this.cartValue,
      totalPrice: +this.cartValue * (this.product.newPrice == 0 ? this.product.price : this.product.newPrice)
    };
    this.lsService.setItem(cartItem)
    this.cartValue = 1;
  }
}
