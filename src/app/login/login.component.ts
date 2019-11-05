import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide = true;
  loginForm : FormGroup;
  public emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb : FormBuilder , private _auth : AuthService , private _router : Router) { }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }


  ngOnInit() {

    this.loginForm = this.fb.group({
      email : ['',[Validators.pattern(this.emailRegex),Validators.required]],
      password : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]]
    });

  }

  onLogin(myForm){
    this._auth.loginUser(this.loginForm.value)
                        .subscribe(
                          res => {
                            localStorage.setItem('Token' , res.token);
                            myForm.reset();
                            this._router.navigate(["/home"]);
                          },
                          error => {
                            console.log(error);
                          }
                        )
  }

}
