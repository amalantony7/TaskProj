import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<LoginDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick() : void{

    this.dialogRef.close(false);

  }

}
