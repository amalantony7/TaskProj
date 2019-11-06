import { Component, OnInit } from '@angular/core';
import { CoreService } from '../services/core.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  color = 'primary';
  mode = 'indeterminate';
  value = 50;

  isLoading : Subject<boolean> = this._core.isLoading;
  constructor( private _core : CoreService) { }

  ngOnInit() {
  }

}
