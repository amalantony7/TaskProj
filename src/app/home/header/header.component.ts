import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateBoardDialogComponent } from '../../dialog/create-board-dialog/create-board-dialog.component';
import { CreateTableDialogComponent } from 'src/app/dialog/create-table-dialog/create-table-dialog.component';
import { BoardService } from 'src/app/services/board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserData, BoardDetails } from 'src/app/models/columnHeader';
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
  public tableName: Array<any> = ["group 1"];
  public pageHeader = "";
  bName: string;
  boardhead: BoardDetails;
  tName: string;

  // initName: Array<string> = this.userName.split('');

  constructor(public dialog: MatDialog,
    private _boardService: BoardService,
    private _authService: AuthService,
    private _router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
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


    this._boardService.getBoardList()
      .subscribe(
        res => {
          this.boardName = res;
          this.pageHeader = res[0].board_name ? res[0].board_name : "";
          console.log("boardList", res);

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
        this.boardhead = {
          board_name: result
        }
        this._boardService.createBoard(this.boardhead)
          .subscribe(
            res => {
              this.boardName.push(res)
              this.snackBar.open("Board added successfully", 'Dismiss', { duration: 2000, verticalPosition: 'top' });
            },
            error => {
              console.log(error);
              this.snackBar.open("Error while adding Board", 'Dismiss', { duration: 2000, horizontalPosition: 'right' });
            }
          )
      }
    })

  }

  deleteBoards(list) {
    this.boardhead = {
      id: list.id,
      board_name: list.board_name
    }
    this._boardService.deleteBoard(this.boardhead)
      .subscribe(
        res => {

          this.snackBar.open("Board deleted successfully", 'Dismiss', { duration: 2000, verticalPosition: 'top' })
        },
        error => {
          this.snackBar.open("Error while deleting Board", 'Dismiss', { duration: 2000, horizontalPosition: 'right' });
        }
      )
  }


  createTable() {
    let dialogref = this.dialog.open(CreateTableDialogComponent, {
      data: { tname: this.tName }
    });

    dialogref.afterClosed().subscribe(result => {
      if (result === false) {
        null;
      }
      else {
        console.log("Dialog closed! " + result);
        this.tName = result;
        this._boardService.createtable(this.tName)
          .subscribe(
            res => {
              this.snackBar.open("Table created successfully", 'Dismiss', { duration: 2000, verticalPosition: 'top' });
            },
            error => {
              console.log(error);
              this.snackBar.open("Error while creating Table", 'Dismiss', { duration: 2000, horizontalPosition: 'right' });
            }
          )
      }
    })
  }


  changeHeader(item) {
    this.pageHeader = item.board_name;
  }

}
