import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';
import { UserServices } from 'src/app/services/user.service';
import { UserResponse } from 'src/app/type/user';
import { CouponResponse } from 'src/app/type/coupon';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.css']
})
export class CouponCreateComponent implements OnInit {
  couponForm: FormGroup;
  currentId: string = '';
  users: UserResponse[] = [];
  constructor(private userServices: UserServices, private couponService: CouponService, private router: Router, private toarst: ToastrService, private activeRoute: ActivatedRoute) {
    this.couponForm = new FormGroup({
      name: new FormControl("", Validators.required),
      amount_off: new FormControl(0, Validators.required),
      redeem_times: new FormControl(0, [Validators.required, Validators.min(1)]),
      valid_users: new FormControl([]),
      code: new FormControl("",
        [Validators.required, Validators.minLength(5)]),

    })
  }

  ngOnInit(): void {
    this.userServices.getUsers().subscribe(data => this.users = data);
    this.currentId = this.activeRoute.snapshot.params['id'];
    if (this.currentId) {
      this.couponService.getCoupon(this.currentId).subscribe(data => this.couponForm.patchValue({
        name: data.name,
        amount_off: data.amount_off,
        redeem_times: data.redeem_times,
        code: data.code,
        valid_users: data.valid_users.map((user: { userId: string }) => { return user.userId })
      }), error => this.toarst.error(error));
    }
  }
  toggleAllSelection(allSelected: MatOption) {
    if (allSelected.selected) {
      this.couponForm.patchValue({
        valid_users: [...this.users.map(user => user._id), 0]
      })
    }
    else {
      this.couponForm.patchValue({
        valid_users: []
      })
    }
  }
  onSubmit() {
    const data = this.couponForm.value;
    data.valid_users = data.valid_users.filter((item: any) => item != 0).map((item: any) => { return { userId: item } });
    if (this.currentId) {
      this.couponService.updateCoupon(data, this.currentId).subscribe(data => { this.router.navigateByUrl("/admin/coupon/list"); this.toarst.success('Cập nhật coupon thành công') }, error => this.toarst.error(error))
    } else {
      this.couponService.createCoupon(data).subscribe(data => { this.router.navigateByUrl("/admin/coupon/list"); this.toarst.success('Thêm coupon thành công') }, error => this.toarst.error(error))
    }

  }
}
