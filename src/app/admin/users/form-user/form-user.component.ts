import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServices } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {
  userForm: FormGroup;
  avatar: string[] = [];
  uploadState: boolean = false;
  currentId: string = '';
  constructor(private router: Router, private activeRoute: ActivatedRoute, private toarst: ToastrService, private userService: UserServices) {
    this.userForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      username: new FormControl(),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12),
      ]),
      role: new FormControl(0),
    })
  }

  ngOnInit(): void {
    this.currentId = this.activeRoute.snapshot.params['id'];
    if (this.currentId) {
      this.userService.getUserInfo(this.currentId).subscribe(data => {
        this.userForm.patchValue(
          {
            username: data.username,
            role: data.role,
          }
        );
        this.avatar = data.avatar;
      });
    }
  }
  onSubmit() {
    const data = this.userForm.value;
    if (this.avatar.length != 0) { data.avatar = this.avatar }
    if (this.currentId) {
      delete data.password;
      delete data.email;
      this.userService.updateUserInfo(this.currentId, data).subscribe(
        data => {
          this.toarst.success("Cập nhật tài khoản thành công");
          this.router.navigateByUrl("/admin/users/list");
        },
        error => {
          this.toarst.error(error);
        }
      )
    } else {
      if (!this.userForm.valid) { this.toarst.error("Vui lòng điền đầy đủ các trường thông tin bắt bắt buộc") } else {
        this.userService.createUser(data).subscribe(
          data => {
            this.toarst.success("Tạo tài khoản thành công");
            this.router.navigateByUrl("/admin/users/list");
          },
          error => {
            this.toarst.error(error);
          }
        )
      }

    }
  }
  setState(state: boolean) {
    this.uploadState = state;
  }
  setAvatar(avatar: string[]) {
    this.avatar = avatar;
  }
}
