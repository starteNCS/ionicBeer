import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss'],
})
export class TypesComponent implements OnChanges {

  @Input() labels: Label[];
  @Input() values: SingleDataSet;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    showLines: false
  };
  public colors: Color[] = [{
    backgroundColor: ["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"],
    borderWidth: 0.75
  }]
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnChanges(): void {
  }

}
