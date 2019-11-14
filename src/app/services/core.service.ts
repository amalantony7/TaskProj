import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs'

import { PeriodicElement } from '../models/periodic';
import { ColumnHeaders } from '../models/columnHeader'
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BoardService } from './board.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CoreService implements OnInit {

  private _fullListUrl = "https://a3ac28bb.ngrok.io/dashboard/list-table/";
  private _colHeadurl = "https://a3ac28bb.ngrok.io/dashboard/"


  public board_id;

  tables = [];

  listHeader: string[] = [];

  list: PeriodicElement[] = [
    { text: "Itemname 1", status: 'Delivered', date: new Date("2017-01-04"), numbers: 201253, peoples: { "img": "assets/images/users/user-2.jpg", "name": "User" } },
    { text: "", status: "Cancel", date: new Date("2018-11-25"), numbers: 745265, peoples: { "img": "assets/images/download1.jpeg", "name": "Afsal" } },
    { text: "", status: "Pending", date: null, numbers: null, peoples: { "img": "", "name": "" } }
  ];
  list$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.list);

  listHeader$: BehaviorSubject<string[]> = new BehaviorSubject(this.listHeader);

  refreshList = new BehaviorSubject(undefined)

  constructor(private _http: HttpClient,
              private _boardService: BoardService,
              private route : ActivatedRoute) {
  }


  ngOnInit() {

    this.route.paramMap.subscribe((params : ParamMap) => {
      let id = parseInt(params.get('id'));
      this.board_id = id;
    })


      this._boardService.getTableDetails(this.board_id)
                .subscribe(
                  res => {
                    this.listHeader = [];
                    console.log("sdsdsdsd",res);
                    res.forEach(item => {
                      item.fields.forEach(
                        element => {
                          this.listHeader.push(element.field_name);
                        }
                      )

                    })
                    console.log(this.listHeader);
                  },
                  error => {
                    console.log(error);
                  }
                )

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

  updateHeader(index, value) {
    this.listHeader[index] = value;
  }

  getControl(index, fieldName) {
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Service Error!")
  }


}
