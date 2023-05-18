<script>
import { defineComponent } from "vue";
import { Doughnut } from "vue3-chart-v2";

export default defineComponent({
  name: "PieChart",
  extends: Doughnut,
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.renderChart(this.chartData);
    console.log("Mounted");
  },
});
</script>
