<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Lead Management Forms</h2>
        </div>
        <div>
          <div class="p-3">
            <ActionButton
              @click="showCreateModal = !showCreateModal"
              text="Create Lead Management Form"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="mt-10 grid grid-cols-4 gap-4">
          <div v-for="form in leadForms" :key="form.id">
            <FormCard :form="form" />
          </div>
        </div>
      </div>
    </div>
    <CreateLeadForm :show="showCreateModal" :state="state" />
  </main>
</template>

<script>
import { ref } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateLeadForm from "@/components/modals/CRMModals/CreateLeadForm.vue";
import FormCard from "@/components/cards/CRMCards/LeadFormCard.vue";

export default {
  components: { ActionButton, CreateLeadForm, FormCard },
  data() {
    return {
      state: "",
      currentQualityAssuranceForm: {},
      leadForms: [
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
};
</script>

<style></style>
