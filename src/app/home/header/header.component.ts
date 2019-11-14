import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateBoardDialogComponent } from '../../dialog/create-board-dialog/create-board-dialog.component';
import { CreateTableDialogComponent } from 'src/app/dialog/create-table-dialog/create-table-dialog.component';
import { BoardService } from 'src/app/services/board.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserData, BoardDetails, Table } from 'src/app/models/columnHeader';
import { ToastrService } from 'ngx-toastr';
import { CoreService } from 'src/app/services/core.service';

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
  bId: number;
  boardhead: BoardDetails;
  tableName: Table;
  tName: string;
  navButton = false;
  selectedBoard = "";

  constructor(public dialog: MatDialog,
    private _boardService: BoardService,
    private _authService: AuthService,
    private _router: Router,
    public toastr : ToastrService,
    public core:CoreService) { }

  ngOnInit() {


    // To display details of user on page load.
    this._boardService.getUserDetails()
      .subscribe(
        res => {
          this.userDetails = res;
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
        this.boardhead = {
          board_name: result
        }
        this._boardService.createBoard(this.boardhead)
          .subscribe(
            res => {
              console.log(res)
              this.boardName.push(res)
              this.toastr.success("Board added successfully", '', { timeOut: 2000});
            },
            error => {
              console.log(error);
              this.toastr.error("Error while adding Board", '', { timeOut: 2000});
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
          this.toastr.success("Board deleted successfully", '');
        },
        error => {
          this.toastr.error("Error while deleting Board", '');
          console.log(error);
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
        this.tableName = {
          "table_name": result,
          "board": this.bId
        }
        this._boardService.createtable(this.tableName)
          .subscribe(
            res => {
              this.toastr.success("Table created successfully", '');
              this.refreshTables()
            },
            error => {
              console.log(error);
              this.toastr.error("Error while creating Table", '');
            }
          )
      }
    })
  }


  boardDetails(item) {
    // To display Board details .
    this.navButton = true;
    this.selectedBoard = item.board_name;
    this.pageHeader = item.board_name;
    this.bId = item.id;

  }

  // User Image default Avatar.
  errorHandler(event) {
    console.debug(event);
    event.target.src = "https://ui-avatars.com/api/?name=" + this.userDetails.first_name.charAt(0) + "&background=560078&color=ffffff";
  }

  
  refreshTables(){
    this.core.refreshList.next(true);
  }

}
