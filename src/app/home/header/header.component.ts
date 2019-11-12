import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateBoardDialogComponent } from '../../dialog/create-board-dialog/create-board-dialog.component';
import { CreateTableDialogComponent } from 'src/app/dialog/create-table-dialog/create-table-dialog.component';
import { BoardService } from 'src/app/services/board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserData, BoardDetails, Table } from 'src/app/models/columnHeader';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userDetails: UserData = {
    first_name: "",
    email: "",
    avatar: ""
  };
  public boardName: Array<BoardDetails> = [];
  public pageHeader = "";
  bName: string;
  bId : number;
  boardhead: BoardDetails;
  tableName : Table;
  tName: string;
  navButton = false;

  constructor(public dialog: MatDialog,
    private _boardService: BoardService,
    private _authService: AuthService,
    private _router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {


    // To display details of user on page load.
    this._boardService.getUserDetails()
      .subscribe(
        res => {
          this.userDetails = res;
          console.log("user Details", res);

        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.log(err);
              this._authService.logoutUser();
            }
          }
          this._authService.logoutUser();
        }
      )

    // To display available Board list on page load.
    this._boardService.getBoardList()
      .subscribe(
        res => {
          this.boardName = res;
          this.pageHeader = res[0].board_name ? res[0].board_name : "";
        },
        err => {
          console.log(err);
        }
      )

  }

  addNewBoard() {

    //For Adding New board.

    let dialogref = this.dialog.open(CreateBoardDialogComponent, {
      data: { bname: this.bName }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result === false) {
        null;
      } else {
        console.log("The dialog closed! : " + result);
        this.boardhead = {
          board_name: result
        }
        this._boardService.createBoard(this.boardhead)
          .subscribe(
            res => {
              this.boardName.push(res)
              this.snackBar.open("Board added successfully", 'Dismiss', { duration: 2000, verticalPosition: 'top' , panelClass: ["success-snackbar"] });
            },
            error => {
              console.log(error);
              this.snackBar.open("Error while adding Board", 'Dismiss', { duration: 2000, horizontalPosition: 'right' , panelClass: ['warning-snackbar'] });
            }
          )
      }
    })

  }

  deleteBoards(list) {
    //Deleting Board.

    this.boardhead = {
      id: list.id,
      board_name: list.board_name
    }
    this._boardService.deleteBoard(this.boardhead)
      .subscribe(
        res => {
          this.boardName = res;
          this.snackBar.open("Board deleted successfully", 'Dismiss', { duration: 2000, verticalPosition: 'top', panelClass: ["success-snackbar"] })
        },
        error => {
          this.snackBar.open("Error while deleting Board", 'Dismiss', { duration: 2000, horizontalPosition: 'right' , panelClass: ['warning-snackbar'] });
        }
      )
  }


  createTable() {
    // To create New table within a board.

    let dialogref = this.dialog.open(CreateTableDialogComponent, {
      data: { tname: this.tName }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result === false) {
        null;
      }
      else {
        console.log("Dialog closed! " + result);
        this.tableName = {
          "table_name" : result,
          "board" : this.bId
        }
        console.log(this.tableName);
        this._boardService.createtable(this.tableName)
          .subscribe(
            res => {
              this.snackBar.open("Table created successfully", 'Dismiss', { duration: 2000, verticalPosition: 'top' , panelClass: ["success-snackbar"] });
            },
            error => {
              console.log(error);
              this.snackBar.open("Error while creating Table", 'Dismiss', { duration: 2000, horizontalPosition: 'right' , panelClass: ['warning-snackbar'] });
            }
          )
      }
    })
  }


  boardDetails(item) {
    // To display Board details .
    this.navButton = true;
    this.pageHeader = item.board_name;
    this.bId = item.id;

  }

// User Image default Avatar.
  errorHandler(event) {
    console.debug(event);
    event.target.src = "https://ui-avatars.com/api/?name=" + this.userDetails.first_name.charAt(0) + "&background=560078&color=ffffff";
  }

}
