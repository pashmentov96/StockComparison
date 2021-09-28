import { ChartData } from "../types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export function createChart(data: ChartData) {
  const chart = am4core.create("chart-div", am4charts.XYChart); // chart-div!

  am4core.useTheme(am4themes_animated);
  am4core.options.autoDispose = true;

  chart.data = data;

  // Create axes
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 60;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  const series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.tooltipText = "{value}";

  if (series.tooltip) {
    series.tooltip.pointerOrientation = "vertical";
  }

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.snapToSeries = series;
  chart.cursor.xAxis = dateAxis;

  // chart.scrollbarY = new am4core.Scrollbar();
  // chart.scrollbarX = new am4core.Scrollbar();
}
