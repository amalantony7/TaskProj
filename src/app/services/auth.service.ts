import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _logUrl = "https://nescio.serveo.net/dashboard/rest-auth/login/";

  constructor(private _http : HttpClient ,
              private _router : Router) { }


  loginUser(user){
    return this._http.post<any>(this._logUrl,user)
                      .pipe(catchError(this.errorHandler));
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);

  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Service Error");
  }
}
