<template>
  <div class="m-10">
    <div class="flex justify-between border-b pb-2">
      <div class=""></div>
      <div>
        <ActionButton
          text="Create Account Form"
          @click="handleCreateAccountForm({}, 'Create')"
        />
      </div>
    </div>
    <div class="mt-10 grid grid-cols-4 gap-4">
      <div v-for="form in accountForms" :key="form.id">
        <FormCard :form="form" />
      </div>
    </div>
  </div>
  <CreateForm
    :show="showCreateFormModal"
    :currentAccountForm="currentAccountForm"
    :state="state"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import FormCard from "@/components/cards/CRMCards/AccountFormCard.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateForm from "@/components/modals/CRMModals/CreateForm.vue";

export default {
  components: { FormCard, ActionButton, CreateForm },
  data() {
    return {
      state: "",
      currentAccountForm: "",
    };
  },
  setup() {
    const showCreateFormModal = ref(false);

    return {
      showCreateFormModal,
    };
  },
  created() {
    this.getAccountForms();
  },
  methods: {
    ...mapActions(["getAccountForms"]),
    handleCreateAccountForm(data, state) {
      this.currentAccountForm = data;
      this.state = state;
      this.showCreateFormModal = !this.showCreateFormModal;
    },
  },
  computed: {
    ...mapGetters(["accountForms"]),
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
