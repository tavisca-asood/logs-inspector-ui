import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LogsService } from '../logs.service';
import { FiltersService } from '../filters.service';
import { SelectedFilter } from './filter/selectedFilter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  facets: any;
  logs: any;
  response:any;
  appliedFilters:Array<SelectedFilter>;
  @Output() CloseFiltersbar = new EventEmitter();

  constructor(private logsService: LogsService, private filterService: FiltersService) {
    this.logs = [];
    this.appliedFilters=new Array<SelectedFilter>();
  }

  ngOnInit() {
    this.logsService.facets.subscribe((response) => {
      this.facets = response;
      this.facets = this.facets.facets;
    });
    this.logsService.response.subscribe((response) => {
      this.response = response;
      this.logs = this.response.logs;
    });
    this.filterService.savedFilters.forEach(element => {
      element.values.forEach(value => {
        this.appliedFilters.push(new SelectedFilter(element.field,value));
      });
    });
  }
  FilterLogs() {
    let x = new Array<any>();
    let y = new Array<any>();
    let filters = this.filterService.savedFilters;
    if (filters.length == 0) {
      this.logsService.filteredResponse.next(this.response);
      this.CloseFiltersbar.emit();
      return;
    }
    y = this.logs;
    filters.forEach(filter => {
      x = [];
      y.forEach(log => {
        if (filter.values.indexOf(log.fields[filter.field]) != -1) {
          x.push(log);
        }
        y = x;
      });
    });
    this.CloseFiltersbar.emit();
    this.logs.logs = y;
    this.logsService.filteredResponse.next(this.logs);
  }
}
