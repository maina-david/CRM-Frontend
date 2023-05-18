<template>
  <main>
    <div class="m-10">
      <div class="flex justify-between border-b">
        <div>
          <h2 class="font-bold text-xl p-3">My Tickets</h2>
        </div>
        <div v-if="handleGuardCreateTicket() == true">
          <ActionButton
            @click="
              getActiveTicketForm(),
                (showCreateTicketModal = !showCreateTicketModal)
            "
            text="Create Ticket"
          />
        </div>
      </div>
      <div class="bg-white p-1 mt-5">
        <TicketTable
          :tableHead="ticketTableHead"
          :tableData="ticketTableData"
        />
      </div>
      <CreateTicketModal :show="showCreateTicketModal" />
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateTicketModal from "@/components/modals/CRMModals/CreateTicketModal.vue";
import TicketTable from "@/components/tables/CRMTables/TicketTable.vue";
import { mapActions, mapGetters } from "vuex";
import accessRights from "@/componentGuard.js";

export default {
  watch: {
    userCreatedTickets() {
      this.ticketTableData = this.userCreatedTickets;
      console.log(
        "this is the current company tickets",
        this.userCreatedTickets
      );
    },
  },
  methods: {
    ...mapActions(["getUserCreatedTickets", "getActiveTicketForm"]),
    handleGuardCreateTicket() {
      return accessRights.createTicketUser();
    },
  },
  computed: {
    ...mapGetters(["userCreatedTickets"]),
  },
  created() {
    this.getUserCreatedTickets();
  },
  components: { ActionButton, CreateTicketModal, TicketTable },
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
