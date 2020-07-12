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
  noOfRecords = 0;
  constructor(private getNewsService: GetNewsService) { }
  @ViewChild('timelineChart') chartComponent: TimelineChartComponent;
  ngOnInit(): void {
    this.getNewsService.getNews(this.noOfRecords).subscribe( data => {
        this.assignValues(data);
      }
    );
  }
  updateData(updatedPageNum): void {
    this.getNewsService.getNews(updatedPageNum).subscribe( data => {
      this.assignValues(data);
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
  }

  assignValues(data: IpageData) {
    this.newsList = data.hits;
    this.noOfRecords = data.hitsPerPage;
  }
}
