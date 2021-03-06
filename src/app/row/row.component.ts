import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { IrowData } from '../interfaces/IrowData.interface';
import { isPlatformBrowser } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RowComponent implements OnInit {

  @Input() rowData: IrowData;
  modifiedURL: string;
  @Output() emittedaction = new EventEmitter();
  @Output() hideStoryDetails = new EventEmitter();
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  newsCreatedAt = {
    years: 0,
    months: 0,
    days: 0
  };

  ngOnInit(): void {
    let url ;
    const today = moment();
    this.newsCreatedAt =  {
      years: today.diff(this.rowData.created_at, 'years'),
      months: today.diff(this.rowData.created_at, 'months'),
      days: today.diff(this.rowData.created_at, 'day')
    };
    if (this.rowData.url === '' || this.rowData.url === null) {
      this.modifiedURL = '-';
    } else {
      if (this.isBrowser) {
         url = new window.URL(this.rowData.url);
         this.modifiedURL = url.hostname;
         if (this.modifiedURL.indexOf('www.') > -1) {
            this.modifiedURL = this.modifiedURL.substr(4, this.modifiedURL.length);
          }
      }
    }
  }

  performUpdate(action: string) {
    const emitData = {
      newsId: this.rowData.objectID,
      action
    };
    this.emittedaction.emit(emitData);
  }

}
