import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userImg="assets/images/users/user-4.jpg";
  public userName="Amal"

  constructor() { }

  ngOnInit() {
  }

}
