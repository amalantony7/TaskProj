import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BoardDetails , UserData} from '../models/columnHeader';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private _usrUrl = "https://227e58eb.ngrok.io/dashboard/current-users/";
  private _listUrl = "https://227e58eb.ngrok.io/dashboard/create-board/";
  private _tableUrl = "";

  constructor( private _http : HttpClient) { }

  getUserDetails(){
    return this._http.get<UserData>(this._usrUrl)
                .pipe(catchError(this.errorHandler))
  }

  createBoard(list){
    return this._http.post<BoardDetails>(this._listUrl,list)
                        .pipe(catchError(this.errorHandler));
  }

  getBoardList(){
    return this._http.get<Array<BoardDetails>>(this._listUrl)
                      .pipe(catchError(this.errorHandler));
  }

  deleteBoard(board_id){
    const url = `${this._listUrl}${board_id.id}/`;
    return this._http.delete<Array<BoardDetails>>(url)
                      .pipe(catchError(this.errorHandler));
  }


  createtable(list){
    return this._http.post<any>(this._tableUrl , list)
                        .pipe(catchError(this.errorHandler));
  }


  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Service Error!")
  }
}
