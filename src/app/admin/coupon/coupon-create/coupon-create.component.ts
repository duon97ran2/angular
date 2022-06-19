import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';
import { UserServices } from 'src/app/services/user.service';
import { UserResponse } from 'src/app/type/user';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.css']
})
export class CouponCreateComponent implements OnInit {
  couponForm: FormGroup;
  currentId: string = '';
  users: UserResponse[] = [];
  constructor(private userServices: UserServices, private couponService: CouponService, private router: Router, private toarst: ToastrService) {
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
    data.valid_users = data.valid_users.filter((item: any) => item != 0).map((item: any) => { return { userId: item } })
    this.couponService.createCoupon(data).subscribe(data => { this.router.navigateByUrl("/admin/coupon/list"); this.toarst.success('Thêm coupon thành công') }, error => this.toarst.error(error))
  }
}
