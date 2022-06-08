import { Component, OnInit } from '@angular/core';
import { CartType } from 'src/app/type/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: CartType[] = [];
  displayedColumns: string[] = ['index', 'name', 'price', 'image', 'id'];
  constructor() { }

  ngOnInit(): void {
    this.cartData = JSON.parse(localStorage.getItem("cart") || '[]');
  }
  onDelete(id: string) {
    const confirmDelete = confirm("Do you want to remove this item?");
    if (confirmDelete && id) {

    }
  }
}
