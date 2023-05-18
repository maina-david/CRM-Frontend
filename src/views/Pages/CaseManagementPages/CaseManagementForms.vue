<template>
  <main>
    <div class="m-10">
      <div class="flex justify-between border-b pb-2">
        <div class="font-semibold">Escalation Forms</div>
        <div>
          <ActionButton
            @click="showCreateFormModal = !showCreateFormModal"
            text="Create Escalation Form"
          />
        </div>
      </div>
      <div v-if="show_forms === true" class="mt-10 grid grid-cols-4 gap-4">
        <div v-for="form in escalationForms" :key="form">
          <FormCard v-if="form.type === 'HELPDESK'" :form="form" />
        </div>
      </div>
    </div>
    <CreateEscalationForm :show="showCreateFormModal" />
  </main>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import FormCard from "@/components/cards/CaseManagementCards/CaseManagementCards.vue";
import CreateEscalationForm from "@/components/modals/CaseManagementModals/CreateEscalationForm.vue";
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";

export default {
  watch: {
    CENTRALForms() {
      console.log("changed ticket form", this.activateTicketForm);
      if (this.CENTRALForms) {
        console.log("I am empty");
        this.escalationForms = this.CENTRALForms;
        this.show_forms = true;
        console.log("This is the new ticket form data", this.escalationForms);
      }
    },
  },
  methods: {
    ...mapActions(["getCENTRALForms"]),
  },
  computed: {
    ...mapGetters(["CENTRALForms"]),
  },
  created() {
    this.getCENTRALForms();
  },
  components: { FormCard, ActionButton, CreateEscalationForm },
  data() {
    return {
      state: "",
      show_forms: false,
      currentContactForm: "",
      escalationForms: [],
    };
  },
  setup() {
    const showCreateFormModal = ref(false);

    return {
      showCreateFormModal,
    };
  },
};
</script>

<style></style>
