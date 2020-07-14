import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IrowData, Igraph } from '../interfaces/IrowData.interface';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-timeline-chart',
  templateUrl: './timeline-chart.component.html',
  styleUrls: ['./timeline-chart.component.scss'],
})
export class TimelineChartComponent implements OnInit, OnChanges {
  @Input() newsList: Array<IrowData>;
  graphCoordinates: Igraph = {x: [], y: []};
  lineChart = [];

  constructor() {}

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    this.createChart(this.newsList);
  }
  createChart(newsList) {
    this.lineChart = [];
    this.graphCoordinates.x = [];
    this.graphCoordinates.y = [];
    newsList.map((el) => {
      this.graphCoordinates.x.push(el.objectID);
      this.graphCoordinates.y.push(el.points);
    });
    this.lineChart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.graphCoordinates.x,
        datasets: [
          {
            data: this.graphCoordinates.y,
            borderColor: '#2f5496',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],
          yAxes: [
            {
              display: true,
            },
          ],
        },
      },
    });
  }
}
