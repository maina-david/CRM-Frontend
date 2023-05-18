<template>
  <div class="flex justify-between border-b mt-10 m-5">
    <div class="m-3"><DateRangePicker v-model="date" /></div>
    <div class="m-4">
      <ActionButton text="Export"></ActionButton>
    </div>
  </div>
  <div class="grid grid-cols-5 mt-5 bg-white">
    <div class="col-span-2 m-8 bg-slate-50 p-3">
      <div class="border-b my-2">
        <h2 class="font-bold text-sm m-2">Ticket Incident Reports</h2>
      </div>
      <div>
        <Dropdown
          select="Select Option ..."
          :options="optionFilter"
          v-model="optionId"
          class="justify-center flex"
        />
      </div>
      <div class="my-10">
        <PieChart :chartData="accTypeHitChartData" />
      </div>
    </div>
    <div class="col-span-3">
      <div class="m-10 bg-slate-50 p-3">
        <IncidentReportTable
          :tableHead="tableHead"
          :tableData="tableData"
          class="p-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IncidentReportTable from "@/components/tables/CaseManagementTables/IncidentReportTable.vue";
import PieChart from "@/components/Graphics/PieChart.vue";
import Dropdown from "@/components/Dropdown.vue";
import DateRangePicker from "@/components/DateRangePicker.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  components: {
    IncidentReportTable,
    PieChart,
    Dropdown,
    DateRangePicker,
    ActionButton,
  },
  data() {
    return {
      accTypeId: "",
      optionId: "",
      optionFilter: [
        { label: "Gender", value: "Gender" },
        { label: "Age", value: "Age" },
        { label: "Occupation", value: "Occupation" },
      ],

      tableHead: ["Option Name", "No of Tickets"],
      tableData: [
        { name: "Male", noOfTickets: "195" },
        { name: "Female", noOfTickets: "365" },
        { name: "Prefer Not to Say", noOfTickets: "146" },
      ],
      start: "",
      // myData: ,
      end: "",
      date: "",
      option: "",
      accTypeHitChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Male", "Female", "Prefer Not To Say"],
        datasets: [
          {
            backgroundColor: this.getRandomColorEachSection(
              [195, 365, 15].length
            ),
            data: [195, 365, 146],
            label: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF".split("");
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getRandomColorEachSection(count) {
      var data = [];
      for (var i = 0; i < count; i++) {
        data.push(this.getRandomColor());
      }
      console.log(count);
      console.log(data);
      return data;
    },
  },
};
</script>

<style></style>
