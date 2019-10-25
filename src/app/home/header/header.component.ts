import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateBoardDialogComponent } from '../../dialog/create-board-dialog/create-board-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userImg = "";
  public userName = "Amal";
  public tableName: Array<any> = ["Blank Board"];
  name: string;

  initName: Array<string> = this.userName.split('');
  private isButtonVisible = false;



  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addNewBoard() {

    //this.tableName.push("new table");
    const dialogref = this.dialog.open(CreateBoardDialogComponent, {
      data: { name: this.name }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result === false) {
        null;
      } else {
        console.log("The dialog closed! : " + result);
        this.name = result;
        this.tableName.push(this.name);
      }
    })

  }

  deleteBoard() {



  }

}
