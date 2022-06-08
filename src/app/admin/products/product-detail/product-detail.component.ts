import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, CartType } from 'src/app/type/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: string | null;
  product: Product;
  cartValue: number = 1;
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService) {
    this.id = "";
    this.product = { _id: "", name: "", price: 0, newPrice: 0, stock: 0, description: "", author: "", category: "", image: [] };
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
    const cartLocal = JSON.parse(localStorage.getItem("cart") || '[]');
    console.log(cartItem, cartLocal);
    const existItem = cartLocal.find((item: CartType) => item._id === cartItem._id);
    if (existItem) {
      existItem.quantity += cartItem.quantity;
      existItem.totalPrice += cartItem.totalPrice;
      cartLocal.totalCart += cartItem.totalPrice
    }
    else {
      cartLocal.push(cartItem);
      cartLocal.totalCart += cartItem.totalPrice;
    }
    localStorage.setItem("cart", JSON.stringify(cartLocal));
    this.cartValue = 1;
  }
}
