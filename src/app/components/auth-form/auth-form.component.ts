import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
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
  authForm: UntypedFormGroup
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.authForm = new UntypedFormGroup({
      email: new UntypedFormControl('',
        [
          Validators.required,
          Validators.email
        ]),
      password: new UntypedFormControl('',
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
      this.authService.login(this.authForm.value).subscribe(
        data => {
          localStorage.setItem("loggedInUser", JSON.stringify(data));
          this.toastr.success("Login success")
          this.router.navigateByUrl('/home');
        },
        error => this.toastr.error(error)
      )
    }
    if (this.formType == "register") {
      this.authService.register(this.authForm.value).subscribe(data => {
        this.toastr.success("Register success")
        this.router.navigateByUrl('/login');
      },
        error => this.toastr.error(error))
    }
  }

}
