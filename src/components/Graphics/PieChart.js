import { defineComponent, h } from "vue";

import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default defineComponent({
  name: "PieChart",
  components: {
    Pie,
  },
  props: {
    chartData: {
      type: Object,
    },
    chartId: {
      type: String,
      default: "pie-chart",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    return () =>
      h(Pie, {
        chartOptions,
        chartData: props.chartData,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
