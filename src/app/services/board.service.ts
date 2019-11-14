import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BoardDetails, UserData, Choices, Members, Table } from '../models/columnHeader';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private _usrUrl = "https://a3ac28bb.ngrok.io/dashboard/current-users/";
  private _boardUrl = "https://a3ac28bb.ngrok.io/dashboard/create-board/";
  private _tableUrl = "https://a3ac28bb.ngrok.io/dashboard/create-table/";

  private _choiceUrl = "https://a3ac28bb.ngrok.io/dashboard/display-choice-options/";
  private _membersUrl = "https://a3ac28bb.ngrok.io/dashboard/display-user-list/";
  private _fullListUrl = "https://a3ac28bb.ngrok.io/dashboard/list-table/";


  constructor(private _http: HttpClient) { }

  getUserDetails() {
    return this._http.get<UserData>(this._usrUrl)
      .pipe(catchError(this.errorHandler))
  }

  getmembers(){
    return this._http.get<Array<Members>>(this._membersUrl)
      .pipe(catchError(this.errorHandler));    
  }

  createBoard(list) {
    return this._http.post<BoardDetails>(this._boardUrl, list)
      .pipe(catchError(this.errorHandler));
  }

  getBoardList() {
    return this._http.get<Array<BoardDetails>>(this._boardUrl)
      .pipe(catchError(this.errorHandler));
  }

  deleteBoard(board_id) {
    const url = `${this._boardUrl}${board_id.id}/`;
    return this._http.delete<Array<BoardDetails>>(url)
      .pipe(catchError(this.errorHandler));
  }


  createtable(list) {
    return this._http.post<Array<Table>>(this._tableUrl, list)
      .pipe(catchError(this.errorHandler));
  }


  getTableDetails(board_id){
    const params = new HttpParams().set('id' , board_id);
    return this._http.get<any>(this._fullListUrl , {params : params})
                  .pipe(catchError(this.errorHandler))
  }


  deleteTable(table){
    const url = `${this._tableUrl}${table.id}/`;
    return this._http.delete<Array<Table>>(url)
                .pipe(catchError(this.errorHandler));
  }

  renameTable(table){
    const url = `${this._tableUrl}${table.id}/`;
    return this._http.put<Array<Table>>(url , table)
                      .pipe(catchError(this.errorHandler));

  }


  getChoices() {
    return this._http.get<Array<Choices>>(this._choiceUrl)
      .pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Service Error!")
  }
}
