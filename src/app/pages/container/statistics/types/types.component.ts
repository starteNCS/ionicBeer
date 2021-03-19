import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }]
    }    
  };
  barChartLabels: Label[] = ['Pils', 'Weizen', 'Ale', 'Alt', 'Helles', 'Schwarzes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [6, 2, 1, 3, 4, 1], label: 'Probierte Arten' }
  ];

  ngOnInit(): void {
  }

}
