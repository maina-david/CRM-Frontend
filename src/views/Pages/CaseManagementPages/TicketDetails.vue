<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2
          v-if="show_ticket_detail == true"
          class="mt-10 font-bold text-xl p-3"
        >
          Ticket Number : {{ TicketDetailsData.ticket.ticket_number }}
        </h2>
      </div>
      <div class="grid grid-cols-6 gap-4 mt-5">
        <div class="col-span-3">
          <div class="bg-white p-2">
            <TicketDetailsCards />
          </div>
          <div class="bg-white p-2 mt-3">
            <TicketInteractionDetails />
          </div>
        </div>
        <div class="col-span-2">
          <div class="bg-white p-2">
            <TicketContactsCards />
          </div>
          <div class="bg-white mt-3 p-2">
            <TicketHistory />
          </div>
        </div>
        <div
          class="col-span-1"
          v-if="isEscalated && handleGuardTicketUser() == true"
        >
          <div class="bg-white p-2">
            <EscalationFormCard :forms="forms" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 mt-5"></div>
    </div>
  </main>
</template>

<script>
import TicketDetailsCards from "@/components/cards/CaseManagementCards/TicketDetailsCards.vue";
import TicketInteractionDetails from "@/components/cards/CaseManagementCards/TicketInteractionDetails.vue";
import TicketContactsCards from "@/components/cards/CaseManagementCards/TicketContactsCards.vue";
import TicketHistory from "@/components/cards/CaseManagementCards/TicketHistory.vue";
import EscalationFormCard from "@/components/cards/CaseManagementCards/EscalationFormCard.vue";
import { mapActions, mapGetters } from "vuex";
import accessRights from "@/componentGuard.js";

export default {
  created() {},
  watch: {
    ticketDetail() {
      this.TicketDetailsData = this.ticketDetail;
      console.log("I AM FETCHING DETAILS FROM WATCH", this.TicketDetailsData);
      this.show_ticket_detail = true;
    },
  },
  methods: {
    ...mapActions(["getTicketDetail"]),
    handleGuardTicketUser() {
      return accessRights.ticketUser();
    },
  },
  computed: {
    ...mapGetters(["ticketDetail", "currentTicket"]),
  },
  components: {
    TicketDetailsCards,
    TicketContactsCards,
    TicketHistory,
    EscalationFormCard,
    TicketInteractionDetails,
  },
  data() {
    return {
      TicketDetailsData: [],
      show_ticket_detail: false,
      isEscalated: true,
      forms: [
        {
          id: 3,
          data_type: "date",
          placeholder: "mm/dd/yyy",
          name: "Enter the Date",
        },
        {
          id: 1,
          data_type: "text",
          placeholder: "Reason for escalation",
          name: "Why did you escalate?",
        },
        {
          id: 2,
          data_type: "textarea",
          placeholder: "Explanation",
          name: "Explain your reason for escalation",
        },
      ],
    };
  },
};
</script>

<style></style>
