import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'

import { PeriodicElement } from '../models/periodic';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  listHeader: string[] = ['select', 'text', 'status', 'date', 'numbers', 'peoples', 'star'];

  list: PeriodicElement[] = [
    { text: "Itemname 1", status: 'Delivered', date: new Date("2017-01-04"), numbers: null, peoples: "Rosemary" },
    { text: "Itemname 2", status: 'Pending', date: new Date("2019-12-27"), numbers: null, peoples: "Anith" }
  ];
  list$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.list);

  listHeader$: BehaviorSubject<string[]> = new BehaviorSubject(this.listHeader);

  isLoading = new Subject<boolean>();

  constructor() {
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

  getControl(index, fieldName) {
  }

  showLoader() {
    this.isLoading.next(true);
  }

  hideLoader() {
    this.isLoading.next(false);
  }

}
