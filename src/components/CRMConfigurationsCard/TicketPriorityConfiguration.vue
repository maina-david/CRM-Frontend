<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b flex p-3 justify-between">
      <div class="">
        <h2 class="font-semibold">Ticket Priority Configuration</h2>
      </div>
      <div class="inline-flex gap-3 mb-4">
        <ActionButton
          @click="handleTicketPriorityConfiguration"
          text="Create Priority"
        />
      </div>
    </div>
    <div v-for="priority in ticketPriority" :key="priority.id">
      <TicketPriorities :priority="priority" />
    </div>
    <CreateTicketPriority :show="showCreateTicketPriority" />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import TicketPriorities from "./TicketPriorities.vue";
import CreateTicketPriority from "../modals/CRMModals/CreateTicketPriority.vue";

export default {
  components: {
    ActionButton,
    TicketPriorities,
    CreateTicketPriority,
  },
  data() {
    return {};
  },
  setup() {
    const showCreateTicketPriority = ref(false);

    return {
      showCreateTicketPriority,
    };
  },
  created() {
    this.getTicketPriority();
  },
  methods: {
    ...mapActions(["getTicketPriority"]),
    handleTicketPriorityConfiguration() {
      this.showCreateTicketPriority = !this.showCreateTicketPriority;
    },
  },
  computed: {
    ...mapGetters(["ticketPriority"]),
  },
};
</script>

<style></style>
