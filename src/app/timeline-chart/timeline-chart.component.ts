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
    this.createChart();
  }
  createChart() {
    this.lineChart = [];
    this.graphCoordinates.x = [];
    this.graphCoordinates.y = [];
    this.newsList.map((el) => {
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
            borderColor: '#3cb371',
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
