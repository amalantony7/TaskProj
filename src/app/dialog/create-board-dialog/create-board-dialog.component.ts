import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-board-dialog',
  templateUrl: './create-board-dialog.component.html',
  styleUrls: ['./create-board-dialog.component.css']
})
export class CreateBoardDialogComponent implements OnInit {
  mydata:any;
  constructor( public dialogRef : MatDialogRef<CreateBoardDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data : any ) { }

  ngOnInit() {
    this.mydata = this.data
  }


  onNoClick() : void{

    this.dialogRef.close(false);

  }

}
