import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatSort } from '@angular/material';
import { MatTableDataSource} from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { startWith, map } from 'rxjs/operators';



export interface TableFields {

  status : String,
  text : String,
  peoples : String,
  date : Date,
  numbers : number

}

const Table_Data : TableFields[] = [
  { text : "Item name 1" , status : "Delivered" , date : new Date("2/05/2015") , peoples : "Rosemary Rajan" , numbers : 201536 },
  { text : "Item name 2" , status : "Delivered" , date : new Date("4/10/2019") , peoples : "Romy Bobby" , numbers : 341536 }
]


@Component({
  selector: 'app-blank-board',
  templateUrl: './blank-board.component.html',
  styleUrls: ['./blank-board.component.css']
})
export class BlankBoardComponent implements OnInit {

  displayedColumns : string[] = ['select' , 'Item Name' , 'Status' , 'Date' , 'Members' , 'Amount'];
  dataSource = new MatTableDataSource(Table_Data);
  dataSource1 = Table_Data;

  options : string[] = ["Rosemary Rajan" , "Romy Bobbydfdsfdsfsdfsdfsdfsdfsdfsdfsdf" , "Sasank Thaliyil" , "Afsal M H" , "Anith"];
  myControl = new FormControl();
  filteredOptions : Observable<string[]>;
  selection = new SelectionModel<TableFields>(true, []);



  constructor() { }

  @ViewChild(MatSort, { static: true}) sort: MatSort;

  ngOnInit() {

    this.dataSource.sort = this.sort;
    this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map( value => this._filter(value))
          );

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TableFields): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.numbers + 1}`;
  }


  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.dataSource1.map(t => t.numbers).reduce((acc, value) => acc + value, 0);
  }


}
