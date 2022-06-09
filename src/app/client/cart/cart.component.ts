import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CartType } from 'src/app/type/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: CartType[] = [];
  constructor(private lsStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.onGetCart();
    this.lsStorage.watchStorage().subscribe(data => { this.onGetCart() });
  }
  onGetCart() {
    this.cartData = this.lsStorage.getItem();
  }
  onDelete(id: string) {
    const confirmDelete = confirm("Do you want to remove this item?");
    if (confirmDelete && id) {

    }
  };
  onChange(event: any, id: string) {
    const existItem = this.cartData.find(item => item._id === id);
    console.log(existItem);
    if (existItem) {
      existItem.quantity = event.target.value;
    }
    this.lsStorage.setCart(this.cartData);
  }
  onRemove(id: string) {
    this.cartData = this.cartData.filter(item => item._id !== id);
    this.lsStorage.setCart(this.cartData);
  }
  increase(id: string) {

    const existItem = this.cartData.find(item => item._id === id);
    console.log(existItem);
    if (existItem) {
      existItem.quantity += 1;
    }
    this.lsStorage.setCart(this.cartData);
  }
  decrease(id: string) {

    const existItem = this.cartData.find(item => item._id === id);
    console.log(existItem);
    if (existItem) {
      existItem.quantity -= 1;
      if (existItem.quantity <= 1) {
        existItem.quantity = 1
      }
    }
    this.lsStorage.setCart(this.cartData);
  }
}
