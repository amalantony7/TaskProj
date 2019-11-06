import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './home/header/header.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BlankBoardComponent } from './home/blank-board/blank-board.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = [
  {path : '' , redirectTo : "/home" , pathMatch : "full"},
  {path : "home" , component : HomeComponent , children : [

    {path: "header" , component: HeaderComponent },
    {path: "blankboard" , component : BlankBoardComponent }

  ] , canActivate : [AuthGuard]}, 
  {path: "login" , component: LoginComponent},
  {path: "resetpassword" , component: ResetPasswordComponent},
  {path : "**" , component: PagenotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
