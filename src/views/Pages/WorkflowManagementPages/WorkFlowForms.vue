<template>
  <main>
    <div class="m-10">
      <div class="flex justify-between border-b pb-2">
        <div class="font-semibold">Workflow Forms</div>
        <div>
          <ActionButton
            @click="showCreateFormModal = !showCreateFormModal"
            text="Create Workflow Form"
          />
        </div>
      </div>
      <div class="mt-10 grid grid-cols-4 gap-4">
        <div v-for="form in workflowForms" :key="form">
          <FormCard :form="form" />
        </div>
      </div>
    </div>
    <CreateWorkflowForm :show="showCreateFormModal" />
  </main>
</template>

<script>
import { ref } from "vue";
import FormCard from "@/components/cards/WorkflowCards/FormCard.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateWorkflowForm from "@/components/modals/WorkflowManagementModals/CreateWorkflowForm.vue";

export default {
  components: {
    FormCard,
    ActionButton,
    CreateWorkflowForm,
  },
  data() {
    return {
      state: "",
      workflowForms: [
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
    const showCreateFormModal = ref(false);

    return {
      showCreateFormModal,
    };
  },
};
</script>

<style></style>
