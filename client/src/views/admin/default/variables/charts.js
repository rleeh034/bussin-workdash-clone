export const lineChartOptionsSaleChart = {
  chart: {
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: "#4318FF",
    },
  },
  colors: ["#4318FF", "#DE1010"],
  markers: {
    size: 0,
    colors: "white",
    strokeColors: "#7551FF",
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  tooltip: {
    theme: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    type: "line",
    dashArray: [0, 10]
  },
  xaxis: {
    type: "numeric",
    min: 0,
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  legend: {
    show: true,
    offsetY: 5,
    labels: {
      colors: "#A3AED0",
      fontSize: "12px",
      fontWeight: "500",
    },
  },
  grid: {
    show: false,
    column: {
      color: ["#7551FF", "#DE1010"],
      opacity: 0.5,
    },
  },
  color: ["#7551FF", "#DE1010"],
};
