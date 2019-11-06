import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateBoardDialogComponent } from '../../dialog/create-board-dialog/create-board-dialog.component';
import { CreateTableDialogComponent } from 'src/app/dialog/create-table-dialog/create-table-dialog.component';
import { BoardService } from 'src/app/services/board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userDetails : Array<any> = [];
  public boardName: Array<any> = [];
  public tableName: Array<any> = ["group 1"];
  bName : string;
  tName : string;

  // initName: Array<string> = this.userName.split('');

  constructor(public dialog: MatDialog ,
              private _boardService : BoardService ,
              private _authService : AuthService , 
              private _router : Router) { }

  ngOnInit() {
    this._boardService.getUserDetails()
                      .subscribe(
                        res => {
                          console.log("user Details", res);
                          this.userDetails = res;
                          console.log(this.userDetails);
                        },
                        err => {
                          if (err instanceof HttpErrorResponse){
                            if (err.status === 401){
                              console.log(err);
                              this._authService.logoutUser();
                            }
                          }
                          this._router.navigate(['/login']);
                        }
                      )


    this._boardService.getBoardList()
                        .subscribe(
                          res => {
                            console.log("boardList", res);
                            this.boardName = res;
                          },
                          err => {
                              console.log(err);
                          }
                        )

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
