import { Component, OnInit } from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userImg="";
  public userName="Amal";
  public tableName = ['Blank Board'];

  initName : Array<string> = this.userName.split('');
  private isButtonVisible = false;



  constructor() { }

  ngOnInit() {
  }

  addNewBoard(){
    
    this.tableName.push("new table");
    
  }

  deleteBoard(){
    
  }

}
