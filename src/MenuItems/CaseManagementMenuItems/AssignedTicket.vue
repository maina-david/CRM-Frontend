<template>
  <div class="mt-8 bg-white p-3">
    <div class="flex justify-between border-b p-3">
      <div>
        <h2 class="font-bold text-xl p-3">Assigned Tickets</h2>
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
        <AssignedTicketsTable
          :tableHead="ticketTableHead"
          :tableData="ticketTableData"
        />
      </div>
      <CreateTicketModal :show="showCreateTicketModal" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CreateTicketModal from "@/components/modals/CRMModals/CreateTicketModal.vue";
import AssignedTicketsTable from "@/components/tables/CaseManagementTables/AssignedTicketsTable.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  created() {
    this.getAssignedTickets();
  },
  watch: {
    assignedTickets() {
      this.ticketTableData = this.assignedTickets;
      console.log("this is the current assigned tickets", this.ticketTableData);
    },
  },
  methods: {
    ...mapActions(["getAssignedTickets"]),
  },
  computed: {
    ...mapGetters(["assignedTickets"]),
  },
  components: { CreateTicketModal, AssignedTicketsTable },
  data() {
    return {
      ticketTableHead: [
        "Ticket Number",
        "Created By",
        "Created On",
        "Last Updated",
        "priority",
        "status",
        "channel",
        "assigned to",
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
