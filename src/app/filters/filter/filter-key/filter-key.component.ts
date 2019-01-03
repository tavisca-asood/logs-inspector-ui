import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FiltersService } from 'src/app/filters.service';

@Component({
  selector: 'app-filter-key',
  templateUrl: './filter-key.component.html',
  styleUrls: ['./filter-key.component.css']
})
export class FilterKeyComponent implements OnInit {
  @Input() value:string;
  @Input() title:string;
  checked:boolean;

  constructor(private filtersService:FiltersService) {
  }

  ngOnInit() {
    let filter = this.filtersService.savedFilters.find(x=>x.field==this.title);
    if(filter!=null)
    {
      if(filter.values.indexOf(this.value)!=-1)
      {
        this.checked=true;
      }
    }
  }
  UpdateSavedFilters()
  {
    this.filtersService.UpdateFilters(this.title,this.value);
  }
}
