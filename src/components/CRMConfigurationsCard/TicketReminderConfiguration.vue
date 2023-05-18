<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b flex p-3 justify-between">
      <div class="">
        <h2 class="font-semibold">Ticket Reminder Types</h2>
      </div>
      <div class="inline-flex gap-3 mb-4">
        <ActionButton
          @click="handleCreateTicketReminder"
          text="Create Reminder Types"
        />
      </div>
    </div>
    <div v-for="reminder in ticketReminder" :key="reminder.id">
      <TicketReminderType :reminder="reminder" />
    </div>
    <CreateTypeOfTicketReminder :show="showCreateTypeOfReminder" />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import CreateTypeOfTicketReminder from "../modals/CRMModals/CreateTypeOfTicketReminder.vue";
import TicketReminderType from "./TicketReminderType.vue";
export default {
  components: {
    ActionButton,
    CreateTypeOfTicketReminder,
    TicketReminderType,
  },
  data() {
    return {};
  },
  setup() {
    const showCreateTypeOfReminder = ref(false);

    return {
      showCreateTypeOfReminder,
    };
  },
  created() {
    this.getTicketReminder();
  },
  methods: {
    ...mapActions(["getTicketReminder"]),
    handleCreateTicketReminder() {
      this.showCreateTypeOfReminder = !this.showCreateTypeOfReminder;
    },
  },
  computed: {
    ...mapGetters(["ticketReminder"]),
  },
};
</script>

<style></style>
