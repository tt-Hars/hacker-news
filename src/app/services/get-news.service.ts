import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IpageData } from '../interfaces/IrowData.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetNewsService {

  constructor(private httpClient: HttpClient) { }
  baseUrl = environment.getNewsUrl;
  tags = '(story,poll)';
  queryParam = 'hitsPerPage';
  getNews(pageNo) {
    return this.httpClient.get<IpageData>(`${this.baseUrl}?tags=${this.tags}&${this.queryParam}=30&page=${pageNo}`);
    // .pipe(map(d => d.hits.forEach(element => {
    // })));
  }
}
