import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserResponse } from './../../../type/user';
import { Component, OnInit } from '@angular/core';
import { UserServices } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoginResponse } from 'src/app/type/auth';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  userData: UserResponse[] = [];
  currentUser: LoginResponse | null = null;
  currentId: string | null = null;
  displayedColumns: string[] = ['index', 'email', 'username', 'avatar', 'status', 'role', 'action']
  constructor(private userService: UserServices, private authService: AuthService, private toarst: ToastrService,) { }

  ngOnInit(): void {
    this.getUserList();
    this.authService.currentUser.subscribe(data => this.currentUser = data);
  }
  getUserList() {
    this.userService.getUsers().subscribe(data => this.userData = data);
  }
  onDelete(id: string) {
    const confirmDelete = confirm("Xoá tài khoản này");
    if (!confirmDelete) return
    this.userService.deleteUser(id).subscribe(
      data => { this.toarst.success("Xoá sản phẩm thành công"); this.getUserList() },
      error => {
        this.toarst.error(error)
      }
    )
  };
  statusUpdate(id: string, status: number) {
    this.userService.updateUserInfo(id, { status: !status ? 1 : 0 }).subscribe(data => { this.toarst.success("Cập nhật trạng thái thành công"); this.getUserList() },
      error => {
        this.toarst.error(error)
      })
  }

}
