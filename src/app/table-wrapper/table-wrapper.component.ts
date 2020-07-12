import { Component, OnInit, ViewEncapsulation,  ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { GetNewsService } from '../services/get-news.service';
import { IrowData, IpageData } from '../interfaces/IrowData.interface';
import { TimelineChartComponent } from '../timeline-chart/timeline-chart.component';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableWrapperComponent implements OnInit {

  newsList = Array<IrowData>();
  noOfRecords = 0;
  constructor(private getNewsService: GetNewsService, private ref: ChangeDetectorRef) { }
  @ViewChild('timelineChart') chartComponent: TimelineChartComponent;
  ngOnInit(): void {
    this.getNewsService.getNews(this.noOfRecords).subscribe( data => {
        this.assignValues(data);
        // this.ref.markForCheck();
      }
    );
  }
  updateData(updatedPageNum): void {
    this.getNewsService.getNews(updatedPageNum).subscribe( data => {
      this.assignValues(data);
      // this.ref.markForCheck();
    });

  }

  updateNews(updatedData) {
    this.newsList.forEach((data, index, obj) => {
      // if (updatedData.action === 'upvote' && data.objectID === updatedData.newsId) {
      //   data.points ++;
      // } else if (updatedData.action === 'hide' && data.objectID === updatedData.newsId) {
      //     obj.splice(index, 1);
      // }
    });
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
    //this.ref.markForCheck();
  }

  assignValues(data: IpageData) {
    this.newsList = data.hits;
    this.noOfRecords = data.hitsPerPage;
  }
}
