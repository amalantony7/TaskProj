import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private _usrUrl = "http://nescio.serveo.net/dashboard/current-users/";
  private _listUrl = "http://nescio.serveo.net/dashboard/create-board/";

  constructor( private _http : HttpClient) { }

  getUserDetails(){
    return this._http.get<any>(this._usrUrl)
                .pipe(catchError(this.errorHandler))
  }

  getBoardList(){
    return this._http.get<any>(this._listUrl)
                      .pipe(catchError(this.errorHandler));
  }


  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Service Error!")
  }
}
