import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import {
  Chart,
  Line,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import styles from "@/styles/dashboard.module.scss";
import { useRef } from "react";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler,
  Legend,
  Tooltip
);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(75, 192, 192)",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(53, 162, 235)",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    },
  ],
};

export default function Dashboard() {
  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

  };

  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

  };

  const printElementsAtEvent = (elements) => {
    if (!elements.length) return;

  };

  const chartRef = useRef(null);

  const onClick = (event) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  const lineLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const lineData = {
    lineLabels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__bar}>
        <Chart
          ref={chartRef}
          type="bar"
          onClick={onClick}
          options={options}
          data={data}
        />
      </div>
      <div className={styles.dashboard__line}>
        <Line options={lineOptions} data={lineData} />
      </div>
      <div className={styles.dashboard__bar}></div>
    </div>
  );
}
