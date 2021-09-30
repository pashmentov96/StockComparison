import "./StockChart.scss";

import { useEffect, useRef, useState } from "react";
import { ChartData } from "./types";
import { createChart } from "./utils/createChart";
import { loadChartData } from "./utils/loadChartData";
import { XYChart } from "@amcharts/amcharts4/charts";

export interface LineChartProps {
  security: string;
}

// TODO: rerender when changing width happened
export function StockChart({ security }: LineChartProps) {
  const [chartData, setChartData] = useState([] as ChartData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const chartRef: React.MutableRefObject<XYChart | undefined> = useRef();

  useEffect(() => {
    const chart = createChart([]);
    chartRef.current = chart;
    
    return () => {
      chart.dispose();
    }
  }, []);

  useEffect(() => {
    if (isLoaded && chartData.length > 0 && chartRef.current) {
      chartRef.current.data = chartData;
    }
  }, [isLoaded]);

  useEffect(() => {
    setChartData([]);
    setIsLoaded(false);
    setCurrentIndex(0);
  }, [security]);

  useEffect(() => {
    if (!isLoaded && security !== "") {
      loadChartData(security, currentIndex).then((result) => {
        if (result.length === 0) {
          setIsLoaded(true);
        } else {
          setChartData([...chartData, ...result]);
          setCurrentIndex(currentIndex + 100);
        }
      });
    } else if (security === "") {
      setIsLoaded(true);
    }
  }, [isLoaded, currentIndex]);

  return <div id="chart-div" className="chart-container"></div>;
}
