import ReactECharts from "echarts-for-react";
const BarChart = ({ data }) => {
  const option = {
    tooltip: {},
    dataset: {
      source: data,
    },

    xAxis: {
      type: "category",
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "bar",
        barWidth: "20%",
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: 400 }}

      //   opts={{ renderer: "svg" }}
    />
  );
};

export default BarChart;
