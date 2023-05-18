<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Ticket Setup</h2>
        </div>
        <div>
          <ActionButton
            @click="handleCreateTicketForm({}, 'Create')"
            text="Create Ticket Creation Form"
          />
        </div>
      </div>
      <div class="mt-10 grid grid-cols-4 gap-4">
        <div v-for="form in ticketForm" :key="form.id">
          <CreatedTicketCard :form="form" />
        </div>
      </div>
    </div>
    <CreateTicketCreationForm
      :state="state"
      :currentTicketForm="currentTicketForm"
      :show="showCreateTicketCreationModal"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import CreateTicketCreationForm from "@/components/modals/CRMModals/CreateTicketCreationForm.vue";
import CreatedTicketCard from "@/components/cards/CRMCards/CreatedTicketCard.vue";

export default {
  components: { ActionButton, CreateTicketCreationForm, CreatedTicketCard },
  data() {
    return {
      state: "",
      currentTicketForm: {},
    };
  },
  setup() {
    const showCreateTicketCreationModal = ref(false);

    return {
      showCreateTicketCreationModal,
    };
  },
  created() {
    this.getTicketForm();
  },
  methods: {
    ...mapActions(["getTicketForm"]),
    handleCreateTicketForm(data, state) {
      this.state = state;
      this.currentTicketForm = data;
      this.showCreateTicketCreationModal = !this.showCreateTicketCreationModal;
    },
  },
  computed: {
    ...mapGetters(["ticketForm"]),
  },
};
</script>

<style></style>
