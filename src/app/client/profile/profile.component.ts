import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from './../../type/auth';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: LoginResponse | null = {} as LoginResponse;
  username: FormControl = new FormControl("", Validators.required)
  constructor(private authService: AuthService, private toastr: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(data => { this.currentUser = data, this.username.patchValue(data?.username) })
  }
  updateAvatar() {
    const dialogRef = this.dialog.open(AvatarDiaglog, { width: "500px", data: this.currentUser?._id })
  }
  updatePassword() {
    const dialogRef = this.dialog.open(PasswordDialog, { width: "500px", data: this.currentUser?._id })
  }
  changeUsername(input: FormControl) {
    if (input.valid) {
      this.authService.updateUsername(input.value, this.currentUser?._id).subscribe(data => { this.toastr.success("Cập nhật tên thành công") }, error => this.toastr.error(error))
    }
  }

}
@Component({
  selector: 'avatar-dialog',
  templateUrl: 'avatar-dialog.html',
})
export class AvatarDiaglog {
  avatar: string[] = [];
  status: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AvatarDiaglog>,
    private authService: AuthService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {

  }
  setAvatar(images: string[]) {
    this.avatar = images
  }
  setStatus(state: boolean) {
    this.status = state;
  }
  updateAvatar() {
    if (this.avatar.length) {
      this.authService.updateAvatar(this.avatar, this.data).subscribe(data => {
        this.toastr.success("Cập nhật ảnh đại diện thành công");
        this.dialogRef.close();
      },
        error => {
          this.toastr.error(error);
          this.dialogRef.close();
        }
      )
    }
  }
}
@Component({
  selector: 'password-dialog',
  templateUrl: 'password-dialog.html',
})
export class PasswordDialog {
  password: FormControl = new FormControl("", Validators.required);
  visible: boolean = false;
  passwordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PasswordDialog>,
    private authService: AuthService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.passwordForm = new FormGroup({
      newPassword: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(12)]),
    }, { validators: this.passwordValidator })
  }
  checkPassword(input: FormControl) {
    if (input.valid) {
      this.authService.checkPassword(this.password.value, this.data).subscribe(data => this.visible = true, error => this.toastr.error(error));
    }
  }
  onSubmit() {
    this.authService.updatePassword(this.passwordForm.value, this.data).subscribe(data => {
      this.toastr.success("Cập nhật mật khẩu thành công");
      this.dialogRef.close();
    },
      error => {
        this.toastr.error(error);
        this.dialogRef.close();
      })
  }
  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    return newPassword && confirmPassword && newPassword.value != confirmPassword.value ? { hasComfirmError: true } : null;
  };

}