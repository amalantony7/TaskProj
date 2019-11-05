import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './home/header/header.component';
import { BlankBoardComponent } from './home/blank-board/blank-board.component';
import { AvatarModule} from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CreateBoardDialogComponent } from './dialog/create-board-dialog/create-board-dialog.component';
import { HomeComponent } from './home/home.component';
import { EditableComponent } from './editable/editable.component';
import { ViewModeDirective } from './editable/view-mode-directive';
import { EditModeDirective } from './editable/edit-mode-directive';
import { FocusableDirective } from './editable/focusable-directive';
import { EditableOnEnterDirective } from './editable/editable-on-enter-directive';
import { CreateTableDialogComponent } from './dialog/create-table-dialog/create-table-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BlankBoardComponent,
    LoginComponent,
    ResetPasswordComponent,
    PagenotfoundComponent,
    CreateBoardDialogComponent,
    EditableComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    EditableOnEnterDirective,
    CreateTableDialogComponent
  ],
  entryComponents: [CreateBoardDialogComponent, CreateTableDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AvatarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
