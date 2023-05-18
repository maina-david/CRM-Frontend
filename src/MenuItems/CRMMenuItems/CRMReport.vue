<template>
  <div class="grid grid-cols-5 gap-3 mt-10">
    <div class="bg-white col-span-3">
      <div class="mt-10">
        <AccountTypeReportTable
          :tableHead="tableHead"
          :tableData="tableData"
          class="p-3"
        />
      </div>
    </div>
    <div class="bg-white col-span-2">
      <div>
        <div>
          <div class="p-2 border-b">
            <h2 class="text-sm font-normal m-3">Account Type Report</h2>
          </div>

          <div>
            <Dropdown
              select="Select Account Type ..."
              :options="selectFilter"
              v-model="accTypeId"
              class="justify-center flex"
            />
            <Dropdown
              select="Select Option ..."
              :options="optionFilter"
              v-model="optionId"
              class="justify-center flex"
            />
          </div>
          <div class="my-5">
            <PieChart :chartData="accTypeHitChartData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountTypeReportTable from "@/components/tables/CRMTables/AccountTypeReportTable.vue";
import PieChart from "@/components/Graphics/PieChart.vue";
import Dropdown from "@/components/Dropdown.vue";

export default {
  components: { AccountTypeReportTable, PieChart, Dropdown },
  data() {
    return {
      accTypeId: "",
      optionId: "",
      selectFilter: [
        { label: "Account Type 1", value: "Account Type 1" },
        { label: "Account Type 2", value: "Account Type 2" },
      ],
      optionFilter: [
        { label: "Age", value: "Age" },
        { label: "Occupation", value: "Occupation" },
      ],

      tableHead: ["Account Type", "No of Accounts", "No of Contacts"],
      tableData: [
        { name: "Account Type 1", noOfAccounts: "15", noOfContacts: "123" },
        { name: "Account Type 2", noOfAccounts: "15", noOfContacts: "123" },
        { name: "Account Type 3", noOfAccounts: "15", noOfContacts: "123" },
        { name: "Account Type 4", noOfAccounts: "15", noOfContacts: "123" },
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
              [60, 25, 15].length
            ),
            data: [60, 25, 15],
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
