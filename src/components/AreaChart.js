import React from "react";
import ReactECharts from "echarts-for-react";
const AreaChart = ({ data }) => {
  const option = {
    tooltip: {},
    dataset: {
      source: data,
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        stack: "x",
        areaStyle: {},
        smooth: true,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default AreaChart;
