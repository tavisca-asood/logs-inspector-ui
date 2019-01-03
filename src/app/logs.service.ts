import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogsRequest } from './logs-request';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  public response = new BehaviorSubject(null);
  public filteredResponse = new BehaviorSubject(null);;
  public facets = new BehaviorSubject(null);
  private url = "http://localhost:52045/api/Logs";
  constructor(private httpClient: HttpClient) { }
  GetLogs(Id) {
    let logsRequest = new LogsRequest();
    logsRequest.Id = Id;
    let obs = this.httpClient.post(this.url, logsRequest,
      {
        headers: new HttpHeaders
          ({
            'content-type': 'application/json'
          })
      });
    obs.subscribe((response) => {
      this.response.next(response);
      this.filteredResponse.next(response);
    });
  }
  GetFacets(Id) {
    let obs = this.httpClient.get(this.url + "/Facets?id=" + Id);
    obs.subscribe((response) => {
      this.facets.next(response);
    });
  }
  GetLogById(Id): Observable<any> {
    let obs = this.httpClient.get(this.url + "?id=" + Id);
    return obs;
  }
}
