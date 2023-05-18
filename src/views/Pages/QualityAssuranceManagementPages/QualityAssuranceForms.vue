<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Quality Assurance Forms</h2>
        </div>
        <div>
          <div class="">
            <ActionButton
              @click="handleCreateQualityAssuranceForm('Create', {})"
              text="Create QA Form"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="mt-10 grid grid-cols-4 gap-4">
          <div v-for="form in qualityAssuranceForm" :key="form.id">
            <FormCard :form="form" />
          </div>
        </div>
      </div>
    </div>
    <CreateQAFormModal
      :show="showCreateModal"
      :state="state"
      :currentQualityAssuranceForm="currentQualityAssuranceForm"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import CreateQAFormModal from "@/components/modals/QAModals/CreateQAFormModal.vue";
import FormCard from "@/components/cards/QACards/FormCards.vue";

export default {
  components: { ActionButton, CreateQAFormModal, FormCard },
  data() {
    return {
      state: "",
      currentQualityAssuranceForm: {},
      qAForms: [
        {
          name: "Form 1",
          description: "Description for Form 1",
          form_items: [],
        },
        {
          name: "Form 2",
          description: "Description for Form 2",
          form_items: [],
        },
      ],
    };
  },
  setup() {
    const showCreateModal = ref(false);

    return {
      showCreateModal,
    };
  },
  created() {
    this.getQualityAssuranceForm();
  },
  methods: {
    ...mapActions(["getQualityAssuranceForm"]),
    handleCreateQualityAssuranceForm(state, data) {
      this.state = state;
      this.currentQualityAssuranceForm = data;
      this.showCreateModal = !this.showCreateModal;
    },
  },
  computed: {
    ...mapGetters(["qualityAssuranceForm"]),
  },
};
</script>

<style></style>
