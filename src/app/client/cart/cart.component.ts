import { LoginResponse } from 'src/app/type/auth';
import { orderResponse } from './../../type/orders';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CartType } from 'src/app/type/product';
import { MatStepper } from '@angular/material/stepper';
import { CouponService } from 'src/app/services/coupon.service';
import { AuthService } from 'src/app/services/auth.service';
import { CouponResponse } from 'src/app/type/coupon';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: CartType[] = [];
  total: number = 0;
  couponForm: FormGroup;
  shipControl: FormControl;
  checkOutForm: FormGroup;
  couponData: CouponResponse | null = null;
  userData: LoginResponse | null = null;
  shipType: Array<any> = [{ name: "Giao thường", fee: 10000 }, { name: "Giao nhanh", fee: 15000 }, { name: "Giao hỏa tốc", fee: 20000 }]
  orderData: orderResponse = {} as orderResponse;
  displayedColumns: string[] = ['index', 'name', 'price', 'quantity', 'image',];
  constructor(private lsStorage: LocalStorageService, private orderSerive: OrdersService, private toarst: ToastrService, private couponService: CouponService, private authService: AuthService) {
    this.checkOutForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      address: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
    });
    this.couponForm = new FormGroup({
      code: new FormControl("", Validators.required)
    })
    this.shipControl = new FormControl(10000);
  }

  ngOnInit(): void {
    this.onGetCart();
    this.lsStorage.watchStorage().subscribe(data => { this.onGetCart() });
    this.authService.currentUser.subscribe(data => this.userData = data);
  }
  onGetCart() {
    let countTotal = 0
    this.cartData = this.lsStorage.getItem();
    this.cartData.forEach((item) => { countTotal += (item.newPrice == 0 ? item.price : item.newPrice) * item.quantity; });
    this.total = countTotal
      ;
  }
  couponSubmit() {
    const data = this.couponForm.value;
    data.userId = this.userData?._id;
    this.couponService.reedemCoupon(data).subscribe(data => { this.couponData = data; this.toarst.success("Áp dụng voucher thành công") }, error => this.toarst.error(error))
  }
  onChange(event: any, id: string) {
    const existItem = this.cartData.find(item => item._id === id);
    console.log(existItem);
    if (existItem) {
      existItem.quantity = event.target.value;
    }
    this.lsStorage.setCart(this.cartData);
  }
  onRemove(id: string) {
    const confirmDelete = confirm("Do you want to remove this item?");
    if (confirmDelete && id) {
      this.cartData = this.cartData.filter(item => item._id !== id);
      this.lsStorage.setCart(this.cartData);
    }

  }
  emptyCart() {
    this.cartData = [];
    this.lsStorage.setCart(this.cartData);
  }

  onSubmit(stepper: MatStepper) {
    const orderData = this.checkOutForm.value;
    orderData.products = this.cartData;
    orderData.total = this.total;
    orderData.shipping = this.shipControl.value;
    if (this.couponData) {
      orderData.amount_off = this.couponData.amount_off;
      orderData.userId = this.userData?._id;
      orderData.couponId = this.couponData._id;
    }
    if (!this.checkOutForm.valid) return
    this.orderSerive.orderCreate(orderData).subscribe(data => {
      stepper.next();
      this.emptyCart();
      this.toarst.success("Đặt hàng thành công");
      this.orderData = data;
    }, error => { this.toarst.success(error); })

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
