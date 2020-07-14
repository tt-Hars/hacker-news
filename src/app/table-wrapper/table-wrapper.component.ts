import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { GetNewsService } from '../services/get-news.service';
import { IrowData, IpageData } from '../interfaces/IrowData.interface';
import { TimelineChartComponent } from '../timeline-chart/timeline-chart.component';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableWrapperComponent implements OnInit {

  newsList = Array<IrowData>();
  pageNo = 0;
  constructor(private getNewsService: GetNewsService) { }
  @ViewChild('timelineChart') chartComponent: TimelineChartComponent;
  ngOnInit(): void {
    const url =  window.location.href;
    this.pageNo = +url.substr(url.indexOf('=') + 1, url.length) || 0;
    if (!localStorage.getItem('pageData')) {
      this.getNewsService.getNews(this.pageNo).subscribe( data => {
          this.assignValues(data);
          localStorage.setItem('pageData', JSON.stringify(data.hits));
          localStorage.setItem('pageNo', `${data.page}`);
        }
      );
    }  else {
      if (this.pageNo === +localStorage.getItem('pageNo')) {
        this.newsList = JSON.parse(localStorage.getItem('pageData'));
        this.pageNo = +localStorage.getItem('pageNo');
      } else {
        this.getNewsService.getNews(this.pageNo).subscribe( data => {
          this.assignValues(data);
          localStorage.setItem('pageData', JSON.stringify(data.hits));
          localStorage.setItem('pageNo', `${data.page}`);
        }
      );
      }
    }
  }
  updateData(updatedPageNum): void {
    localStorage.clear();
    this.getNewsService.getNews(updatedPageNum).subscribe( data => {
      this.assignValues(data);
      localStorage.setItem('pageData', JSON.stringify(data.hits));
      localStorage.setItem('pageNo', `${data.page}`);
    });
  }

  updateNews(updatedData) {
    for (let index = 0; index < this.newsList.length; index ++) {
      if (updatedData.action === 'upvote' && this.newsList[index].objectID === updatedData.newsId) {
        this.newsList[index].points ++;
        break;
      } else if (updatedData.action === 'hide' && this.newsList[index].objectID === updatedData.newsId) {
        this.newsList.splice(index, 1);
        break;
      }
    }
    this.chartComponent.createChart(this.newsList);
    localStorage.setItem('pageData', JSON.stringify(this.newsList));
  }

  assignValues(data: IpageData) {
    this.newsList = data.hits;
    this.pageNo = data.page;
  }
}
