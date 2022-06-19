
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CouponResponse } from 'src/app/type/coupon';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {
  coupons: CouponResponse[] = [];
  displayedColumns: string[] = ['index', 'name', 'code', 'amount_off', 'status', 'redeem_times', 'action'];
  constructor(
    private toarst: ToastrService,
    private couponService: CouponService
  ) { }

  ngOnInit(): void {
    this.onGetList();
  }
  onGetList() {
    this.couponService.getCoupons().subscribe(data => this.coupons = data)
  }
  updateStatus(id: string, status: number) {
    this.couponService.updateCoupon({ status: !status ? 1 : 0 }, id).subscribe(data => { this.toarst.success("Cập nhật trạng thái thành công"); this.onGetList() });
  }
  onDelete(id: string) {
    const confirmDelete = confirm("Xoá mã giảm giá này?");
    if (!confirmDelete) return
    this.couponService.removeCoupon(id).subscribe(data => { this.toarst.success("Xoá mã giảm giá thành công"); this.onGetList() });
  }
  onSend(id: string) {
    const confirmDelete = confirm("Gửi mã giảm giá này?");
    if (!confirmDelete) return
    this.couponService.sendCoupon(id).subscribe(data => { this.toarst.success("Gửi mã giảm giá thành công"); });
  }
}
