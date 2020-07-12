import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IrowData } from '../interfaces/IrowData.interface';
import { URL } from 'url';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RowComponent implements OnInit {

  @Input() rowData: IrowData;
  modifiedURL: string;
  constructor() { }

  ngOnInit(): void {
    if (this.rowData.url === '' || this.rowData.url === null) {
      this.modifiedURL = '-';
    } else {
      const url = new window.URL(this.rowData.url);
      this.modifiedURL = url.hostname;
      if (this.modifiedURL.indexOf('www.') > -1) {
        this.modifiedURL = this.modifiedURL.substr(4, this.modifiedURL.length);
      }
    }

  }

}
