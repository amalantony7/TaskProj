import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { startWith, map } from 'rxjs/operators';
import { PeriodicElement } from 'src/app/models/periodic';
import { CoreService } from 'src/app/services/core.service';
import { BoardService } from 'src/app/services/board.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-blank-board',
  templateUrl: './blank-board.component.html',
  styleUrls: ['./blank-board.component.css']
})
export class BlankBoardComponent implements OnInit {

  public board_id;
  public numberRegex ="^[0-9]*$";

  displayedColumns: string[] = ['select' , 'star'];
  columnsToDisplay: string[] = [];
  dataSource: any;
  controls: FormArray;
  headerControls: FormArray;

  data = Object.assign(this.core.list);
  selected = "";

  groups = ['group 1', 'group 2'];

  columnHeaders = [];


  options = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  toGroups:any

  public collapsed = false;

  selection = new SelectionModel<PeriodicElement[]>(true, []);

  // Table-sort
  private sort: MatSort
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.sort = this.sort;
  }


  constructor(private core: CoreService,
    private _boardService: BoardService,
    private route: ActivatedRoute) { }


  ngOnInit() {

    this.core.listHeader.forEach((item) => {this.displayedColumns.splice(1,0,item)
    console.log(this.displayedColumns)}
    )
      this.columnsToDisplay = this.displayedColumns.slice();
    

    // To retrive board_id from url passed as params.
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.board_id = id;
    })

    // Display table-header choices on page load.
    this._boardService.getChoices()
      .subscribe(
        res => {
          console.log(res);
          this.columnHeaders = res;
        },
        err => {
          console.log(err);
        }
      )

    this._boardService.getmembers()
      .subscribe(
        res => {
          this.options = res;
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )


    // Display table datas.  
    this.core.list$.subscribe(res => {
      this.dataSource = new MatTableDataSource(res)
    });

    this.toGroups = this.core.list$.value.map(entity => {
      return new FormGroup({
        text: new FormControl(entity.text, [Validators.required]),
        status: new FormControl(entity.status, [Validators.required]),
        date: new FormControl(entity.date, Validators.required),
        peoples: new FormControl(entity.peoples, Validators.required),
        numbers: new FormControl(entity.numbers, Validators.pattern(this.numberRegex)),
      });
    });

    const toHeaderGroups = this.core.listHeader$.value.map(elements => {
      return new FormGroup({
        text: new FormControl(elements),
        status: new FormControl(elements),
        date: new FormControl(elements),
        peoples: new FormControl(elements),
        numbers: new FormControl(elements)
      });
    });


    this.controls = new FormArray(this.toGroups);
    this.headerControls = new FormArray(toHeaderGroups)

    // To filter table including Peoples column.
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return key === 'peoples' ? currentTerm + data.peoples.name : currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase()
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.dataSource.sort = this.sort;

    // Auto-complete Filter
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }


  // To update a cell.
  updateField(index, field) {
    let control = this.getControl(index, field);
    if (control.valid) {
      this.core.update(index, field, control.value);
      this.dataSource.sort = this.sort;
      console.log(index, field, control.value);
    }

  }

  updateHeader(index, event) {
      this.core.updateHeader(index, event)
      this.dataSource.sort = this.sort;
  }

  removeSelectedRows() {

    // Delete selected Row.
    this.selection.selected.forEach(item => {
      let index: number = this.data.findIndex(d => d === item);
      console.log(this.data.findIndex(d => d === item));
      this.data.splice(index, 1)
      this.dataSource = new MatTableDataSource<PeriodicElement[]>(this.dataSource.data);
      console.log(this.dataSource.data);
      this.core.list$.next(this.dataSource.data);
    });
    this.selection = new SelectionModel<PeriodicElement[]>(true, []);
  }


  getControl(index, fieldName) {
    // Select control of a cell when double-clicked.
    const a = this.controls.at(index).get(fieldName) as FormControl;
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  getHeaderControl(index, fieldName) {
    return this.headerControls.at(index).get(fieldName) as FormControl;
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
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }



  applyFilter(filterValue: string) {
    // Filtering through table.
    this.dataSource.filter = filterValue;
  }



  private _filter(value: string): string[] {
    // Auto-complete filter
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option['first_name'].toLowerCase().includes(filterValue));
  }
 

  getTotalCost() {

    // Table Footer.
    return this.core.list.map(t => t.numbers).reduce((acc, value) => acc + value, 0);
  }


  addColumn(index) {
    console.log(this.displayedColumns);
    this.columnsToDisplay.push(this.displayedColumns[index]);
  }


}
