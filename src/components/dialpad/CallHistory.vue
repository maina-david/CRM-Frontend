<template>
  <div>
    <table class="table" v-if="showTable == true">
      <thead>
        <tr>
          <th></th>
          <th>Phone Number</th>
          <th>Time</th>
          <th>Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="call in getCallHistoryData"
          :key="call.id"
          @click="callOut(call.phone)"
        >
          <td>
            <span
              v-if="call.direction === 'outgoing'"
              class="material-icons text-blue-700"
              >call_made</span
            >
            <span
              v-if="call.direction === 'incoming' && call.status !== 'missed'"
              class="material-icons text-green-700"
              >call_received</span
            >
            <span
              v-if="call.status === 'missed'"
              class="material-icons text-red-500"
              >call_missed_outgoing</span
            >
          </td>
          <td>{{ call.phone }}</td>
          <td>{{ formatdate(call.start_time) }}</td>
          <td>{{ format_time(call.duration) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>No Data To Display</div>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  watch: {
    getCallHistoryData(val) {
      if (val) {
        this.showTable = true;
      } else {
        this.showTable = false;
      }
    },
  },
  created() {
    console.log(" i am executing call history");
    this.getCallHistory();
  },
  computed: {
    ...mapGetters(["getCallHistoryData"]),
  },
  methods: {
    ...mapActions(["callFromHistory", "getCallHistory"]),
    formatdate(data) {
      var moment_date = moment(data).format("YYYY-MM-DD, h:mm:ss a");
      return moment(moment_date).startOf("minute").fromNow();
    },
    format_time(s) {
      var seconds = s; // or "2000"
      seconds = parseInt(seconds); //because moment js dont know to handle number in string format
      var format =
        Math.floor(moment.duration(seconds, "seconds").asHours()) +
        ":" +
        moment.duration(seconds, "seconds").minutes() +
        ":" +
        moment.duration(seconds, "seconds").seconds();
      return format;
    },
    callOut(number) {
      console.log("calling_number", number);
      this.callFromHistory(number);
    },
  },
  data() {
    return {
      showTable: false,
      callHistory: [
        {
          id: 1,
          direction: "outgoing",
          phoneNumber: "0716597086",
          startTime: "2022-12-01T12:00:00.000Z",
          endTime: "2022-12-01T12:30:00.000Z",
          duration: "30",
          status: "completed",
        },
        {
          id: 2,
          direction: "incoming",
          phoneNumber: "14155552222",
          startTime: "2022-12-02T09:00:00.000Z",
          endTime: "2022-12-02T09:15:00.000Z",
          duration: "15",
          status: "missed",
        },
        {
          id: 3,
          direction: "outgoing",
          phoneNumber: "+14155551111",
          startTime: "2022-12-03T14:00:00.000Z",
          endTime: "2022-12-03T14:45:00.000Z",
          duration: "45",
          status: "completed",
        },
      ],
    };
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

/* th {
  background-color: #f8f9fa;
} */

/* tr:nth-child(even) {
  background-color: #f2f2f2;
} */

tr.missed td {
  background-color: #ffcdd2;
}

tr.completed td {
  background-color: #c8e6c9;
}
</style>
