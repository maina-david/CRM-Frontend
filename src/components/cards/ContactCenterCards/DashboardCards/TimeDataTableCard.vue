<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div class="pt-4">
      <h1 class="font-semibold">KPI Time</h1>
      <hr
        class="border-1 mt-5 border-gray-300 cursor-pointer hover:border-red-500 duration-500"
      />
    </div>
    <table
      class="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400 p-4"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            class="py-2 px-3"
            v-for="head in tableHead"
            :key="head"
          >
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="tableData.length <= 0"
          class="bg-white border-b dark:bg-gray-800 text-center p-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div class="p-3 m-3 text-center">
            You do not have any records to show
          </div>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-else
          v-for="data in tableData"
          :key="data"
        >
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.total_call }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ timeConvert(data.queue_time) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ timeConvert(data.call_time) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ timeConvert(data.hold_time) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ timeConvert(data.mute_time) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ timeConvert(data.time_to_answer) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TimeDataTableCard",
  props: {
    tableHead: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    timeConvert(n) {
      var sec_num = parseInt(n, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
  },
};
</script>

<style></style>
