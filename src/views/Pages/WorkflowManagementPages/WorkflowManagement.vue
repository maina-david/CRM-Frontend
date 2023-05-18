<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Workflow Management</h2>
        </div>
        <div>
          <div class="">
            <ActionButton
              @click="showCreateWorkflow = !showCreateWorkflow"
              text="Create Workflow"
            />
          </div>
        </div>
      </div>
      <div>
        <WorkflowTables
          :tableHead="workflowTableHead"
          :tableData="workflowTableData"
        />
      </div>
    </div>
    <CreateWorkflowModal :show="showCreateWorkflow" />
  </main>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import CreateWorkflowModal from "@/components/modals/WorkflowManagementModals/CreateWorkflowModal.vue";
import WorkflowTables from "@/components/tables/WorkflowTables/WorkflowTables.vue";

import { ref } from "vue";
export default {
  components: {
    ActionButton,
    CreateWorkflowModal,
    WorkflowTables,
  },
  data() {
    return {
      workflowTableHead: ["name", "description", "Actions"],
      workflowTableData: [
        {
          name: "Work Flow 1",
          description: "Work Flow 1 Description",
        },
      ],
    };
  },
  setup() {
    const showCreateWorkflow = ref(false);

    return {
      showCreateWorkflow,
    };
  },
};
</script>

<style></style>
