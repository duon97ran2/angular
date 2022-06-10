import { CartType } from './../type/product';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { LoginResponse } from '../type/auth';

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
      // existItem.totalPrice += addItem.totalPrice;
      // cartLocal.totalCart += addItem.totalPrice;
    }
    else {
      cartLocal.push(addItem);
      // cartLocal.totalCart += addItem.totalPrice;
    }
    this.setCart(cartLocal);
  }
  setCart(cartData: CartType[]) {
    localStorage.setItem("cart", JSON.stringify(cartData));
    this.storageSubject.next('');
  }
  getItem() {
    return JSON.parse(localStorage.getItem("cart") || '[]');
  }
  // getUser() {
  //   return JSON.parse(localStorage.getItem("loggedInUser") || '[]');
  // }
  // setUser(userData: LoginResponse) {
  //   localStorage.setItem("loggedInUser", JSON.stringify(userData));
  //   this.storageSubject.next('');
  // }
  // removeUser() {
  //   localStorage.removeItem("loggedInUser");
  //   this.storageSubject.next('');
  // }

}
