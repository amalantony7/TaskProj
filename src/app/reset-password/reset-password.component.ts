import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb : FormBuilder) { }

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
    });

  }

}
