import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { LogsService } from './logs.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('searchBarInOut', [
            transition('void => *', [
                style({ transform: 'translateX(-8%)' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateX(-2%)' }))
            ])
        ]),
        trigger('filtersBarInOut', [
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate(350)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateX(-100%)' }))
            ])
        ]),
        trigger('sideBarInOut', [
            transition('void => *', [
                style({ transform: 'translateX(100%)' }),
                animate(350)
            ]),
            transition('* => void', [
                animate(150, style({ transform: 'translateX(100%)' }))
            ])
        ])
    ]
})
export class AppComponent implements OnInit {
    title = 'logs-ui';
    searchBarDisplay: boolean;
    filtersBarDisplay: boolean;
    sideBarDisplay: boolean;
    response: any;

    constructor(private logsService: LogsService,private sinner:NgxSpinnerService) {
        this.searchBarDisplay = false;
        this.filtersBarDisplay = false;
        this.sideBarDisplay = false;
    }
    ngOnInit() {
        this.logsService.filteredResponse.subscribe((response) => {
            this.sinner.hide();
            if (response != null&&response.logs.length!=0) {
                this.response = response.logs;
            }
        });
    }
    ToggleSearchBar() {
        this.searchBarDisplay = !this.searchBarDisplay;
    }
    ToggleFiltersBar() {
        this.filtersBarDisplay = !this.filtersBarDisplay;
    }
    ToggleSideBar() {
        this.sideBarDisplay = !this.sideBarDisplay;
    }
    CloseFiltersBar() {
        this.filtersBarDisplay = !this.filtersBarDisplay;
    }
}
