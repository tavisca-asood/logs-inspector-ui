import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LogsService } from '../logs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() CloseSideBar = new EventEmitter<null>();
  log: any;
  clientId: string;
  tenantId: string;
  clientProgramGroupId: string;
  programId: string;

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    this.logsService.response.subscribe((response) => {
      this.log = response;
      this.log = this.log.logs[0].fields;
      console.log(this.log);
      this.clientId = this.log.clientId;
      this.tenantId = this.log.tid;
      this.programId = this.log.programId;
    });
  }
  ToggleSideBar() {
    this.CloseSideBar.emit();
  }
}
