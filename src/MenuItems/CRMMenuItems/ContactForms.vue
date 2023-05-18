<template>
  <div class="m-10">
    <div class="flex justify-between border-b pb-2">
      <div class=""></div>
      <div>
        <ActionButton
          text="Create Contact Form"
          @click="handleCreateContactForm({}, 'Create')"
        />
      </div>
    </div>
    <div class="mt-10 grid grid-cols-4 gap-4">
      <div v-for="form in contactForms" :key="form.id">
        <FormCard :form="form" />
      </div>
    </div>
  </div>
  <CreateContactForm
    :show="showCreateFormModal"
    :currentContactForm="currentContactForm"
    :state="state"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import FormCard from "@/components/cards/CRMCards/ContactFormCard.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateContactForm from "@/components/modals/CRMModals/CreateContactForm.vue";

export default {
  components: { FormCard, ActionButton, CreateContactForm },
  data() {
    return {
      state: "",
      currentContactForm: "",
    };
  },
  setup() {
    const showCreateFormModal = ref(false);

    return {
      showCreateFormModal,
    };
  },
  created() {
    this.getContactForms();
  },
  methods: {
    ...mapActions(["getContactForms"]),
    handleCreateContactForm(data, state) {
      this.currentContactForm = data;
      this.state = state;
      this.showCreateFormModal = !this.showCreateFormModal;
    },
  },
  computed: {
    ...mapGetters(["contactForms"]),
  },
};
</script>

<style>
.tab-btn {
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 2px solid #cccccc;
  outline: none;
}
.selected {
  border-bottom: 3px solid #84cc16;
}
</style>
