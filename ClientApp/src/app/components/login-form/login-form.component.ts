import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel} from 'src/app/api-client-generated';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  login: LoginModel;
  message: string;

  constructor(
    private router: Router,
    private loginService:  LoginService,
    private fb: FormBuilder,

  ) {}

  form: FormGroup = this.fb.group({
    fullName: ["", Validators.required],
    email: ["", Validators.required],
    mobileNumber:["",Validators.required],
    gender:["", Validators.required],
    password:["",Validators.required],
  });


  ngOnInit(): void {}

  doLogin(userName: string, password: string): void {
    this.login = {
      userName: userName,
      password: password
    };
    this.loginService.getToken(this.login).subscribe(res => {
      this.router.navigate(['home']);
    },error => {
      this.message = error.message;
    });
  }
}
