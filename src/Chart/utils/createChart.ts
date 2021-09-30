import { SeriesData } from "../types";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export function createSeries(security: string) {
  const series = new am4charts.LineSeries();
  series.dataFields.valueY = `${security}`;
  series.dataFields.dateX = "date";
  series.tooltipText = `{name}: {${security}}`;
  series.name = security;

  if (series.tooltip) {
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.getFillFromObject = false;
    series.tooltip.getStrokeFromObject = true;
    series.tooltip.background.fill = am4core.color("#fff");
    series.tooltip.background.strokeWidth = 2;
    series.tooltip.label.fill = series.stroke;
  }
  return series;
}

export function createChart(data: SeriesData) {
  const chart = am4core.create("chart-div", am4charts.XYChart); // chart-div!

  am4core.useTheme(am4themes_animated);

  chart.data = data;

  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 60;
  dateAxis.renderer.grid.template.disabled = true;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  chart.cursor = new am4charts.XYCursor();
  // chart.cursor.xAxis = dateAxis;

  chart.legend = new am4charts.Legend();
  // chart.legend.contentAlign = "left";

  // chart.scrollbarY = new am4core.Scrollbar();
  // chart.scrollbarX = new am4core.Scrollbar();
  return chart;
}
