import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs.service';
import { LogsResponse } from '../logs-response';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { Log } from '../log';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
declare var CanvasJS: any;


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  logsResponse: LogsResponse;
  logs: Log[];
  sortedLogs: any;
  dataPoints: any;
  stripLinesNumber: number[];
  showLogDetailsToggle: boolean;
  logFieldsKeys: string[];
  currentLogDetails = new Log();
  colorScheme: string[];

  constructor(private logsService: LogsService, private http: HttpClient) {
    this.sortedLogs = [];
    this.dataPoints = [];
    this.logs = [];
    this.showLogDetailsToggle = false;
    this.logFieldsKeys = [];
    this.colorScheme = ["#F3CD05",
      "#BDA589",
      "#6A8A82",
      "#A37C27",
      "#563838",
      "#0AAFF1",
      "#ABA6BF",
      "#F1E0D6",
      "#BF988F",
      "#00743F",
      "#DE8CF0",
      "#D4DCA9",
      "#B5C1B4",
      "#81A3A7",
      "#776B04",
      "#F4F3B1",
      "#1ECFD6",
      "#107050"];
  }

  ngOnInit() {
    this.logsService.filteredResponse.subscribe(async (response) => {
      if (response != null && response.logs.length != 0) {
        this.sortedLogs = [];
        this.dataPoints = [];
        this.stripLinesNumber = [];
        this.logsResponse = response;
        this.logs = response.logs;
        await this.SortLogs();
        await this.GetDataPoints(this.logs);
        this.RenderGraph(this.dataPoints);
        console.log(this.logs);
      }
    });
  }

  async SortLogs() {
    this.sortedLogs = [];
    const source = from(this.logs);
    const example = source.pipe(
      groupBy(log => log.appName),
      mergeMap(group => group.pipe(toArray()))
    );
    example.subscribe(sortedLogByAppName => {
      this.sortedLogs.push(sortedLogByAppName)
    });
  }

  GetDataPoints(logs) {
    let currentX = 0;
    let start_time = logs[0].fields.log_time;
    let stripLineNumberIndex = 0;
    this.stripLinesNumber.push(0);
    let colorCodes: any = {};
    this.sortedLogs.reverse();
    this.sortedLogs.forEach(x => x.reverse());
    this.sortedLogs.forEach(LogsArray => {
      let altApiColor = true;
      let color = null;
      let colorIndex = 0;
      LogsArray.forEach(log => {
        let sid = log.fields.sid;
        if (log.logType == "api") {
          if (log.fields.status == "failure") {
            color = "red";
          }
          else
            if (colorCodes[sid] != undefined) {
              color = colorCodes[sid];
            }
            else {
              colorCodes[sid] = this.colorScheme[colorIndex];
              colorIndex++;
              color = colorCodes[sid];
            }
          altApiColor = !altApiColor;
          currentX++;
          let y1 = this.GetY1(start_time, log.fields.log_time);
          let y = [y1, y1 + (log.fields.hasOwnProperty('time_taken_ms') ? log.fields.time_taken_ms : log.fields.hasOwnProperty('timeTakenMs') ? log.fields.timeTakenMs : 1)];
          this.dataPoints.push({ x: currentX, y, color: color, label: " ", appName: log.appName, logId: log.logId, logType: log.logType, api: log.fields.api, verb: log.fields.verb, time_taken_ms: log.fields.time_taken_ms, LogTime: moment(log.fields.log_time).format('MMMM Do YYYY, h:mm:ss.SSS a'), stackId: log.fields.sid, http: this.http, ref: this })
        }
      });
      currentX++;
      this.stripLinesNumber.push(currentX);
      stripLineNumberIndex++;
      let appNameX = currentX - parseInt(((this.stripLinesNumber[stripLineNumberIndex] - this.stripLinesNumber[stripLineNumberIndex - 1]) / 2).toString());
      this.dataPoints.push({ x: appNameX, label: LogsArray[0].appName });
      this.dataPoints.push({ x: currentX, label: " " });
    });
  }

  GetY1(start_time, log_time) {
    let start_timeMin = start_time.substring(14, 16);
    let log_timeMin = log_time.substring(14, 16);
    let start_timeSeconds = start_time.substring(17, 26);
    let log_Seconds = log_time.substring(17, 26);
    let start_hours = start_time.substring(11, 13);
    let log_hours = log_time.substring(11, 13);
    let diff = (parseFloat(log_hours) - parseFloat(start_hours)) * 3600 + (parseFloat(log_timeMin) - parseFloat(start_timeMin)) * 60 + parseFloat(log_Seconds) - parseFloat(start_timeSeconds);
    return diff * 1000;
  }

  GetStripLines() {
    let stripLines = [];
    for (let i = 0; i < this.sortedLogs.length; i++) {
      stripLines.push({ value: this.stripLinesNumber[i], color: "dimgrey", thickness: 2 });
    }
    return stripLines;
  }

  RenderGraph(dataPoints) {
    let chart = new CanvasJS.Chart("chartContainer",
      {
        theme: "dark2",
        dataPointMaxWidth: 10,
        zoomEnabled: true,
        zoomType: "xy",
        axisY: {
          includeZero: false,
          crosshair: {
            enabled: true,
          },
          labelFontSize: 15,
          lineThickness: 0.1,
          scaleBreaks: {
            autoCalculate: true,
            lineThickness: 0,
            collapsibleThreshold: "0%",
            type: "zigzag",

          },
          gridColor: "#414142",
        },
        axisX: {
          includeZero: false,
          stripLines: this.GetStripLines(),
          interval: 1,
          labelFontSize: 15,
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 1
        },
        data: [
          {
            type: "rangeBar",
            click: this.onClick,
            markerBorderThickness: 1,
            toolTipContent: "AppName:{appName}<br>LogId:{logId}<br>Type:{logType}<br>Verb:{verb}<br>API:{api}<br>TimeTaken: {time_taken_ms} ms<br> LogTime: {LogTime}<br> StackId:{stackId}",
            dataPoints: dataPoints
          }
        ]
      });
    chart.render();
  }
  onClick(e) {
    e.dataPoint.ref.logsService.GetLogById(e.dataPoint.logId).subscribe((log: any) => {
      e.dataPoint.ref.logFieldsKeys = [];
      e.dataPoint.ref.currentLogDetails = log.logs[0];
      e.dataPoint.ref.showLogDetailsToggle = true;
      console.log(e.dataPoint.ref.showLogDetailsToggle);
      for (let key in log.logs[0].fields) {
        e.dataPoint.ref.logFieldsKeys.push(key);
      }
      return log.logs[0].appName;
    });
  }

  closeLogDetailsPopUp() {
    this.showLogDetailsToggle = false;
    this.currentLogDetails = null;
    console.log(this.showLogDetailsToggle);
  }
}