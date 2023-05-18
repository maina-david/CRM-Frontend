<template>
  <div>
    <div class="flex justify-between">
      <div>
        <Dropdown
          select="Select Campaign to View"
          :options="selectFilter"
          v-model="campaignId"
          class=""
        />
      </div>
      <div class="mt-3"><ActionButton text="Export" /></div>
    </div>
    <div v-if="campaignId == 'VOICE'" class="grid grid-cols-5 gap-3 mt-10">
      <div class="bg-white col-span-3">
        <div class="mt-10">
          <VoiceCampaignReportTable
            :tableHead="voiceTableHead"
            :tableData="voiceTableData"
            class="p-3"
          />
        </div>
      </div>
      <div class="bg-white col-span-2">
        <div>
          <div>
            <div class="p-2 border-b">
              <h2 class="text-sm font-normal m-3">Voice Campaigns</h2>
            </div>
            <div class="my-5">
              <PieChart :chartData="voiceCampaignChartData" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="campaignId == 'SMS'" class="grid grid-cols-5 gap-3 mt-10">
      <div class="bg-white col-span-3">
        <div class="mt-10">
          <SMSReportTable
            :tableHead="smsTableHead"
            :tableData="smsTableData"
            class="p-3"
          />
        </div>
      </div>
      <div class="bg-white col-span-2">
        <div>
          <div>
            <div class="p-2 border-b">
              <h2 class="text-sm font-normal m-3">SMS Campaigns</h2>
            </div>
            <div class="my-5">
              <PieChart :chartData="smsCampaignChartData" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="campaignId == 'AGENTLED'" class="grid grid-cols-5 gap-3 mt-10">
      <div class="bg-white col-span-3">
        <div class="mt-10">
          <AgentLedCampaignReport
            :tableHead="agentLedTableHead"
            :tableData="agentLedTableData"
            class="p-3"
          />
        </div>
      </div>
      <div class="bg-white col-span-2">
        <div>
          <div>
            <div class="p-2 border-b">
              <h2 class="text-sm font-normal m-3">Agent Led Campaigns</h2>
            </div>
            <div class="my-5">
              <PieChart :chartData="agentLedCampaignChartData" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="bg-white px-12 py-14 flex justify-center mt-10">
      <h3 class="text-sm font-semibold">SELECT A CAMPAIGN TO VIEW</h3>
    </div>
  </div>
</template>

<script>
import VoiceCampaignReportTable from "@/components/tables/CampaignTables/VoiceCampaignReportTable.vue";
import SMSReportTable from "@/components/tables/CampaignTables/SMSReportTable.vue";
import AgentLedCampaignReport from "@/components/tables/CampaignTables/AgentLedCampaignReport.vue";
import PieChart from "@/components/Graphics/PieChart.vue";
import Dropdown from "@/components/Dropdown.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  components: {
    VoiceCampaignReportTable,
    PieChart,
    Dropdown,
    SMSReportTable,
    AgentLedCampaignReport,
    ActionButton,
  },
  data() {
    return {
      campaignId: "",
      optionId: "",
      selectFilter: [
        {
          label: "Linda for President Campaign 1(Agent Led)",
          value: "AGENTLED",
        },
        {
          label: "Tonui for Governor Campaign (Voice Campaign)",
          value: "VOICE",
        },
        {
          label: "Tonui for MCA Campaign (SMS Campaign)",
          value: "SMS",
        },
      ],
      optionFilter: [
        { label: "Age", value: "Age" },
        { label: "Occupation", value: "Occupation" },
      ],

      voiceTableHead: ["Number", "Call Time", "Status"],
      agentLedTableHead: ["Number", "Agent", "Call Time", "Status"],
      smsTableHead: ["Number", "Text", "Status"],

      voiceTableData: [
        {
          number: "+254 789 859 698",
          call_time: "3 minutes",
          status: "Answered",
        },
        {
          number: "+254 749 859 698",
          call_time: "1 minutes",
          status: "Unanswered",
        },
      ],
      agentLedTableData: [
        {
          number: "+254 789 859 698",
          agent: "Jane Doe",
          call_time: "3 minutes",
          status: "Answered",
        },
        {
          number: "+254 749 859 698",
          agent: "Juliet Doe",
          call_time: "1 minutes",
          status: "Unanswered",
        },
      ],
      smsTableData: [
        {
          number: "+254 789 859 698",
          text: "export 'default' (imported as 'XLSX') was not found in 'xlsx'",
          status: "Delivered",
        },
        {
          number: "+254 749 859 698",
          text: "export 'default' (imported as 'XLSX') was not found in 'xlsx'",
          status: "Blocked",
        },
        {
          number: "+254 799 859 698",
          text: "export 'default' (imported as 'XLSX') was not found in 'xlsx'",
          status: "Network",
        },
      ],
      start: "",
      // myData: ,
      end: "",
      date: "",
      option: "",
      voiceCampaignChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Answered Calls", "Not Answered Calls"],
        datasets: [
          {
            backgroundColor: this.getRandomColorEachSection([6, 15].length),
            data: [60, 15],
            label: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      smsCampaignChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Delivered SMS", "Blocked SMS", "Network SMS"],
        datasets: [
          {
            backgroundColor: this.getRandomColorEachSection(
              [60, 23, 15].length
            ),
            data: [60, 23, 15],
            label: [],
          },
        ],
      },
      agentLedCampaignChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Answered Calls", "Not Answered Calls"],
        datasets: [
          {
            backgroundColor: this.getRandomColorEachSection([6, 15].length),
            data: [60, 15],
            label: [],
          },
        ],
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
