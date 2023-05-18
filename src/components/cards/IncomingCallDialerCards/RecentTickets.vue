<template>
  <div class="bg-slate-100 p-3" v-if="show_tickets == true">
    <div>
      <h3 class="text-sm font-semibold text-gray-700 my-3 text-left">
        Recent Tickets
      </h3>
    </div>
    <div class="grid grid-cols-6 gap-4">
      <div class="col-span-2">
        <div v-for="ticket in tickets" :key="ticket.id">
          <div class="p-2 text-xs my-2 bg-white hover:bg-slate-50">
            <div class="flex justify-between">
              <h3 class="font-semibold">{{ ticket.ticket_number }}</h3>

              <h3
                v-if="ticket.status == 'RESOLVED'"
                class="p-0.5 bg-green-100 text-green-600"
              >
                {{ ticket.status }}
              </h3>
              <h3
                v-if="ticket.status == 'ESCALATED'"
                class="p-0.5 bg-orange-100 text-orange-600"
              >
                {{ ticket.status }}
              </h3>
              <h3
                v-if="ticket.status == 'PENDING'"
                class="p-0.5 bg-red-100 text-red-600"
              >
                {{ ticket.status }}
              </h3>
            </div>
            <h3 class="text-left mt-1">{{ format_time(ticket.created_at) }}</h3>
          </div>
        </div>
        <ActionButton
          :set="(set_ticket_channel = true)"
          text="Create Ticket"
          :channel="7"
          @click="showCreateTicketModal = !showCreateTicketModal"
        />
      </div>

      <div class="col-span-4">
        <div class="bg-white p-3">
          <div><TicketDetailsCards /></div>
        </div>
      </div>
    </div>
  </div>
  <CreateTicketModal :show="showCreateTicketModal" />
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import { ref } from "vue";
import { mapGetters } from "vuex";
import CreateTicketModal from "@/components/modals/CRMModals/CreateTicketModal.vue";
import TicketDetailsCards from "@/components/cards/CaseManagementCards/TicketDetailsCards.vue";
import moment from "moment";

export default {
  methods: {
    format_time(data) {
      var moment_date = moment(data).format("YYYY-MM-DD, h:mm:ss a");
      return moment(moment_date).startOf("minute").fromNow();
    },
  },
  watch: {
    currentCallDetails() {
      this.tickets = this.currentCallDetails.tickets;
      this.show_tickets = true;
      console.log(
        "i am getting account details on watch",
        this.currentCallDetails
      );
    },
    set_ticket_channel() {
      if (this.set_ticket_channel == true) {
        console.log("current ticket channel is set");
      }
    },
  },
  created() {
    if (this.currentCallDetails === "") {
      console.log("i am empty");
    } else {
      this.tickets = this.currentCallDetails.tickets;
      this.show_tickets = true;
      console.log(
        "i am getting account details on created",
        this.currentCallDetails.tickets
      );
    }
  },
  computed: {
    ...mapGetters(["currentCallDetails"]),
  },
  data() {
    return {
      show_tickets: false,
      set_ticket_channel: false,
      ticketNo: "",
      tickets: [
        { id: "#123", status: "Escalated", date: "23rd September 2022" },
        { id: "#569", status: "Closed", date: "23rd September 2022" },
        { id: "#487", status: "Open", date: "23rd September 2022" },
        { id: "#789", status: "Closed", date: "23rd September 2022" },
        { id: "#345", status: "Closed", date: "23rd September 2022" },
      ],
    };
  },
  setup() {
    const showCreateTicketModal = ref(false);
    return {
      showCreateTicketModal,
    };
  },
  components: { ActionButton, CreateTicketModal, TicketDetailsCards },
};
</script>

<style></style>
