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
    backgroundColor: ["#6050DC", "#D52DB7", "#FF2E7E", "#FF6B45", "#FFAB05", "#00529B"],
    borderWidth: 0.75
  }]
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnChanges(): void {
  }

}
