import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectedFilter } from '../filter/selectedFilter';
import { Filter } from 'src/app/filter';
import { LogsService } from 'src/app/logs.service';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css']
})
export class FilterSearchComponent implements OnInit {
  results: Array<SelectedFilter>;
  filterQuery: string;
  filters: Array<Filter>;
  facets: any;
  @Output() SearchFilters=new EventEmitter();

  constructor(private logsService: LogsService) {
    this.results = new Array<SelectedFilter>();
    this.filterQuery = "";
    this.filters = new Array<Filter>();
  }

  ngOnInit() {
    this.logsService.facets.subscribe((response) => {
      this.facets = response.facets;
    });
  }
  Search() {
    if(this.filterQuery.length==0)
    {
      this.SearchFilters.emit("Show");
    }
    else
    {
      this.SearchFilters.emit("Hide");
    }
    if(this.filterQuery.length<1)
    {
      return;
    }
    this.results=new Array<SelectedFilter>();
    for (var key in this.facets) {
      for (var value in this.facets[key]) {
        if (this.facets[key][value].includes(this.filterQuery)) {
          this.results.push(new SelectedFilter(key,this.facets[key][value]));
        }
      }
    }
  }
}
