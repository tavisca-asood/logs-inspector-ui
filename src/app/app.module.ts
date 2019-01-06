import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { LogsService } from './logs.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphComponent } from './graph/graph.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FiltersComponent } from './filters/filters.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FilterComponent } from './filters/filter/filter.component';
import { FilterKeyComponent } from './filters/filter/filter-key/filter-key.component';
import { FilterSearchComponent } from './filters/filter-search/filter-search.component';
import { FilterSearchKeyComponent } from './filters/filter-search/filter-search-key/filter-search-key.component';

const appRoutes: Routes =
  [
    {
      path:"",component:SearchComponent
    }
  ];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    GraphComponent,
    FiltersComponent,
    SidebarComponent,
    FilterComponent,
    FilterKeyComponent,
    FilterSearchComponent,
    FilterSearchKeyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LogsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
