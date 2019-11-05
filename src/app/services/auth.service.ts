import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _logUrl = "https://nescio.serveo.net/dashboard/rest-auth/login/";

  constructor(private _http : HttpClient) { }


  loginUser(user){
    return this._http.post<any>(this._logUrl,user)
                      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Service Error");
  }
}
