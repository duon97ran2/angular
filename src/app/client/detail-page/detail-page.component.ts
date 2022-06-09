import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from './../../type/product';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  id: string | null;
  quantity: number = 1;
  product: Product;
  constructor(private activeRoute: ActivatedRoute, private productService: ProductService, private lsService: LocalStorageService, private toarst: ToastrService) {
    this.id = "";
    this.product = { _id: "", name: "", price: 0, newPrice: 0, stock: 0, description: "", author: "", category: "", image: [] };
  }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.productService.getProductDetail(this.id).subscribe(data => this.product = data);

  }
  increase() {
    this.quantity += 1;
  }
  decrease() {
    this.quantity -= 1;
    if (this.quantity <= 1) {
      this.quantity = 1;
    }
  }
  inputChange(quantity: string) {
    this.quantity = +quantity;
  }
  onAddToCart(product: Product) {
    const cartItem = {
      ...product,
      quantity: this.quantity,
      totalPrice: (product.newPrice == 0 ? product.price : product.newPrice)
    };
    this.lsService.setItem(cartItem);
    this.toarst.success("Thêm sản phẩm vào giỏ thành công");
    // this.quantity = 1;
  }
}