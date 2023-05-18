<template>
  <div class="mt-8 bg-white p-3">
    <div class="flex justify-between border-b p-3">
      <div>
        <h2 class="font-bold text-xl">All Tickets</h2>
      </div>
      <div v-if="handleGuard(createTicketUser)">
        <ActionButton
          @click="showCreateTicketModal = !showCreateTicketModal"
          text="Create Ticket"
        />
      </div>
    </div>
    <div class="bg-white p-2">
      <!--div class="mt-5">
        <Dropdown
          select="Select Ticket Form"
          :options="options"
          v-model="ticketForm"
          label="Select the Ticket Form You want to view"
        />
      </!--div-->
      <div class="bg-white p-1 mt-2">
        <AllTicketsTable
          :tableHead="ticketTableHead"
          :tableData="ticketTableData"
        />
      </div>
      <CreateTicketModal :show="showCreateTicketModal" />
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import { ref } from "vue";
import CreateTicketModal from "@/components/modals/CRMModals/CreateTicketModal.vue";
import AllTicketsTable from "@/components/tables/CaseManagementTables/AllTicketsTable.vue";
import { mapActions, mapGetters } from "vuex";
import Guard from "@/componentGuard.js";

export default {
  created() {
    this.getCompanyTickets();
  },
  watch: {
    companyTickets() {
      this.ticketTableData = this.companyTickets;
      console.log("this is the current company tickets", this.ticketTableData);
    },
  },
  methods: {
    ...mapActions(["getCompanyTickets"]),
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
  },
  computed: {
    ...mapGetters(["companyTickets"]),
  },
  components: { ActionButton, CreateTicketModal, AllTicketsTable },
  data() {
    return {
      createTicketUser: "Ticket Create User",
      ticketEscalation: "Ticket Escalation Manager",
      ticketFormManager: "Ticket Form Manager",
      ticketUser: "Ticket User",
      myState: false,
      ticketTableHead: [
        "Ticket Number",
        "Created By",
        "Created On",
        "Last Updated",
        "priority",
        "status",
        "channel",
        "Assigned To",
        "action",
      ],
      ticketTableData: [],
      ticketForm: "",
      options: [
        { label: "Ticket 1", value: "1" },
        { label: "Ticket 2", value: "2" },
        { label: "Ticket 3", value: "3" },
        { label: "Ticket 4", value: "4" },
        { label: "Ticket 5", value: "5" },
      ],
    };
  },
  setup() {
    const showCreateTicketModal = ref(false);

    return {
      showCreateTicketModal,
    };
  },
};
</script>

<style></style>
