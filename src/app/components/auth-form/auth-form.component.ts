import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  @Input() formType: any;
  authForm: FormGroup
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.authForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(12),
        ]
      )
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.formType == "login") {
      this.authService.login(this.authForm.value).subscribe(data => {
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        this.toastr.success("Login success")
        this.router.navigateByUrl('/');
      })
    }
    if (this.formType == "register") {
      this.authService.register(this.authForm.value).subscribe(data => {
        this.toastr.success("Register success")
        this.router.navigateByUrl('/login');
      })
    }
  }

}
