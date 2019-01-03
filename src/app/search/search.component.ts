import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  id: string;


  constructor(private logsService: LogsService, private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router) {
    this.id = null;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.id != params["id"]) {
        this.id = params["id"];
        if (this.id != null)
          this.Search();
      }
    });
  }

  Search() {
    this.spinner.show();
    this.logsService.GetLogs(this.id);
    this.logsService.GetFacets(this.id);
  }

  ClearRoute()
  {
    this.router.navigate(['']);
  }
}