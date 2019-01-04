import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from 'src/app/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() title: string;
  @Input() keys: Array<string>;
  checkedFields: Array<string>;
  @Input() filter: Filter;
  @Output() UpdateFilters=new EventEmitter();
  hidden: boolean;

  constructor() {
    this.checkedFields = new Array<string>();
    this.filter = new Filter();
    this.hidden=true;
    this.keys= new Array<string>()
  }

  ngOnInit() {
    this.filter.field = this.title;
  }
  OnClick()
  {
    this.hidden=!this.hidden;
  }
}
