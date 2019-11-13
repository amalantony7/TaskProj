import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs'

import { PeriodicElement } from '../models/periodic';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BoardService } from './board.service';


@Injectable({
  providedIn: 'root'
})
export class CoreService implements OnInit {




  listHeader: string[] = ['peoples', 'numbers', 'date',  'status', 'text' ];

  list: PeriodicElement[] = [
    { text: "Itemname 1", status: 'Delivered', date: new Date("2017-01-04"), numbers: 201253, peoples: {"img" : "assets/images/users/user-2.jpg" ,"name":"User"} },
    { text: "", status: "Cancel", date: new Date("2018-11-25"), numbers: 745265, peoples: {"img" : "assets/images/download1.jpeg" , "name" : "Afsal"} },
    { text: "", status: "Pending", date: null, numbers: null, peoples: {"img" : "" , "name" : ""} }
  ];
  list$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.list);

  listHeader$: BehaviorSubject<string[]> = new BehaviorSubject(this.listHeader);


  constructor(private _http : HttpClient, private _boardService : BoardService) {
  }


  ngOnInit(){

                      
  }



  update(index, field, value) {
    this.list = this.list.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    //update api goes here
    this.list$.next(this.list);
  }

  updateHeader(index , value){
    this.listHeader[index] = value;
  }

  getControl(index, fieldName) {
  }



}
