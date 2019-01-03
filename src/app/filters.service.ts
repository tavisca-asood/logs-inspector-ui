import { Injectable } from '@angular/core';
import { Filter } from './filter';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  public savedFilters: Array<Filter>;

  constructor() {
    this.savedFilters = new Array<Filter>();
  }
  UpdateFilters(inputField, inputValue) {
    let filterResult = this.savedFilters.find(x => x.field == inputField);
    if (filterResult == null) {
      let filter = new Filter();
      filter.field = inputField;
      filter.values.push(inputValue);
      this.savedFilters.push(filter);
    }
    else {
      if (filterResult.values.indexOf(inputValue) == -1) {
        filterResult.values.push(inputValue);
      }
      else {
        filterResult.values.splice(filterResult.values.indexOf(inputValue), 1);
      }
    }
    this.savedFilters.forEach(element => {
      if(element.values.length==0)
      {
        this.savedFilters.splice(this.savedFilters.indexOf(element),1);
      }
    });
  }
}
