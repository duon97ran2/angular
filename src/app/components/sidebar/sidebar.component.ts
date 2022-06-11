import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }
  signOut() {
    this.authService.logOut();
    this.router.navigateByUrl("/")
    this.toastr.success("Đăng xuất thành công")
  }

}
