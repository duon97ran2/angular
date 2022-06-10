import { response } from 'express';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryResponse } from './../../type/category';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/type/auth';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {
  userData: LoginResponse | null;
  cartQuantity: number = 0;
  categories: CategoryResponse[] = []
  constructor(private router: Router, private toastr: ToastrService, private lsService: LocalStorageService, private categoryService: CategoryService, private authService: AuthService) {
    this.userData = null;
  }

  ngOnInit(): void {
    this.onGetQuantity();
    this.lsService.watchStorage().subscribe(data => { this.onGetQuantity() });
    this.authService.currentUser.subscribe((response) => this.userData = response);
    this.categoryService.getCategory().subscribe(data => this.categories = data);
  }
  onGetQuantity() {
    this.cartQuantity = this.lsService.getItem().length;
  }
  logOutHandle() {
    this.authService.logOut();
    this.toastr.success("Đăng xuất thành công")
  }

}
