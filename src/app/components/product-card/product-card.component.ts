import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Product } from 'src/app/type/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = {} as Product;
  constructor(private lsService: LocalStorageService, private toarst: ToastrService) { }

  ngOnInit(): void {
  }
  onAddToCart(product: Product) {
    const cartItem = {
      ...product,
      quantity: 1,
      totalPrice: (product.newPrice == 0 ? product.price : product.newPrice)
    };
    this.lsService.setItem(cartItem);
    this.toarst.success("Thêm sản phẩm vào giỏ thành công");
    // this.quantity = 1;
  }
  round(data: any) {
    return Math.round((1 - data.newPrice / data.price) * 100)
  }
}
