import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/type/auth';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.css']
})
export class ClientHeaderComponent implements OnInit {
  loggedInUser: string | null = localStorage.getItem("loggedInUser");
  userData: LoginResponse = { _id: "", email: '' };
  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.loggedInUser) {
      this.userData = JSON.parse(this.loggedInUser);
    }
  }
  logOutHandle() {
    localStorage.removeItem("loggedInUser");
    window.location.reload();
    this.toastr.success('Logout success');
  }

}
