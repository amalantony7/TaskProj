import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-table-dialog',
  templateUrl: './create-table-dialog.component.html',
  styleUrls: ['./create-table-dialog.component.css']
})
export class CreateTableDialogComponent implements OnInit {

mydata  :any;

  constructor( public dialogRef : MatDialogRef<CreateTableDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data : any ) { }

  ngOnInit() {

    this.mydata = this.data

  }

  onNoClick() : void{

    this.dialogRef.close(false);

  }

}
