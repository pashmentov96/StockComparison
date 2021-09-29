import "./StockChart.scss";

import { useEffect, useState } from "react";
import { ChartData } from "./types";
import { createChart } from "./utils/createChart";
import { loadChartData } from "./utils/loadChartData";

export interface LineChartProps {
  security: string;
}

export function StockChart({ security }: LineChartProps) {
  const [chartData, setChartData] = useState([] as ChartData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    createChart([]);
  }, []);

  useEffect(() => {
    if (isLoaded && chartData.length > 0) {
      createChart(chartData);
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
