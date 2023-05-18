<template>
  <div class="bg-slate-50 p-4" v-if="show_call_logs == true">
    <div>
      <h3 class="text-sm font-semibold text-gray-700 my-3 text-left">
        Recent Call Logs
      </h3>
    </div>
    <div v-for="call in currentCallDetails.call_log" :key="call.call_id">
      <div class="p-2 text-xs my-2">
        <div class="flex justify-between">
          <h3 class="font-semibold">{{ format_time(call.created_at) }}</h3>
          <h3
            v-if="call.call_status == 'ANSWERED'"
            class="p-0.5 bg-green-100 text-green-600"
          >
            {{ call.call_status }}
          </h3>
          <h3
            v-if="call.call_status == 'ABANDONED'"
            class="p-0.5 bg-red-100 text-red-600"
          >
            {{ call.call_status }}
          </h3>
          <h3
            v-if="call.call_status == 'RINGAGENT'"
            class="p-0.5 bg-green-100 text-green-600"
          >
            ONGOING
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  created() {
    if (this.currentCallDetails === "") {
      console.log("i am empty");
    } else {
      this.tickets = this.currentCallDetails.call_log;
      this.show_call_logs = true;
      console.log(
        "i am getting account details on created",
        this.currentCallDetails.call_log
      );
    }
  },
  computed: {
    ...mapGetters(["currentCallDetails"]),
  },
  watch: {
    currentCallDetails() {
      this.callLogs = this.currentCallDetails.call_log;
      this.show_call_logs = true;
      console.log(
        "i am getting account details on watch",
        this.currentCallDetails
      );
    },
  },
  methods: {
    format_time(data) {
      var moment_date = moment(data).format("YYYY-MM-DD, h:mm:ss a");
      return moment(moment_date).startOf("minute").fromNow();
    },
  },
  data() {
    return {
      show_call_logs: false,
      callLogs: [
        {
          answered_by: "Emmanuel Simiyu",
          status: "Answered",
          date: "23rd September 2022",
          time: "00:02:56",
        },
        {
          answered_by: "Emmanuel Simiyu",
          status: "Abandoned",
          date: "23rd September 2022",
        },
        {
          answered_by: "Emmanuel Simiyu",
          status: "Answered",
          date: "23rd September 2022",
          time: "00:00:45",
        },
        {
          answered_by: "Emmanuel Simiyu",
          status: "Answered",
          date: "23rd September 2022",
          time: "00:02:56",
        },
        {
          answered_by: "#345",
          status: "Abandoned",
          date: "23rd September 2022",
        },
      ],
    };
  },
};
</script>

<style></style>
