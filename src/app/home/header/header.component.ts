import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateBoardDialogComponent } from '../../dialog/create-board-dialog/create-board-dialog.component';
import { CreateTableDialogComponent } from 'src/app/dialog/create-table-dialog/create-table-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userImg = "";
  public userName = "Amal";
  public boardName: Array<any> = ["Blank Board"];
  public tableName: Array<any> = ["Group 1"];
  bName : string;
  tName : string;

  initName: Array<string> = this.userName.split('');

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addNewBoard() {

    //this.tableName.push("new table");
    let dialogref = this.dialog.open(CreateBoardDialogComponent, {
      data: { bname: this.bName }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result === false) {
        null;
      } else {
        console.log("The dialog closed! : " + result);
        this.bName = result;
        this.boardName.push(this.bName);
      }
    })

  }


  createTable(){
   let dialogref =  this.dialog.open(CreateTableDialogComponent , {
     data : { tname : this.tName}
   });

   dialogref.afterClosed().subscribe(result => {
     if(result === false){
       null;
     }
     else{
       console.log("Dialog closed! " + result);
        this.tName = result;
        this.tableName.push(this.tName);
        console.log(this.tableName);
     }
   })
  }

  deleteBoard() {
  }

}
