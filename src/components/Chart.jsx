import ReactECharts from "echarts-for-react";

export default function Chart({ productPrices }) {
  const priceData = productPrices.map((item) =>
    parseInt(item.price.replace("$", ""))
  );

  const formatShortYear = (dateString) => {
    const parts = dateString.split("/");
    const year = parts[2].slice(-2);
    return `${parts[0]}/${parts[1]}/${year}`;
  };

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: ${c}",
    },
    xAxis: {
      type: "category",
      data: productPrices.map((item) => formatShortYear(item.priceDate)),
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "${value}",
      },
    },
    series: [
      {
        data: priceData,
        type: "line",
      },
    ],
  };
  return <ReactECharts option={option} className="w-full h-full pl-5 pr-5" />;
}
