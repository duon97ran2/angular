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
  loggedInUser: string | null = localStorage.getItem("loggedInUser");
  userData: LoginResponse = { _id: "", email: '' };
  cartQuantity: number = 0;
  categories: CategoryResponse[] = []
  constructor(private router: Router, private toastr: ToastrService, private lsService: LocalStorageService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.onGetQuantity();
    this.lsService.watchStorage().subscribe(data => this.onGetQuantity());
    if (this.loggedInUser) {
      this.userData = JSON.parse(this.loggedInUser);
    };
    this.categoryService.getCategory().subscribe(data => this.categories = data);
  }
  onGetQuantity() {
    this.cartQuantity = this.lsService.getItem().length;
  }
  logOutHandle() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
    this.toastr.success('Logout success');
  }

}
