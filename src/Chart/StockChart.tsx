import "./StockChart.scss";

import { useEffect, useRef, useState } from "react";
import { SeriesData, ChartData } from "./types";
import { createChart, createSeries } from "./utils/createChart";
import { loadSeriesData } from "./utils/loadSeriesData";
import { XYChart, XYSeries } from "@amcharts/amcharts4/charts";
import { useSelector } from "react-redux";
import { RootState } from "../Reducers";

type SeriesRefs = Map<string, XYSeries>;

export function StockChart() {
  const [seriesData, setSeriesData] = useState([] as SeriesData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chartData, setChartData] = useState([] as ChartData);

  const chartRef: React.MutableRefObject<XYChart | undefined> = useRef();
  const seriesRefs: React.MutableRefObject<SeriesRefs> = useRef(new Map());

  const tickerToRemove = useSelector(
    (state: RootState) => state.ticker.toRemove
  );

  const security = useSelector((state: RootState) => state.ticker.toAdd);

  useEffect(() => {
    const chart = createChart([]);
    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (tickerToRemove !== "" && chartRef.current) {
      const series = seriesRefs.current.get(tickerToRemove);
      if (series) {
        chartRef.current.series
          .removeIndex(chartRef.current.series.indexOf(series))
          .dispose();

        seriesRefs.current.delete(tickerToRemove);
      }

      if (seriesRefs.current.size === 1) {
        Array.from(seriesRefs.current.entries()).forEach(([key, xySeries]) => {
          xySeries.dataFields.valueYShow = "value";
          xySeries.tooltipText = `{name}: {${key}}`;
        });
      }
    }
  }, [tickerToRemove]);

  useEffect(() => {
    if (chartData.length > 0 && chartRef.current) {
      const newData = chartData.map((point) => ({
        date: point.date,
        ...point.values,
      }));
      chartRef.current.data = newData;

      seriesRefs.current.set(
        security,
        chartRef.current.series.push(createSeries(security))
      );

      if (seriesRefs.current.size > 1) {
        Array.from(seriesRefs.current.entries()).forEach(([key, xySeries]) => {
          xySeries.dataFields.valueYShow = "changePercent";
          xySeries.tooltipText = `{name}: {valueY.changePercent.formatNumber('[#0c0]+#.00|[#c00]#.##|0')}%}`;
        });
      }
    }
  }, [chartData]);

  useEffect(() => {
    if (isLoaded && seriesData.length > 0) {
      if (chartData.length === 0) {
        setChartData(
          seriesData.map((point) => ({
            date: point.date,
            values: { [security]: point.value },
          }))
        );
      } else {
        setChartData(
          chartData.map((point, index) => ({
            date: point.date,
            values: { ...point.values, [security]: seriesData[index].value },
          }))
        );
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    setSeriesData([]);
    setIsLoaded(false);
    setCurrentIndex(0);
  }, [security]);

  useEffect(() => {
    if (!isLoaded && security !== "") {
      loadSeriesData(security, currentIndex).then((result) => {
        if (result.length === 0) {
          setIsLoaded(true);
        } else {
          setSeriesData([...seriesData, ...result]);
          setCurrentIndex(currentIndex + 100);
        }
      });
    } else if (security === "") {
      setIsLoaded(true);
    }
  }, [isLoaded, currentIndex]);

  return <div id="chart-div" className="chart-container"></div>;
}
