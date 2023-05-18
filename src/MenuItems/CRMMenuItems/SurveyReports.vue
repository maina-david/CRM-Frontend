<template>
  <div>
    <div class="flex justify-between">
      <div>
        <Dropdown
          select="Select Survey to View"
          :options="selectFilter"
          v-model="surveyId"
          class=""
        />
      </div>
      <div class="mt-3"><ActionButton text="Export" /></div>
    </div>

    <div v-if="surveyId" class="mt-10 grid grid-cols-7 gap-5">
      <div class="col-span-2 bg-white p-2 mt-5">
        <div class="border-b">
          <h2 class="font-bold text-xl p-3">Cumulative Report</h2>
        </div>
        <div class="mt-2">
          <div class="bg-white p-2">
            <div class="m-2 flex justify-center">
              <Dropdown
                select="Select Option to View"
                :options="optionFilter"
                v-model="optionId"
                class=""
              />
            </div>
            <div class="my-5" v-if="optionId">
              <PieChart :chartData="surveyReportChartData" />
            </div>
            <div v-else class="bg-white p-3 flex justify-center">
              <h3 class="text-sm font-semibold">SELECT AN OPTION TO VIEW</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-5 bg-white p-2 mt-5">
        <div class="">
          <div class="mt-5">
            <DetailedSurveyReport
              :tableHead="detailedSurveyTableHead"
              :tableData="detailedSurveyTableData"
              class="p-3"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-white px-12 py-14 flex justify-center mt-10">
      <h3 class="text-sm font-semibold">SELECT A SURVEY TO VIEW</h3>
    </div>
  </div>
</template>

<script>
import DetailedSurveyReport from "@/components/tables/CampaignTables/DetailedSurveyReport.vue";
import Dropdown from "@/components/Dropdown.vue";
import PieChart from "@/components/Graphics/PieChart.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  components: {
    DetailedSurveyReport,
    Dropdown,
    ActionButton,
    PieChart,
  },
  data() {
    return {
      surveyId: "",
      optionId: "",
      selectFilter: [
        {
          label: "Linda for President Campaign 1 Survey",
          value: "Survey 1",
        },
        {
          label: "Tonui for Governor Campaign Survey",
          value: "VOICE",
        },
        {
          label: "Tonui for MCA Campaign Survey",
          value: "SMS",
        },
      ],
      optionFilter: [
        { label: "Age", value: "Age" },
        { label: "Occupation", value: "Occupation" },
      ],

      detailedSurveyTableHead: [
        "Number",
        "Agent",
        "Call Time",
        "Play Call Audio",
        "Actions",
      ],

      detailedSurveyTableData: [
        {
          number: "+254 789 859 698",
          agent: "Jane Doe",
          call_time: "3 minutes",
          file_url:
            "https://goipspace.fra1.cdn.digitaloceanspaces.com/recordings/1669546825.194795.wav",
        },
        {
          number: "+254 789 859 698",
          agent: "Johnson Doe",
          call_time: "3 minutes",
          file_url:
            "https://goipspace.fra1.cdn.digitaloceanspaces.com/recordings/1669546825.194795.wav",
        },
      ],
      surveyReportChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
        datasets: [
          {
            backgroundColor: this.getRandomColorEachSection(
              [60, 48, 165, 32, 15].length
            ),
            data: [60, 48, 165, 32, 15],
            label: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      start: "",
      // myData: ,
      end: "",
      date: "",
      option: "",
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
