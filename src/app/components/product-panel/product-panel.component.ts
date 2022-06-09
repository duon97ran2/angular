import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/type/product';

@Component({
  selector: 'app-product-panel',
  templateUrl: './product-panel.component.html',
  styleUrls: ['./product-panel.component.css']
})
export class ProductPanelComponent implements OnInit {
  // quantity: number = 1;
  @Input() dataSource: any;
  screenHeight: number = 0;
  screenWidth: number = 0;
  cols: number = 4;



  constructor(private lsService: LocalStorageService, private toarst: ToastrService) {
  }

  ngOnInit(): void {

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
    this.toarst.success("Thêm sản phẩm vào giỏ thành công");
    // this.quantity = 1;
  }

}
