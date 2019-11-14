import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Passwordvalidator } from '../validators/password_validator';
import { AuthService } from '../services/auth.service';
import { ResetPassword } from '../models/columnHeader';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public ohide = true;
  public nhide = true;
  public cnhide = true;
  resetForm : FormGroup;
  rPass : ResetPassword;

  constructor(private fb : FormBuilder,
              private _authService : AuthService,
              private _router : Router,
              private toastr : ToastrService) { }

  get oPassword(){
    return this.resetForm.get('oPassword');
  }
  get nPassword(){
    return this.resetForm.get('nPassword');
  }
  get cnPassword(){
    return this.resetForm.get('cnPassword');
  }


  ngOnInit() {

    this.resetForm = this.fb.group({
      oPassword : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      nPassword : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      cnPassword : ['',[Validators.required,Validators.minLength(6),Validators.maxLength(10)]]
    }, {validator : Passwordvalidator});

  }

  onReset(myForm){
      this.rPass = {
        old_password : this.resetForm.controls['oPassword'].value,
        new_password : this.resetForm.controls['nPassword'].value,
        confirm_password : this.resetForm.controls['cnPassword'].value
      }
      this._authService.resetPassword(this.rPass)
                          .subscribe(
                            res => {
                              this.toastr.success("Password Changed Successfully" , '');
                              myForm.reset();
                              this._router.navigate(['/home']);
                            },
                            error => {
                              console.log(error);
                              this.toastr.error("Password reset failed!" , '' );
                            }
                          )
  }

}
