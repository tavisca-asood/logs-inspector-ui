import { Component, OnInit, Input } from '@angular/core';
import { FiltersService } from 'src/app/filters.service';

@Component({
  selector: 'app-filter-search-key',
  templateUrl: './filter-search-key.component.html',
  styleUrls: ['./filter-search-key.component.css']
})
export class FilterSearchKeyComponent implements OnInit {
  @Input() value: string;
  @Input() title: string;
  checked: boolean;

  constructor(private filtersService: FiltersService) {
  }

  ngOnInit() {
    let filter = this.filtersService.savedFilters.find(x => x.field == this.title);
    if (filter != null) {
      if (filter.values.indexOf(this.value) != -1) {
        this.checked = true;
      }
    }
  }
  UpdateSavedFilters() {
    this.filtersService.UpdateFilters(this.title, this.value);
  }
}
