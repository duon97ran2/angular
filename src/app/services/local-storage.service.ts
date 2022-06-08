import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CartType } from '../type/product';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  private storageSubject = new Subject<string>();
  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }
  setItem(addItem: CartType) {
    const cartLocal = this.getItem();
    console.log(addItem, cartLocal);
    const existItem = cartLocal.find((item: CartType) => item._id === addItem._id);
    if (existItem) {
      existItem.quantity += addItem.quantity;
      existItem.totalPrice += addItem.totalPrice;
      cartLocal.totalCart += addItem.totalPrice;
    }
    else {
      cartLocal.push(addItem);
      cartLocal.totalCart += addItem.totalPrice;
    }
    localStorage.setItem("cart", JSON.stringify(cartLocal));
    this.storageSubject.next('');
  }
  getItem() {
    return JSON.parse(localStorage.getItem("cart") || '[]');
  }
}
