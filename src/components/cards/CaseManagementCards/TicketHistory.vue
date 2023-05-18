<template>
  <div>
    <div class="border-b">
      <h5 class="mt-5 font-bold text-sm p-3">Ticket Details</h5>
    </div>
    <div class="mt-5">
      <div v-for="ticket in ticketDetail.escalation_history" :key="ticket">
        <div class="">
          <div class="p-3 bg-slate-50 m-2">
            <h3 class="text-sm text-gray-600 my-2">
              {{ format_time(ticket.changed_date) }} :
            </h3>
            <h4 class="text-sm font-medium my-2">
              This ticket was worked on by {{ ticket.changed_by }} at the
              {{ ticket.escalation_point }} escalation point and the
              {{ ticket.escalation_level }} escalation level.
              {{ ticket.changed_by }} filled in the following form.
            </h4>
            <div v-if="ticket.escation_entry.length > 0">
              <div class="border-b my-2">
                <h3 class="text-sm font-semibold my-2">
                  Previous Escalation Notes
                </h3>
              </div>
            </div>
            <div
              v-for="ticket_entry in ticket.escation_entry"
              :key="ticket_entry"
              class=""
            >
              <div v-for="(value, key) in ticket_entry" :key="key">
                <h3 class="text-sm font-semibold my-2">{{ key }} :</h3>
                <h5 class="text-sm my-2">{{ value }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  methods: {
    format_time(data) {
      var moment_date = moment(data).format("YYYY-MM-DD, h:mm:ss a");
      return moment(moment_date).startOf("minute").fromNow();
    },
  },
  computed: {
    ...mapGetters(["ticketDetail"]),
  },
  data() {
    return {
      ticketHistory: [
        { date: "23rd October 2022", action: "Ticket was created by Jane Doe" },
        {
          date: "27th October 2022",
          action: "Ticket was escalated by Jane Doe",
        },
      ],
    };
  },
};
</script>

<style></style>
