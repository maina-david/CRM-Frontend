<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">My Workflows</h2>
        </div>
      </div>
      <div>
        <MyWorkflowTable
          :tableHead="workflowTableHead"
          :tableData="workflowTableData"
        />
      </div>
    </div>
  </main>
</template>

<script>
import MyWorkflowTable from "@/components/tables/WorkflowTables/MyWorkflowTable.vue";

import { ref } from "vue";
export default {
  components: {
    MyWorkflowTable,
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
