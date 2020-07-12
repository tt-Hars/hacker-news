import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GetNewsService } from '../services/get-news.service';
import { IrowData, IpageData } from '../interfaces/IrowData.interface';

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

  assignValues(data: IpageData) {
    this.newsList = data.hits;
    this.noOfRecords = data.hitsPerPage;
  }
}
