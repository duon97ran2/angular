import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from './../../type/auth';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';

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
