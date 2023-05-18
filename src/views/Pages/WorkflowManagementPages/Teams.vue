<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Teams</h2>
        </div>
        <div>
          <div class="">
            <ActionButton
              @click="showCreateTeamModal = !showCreateTeamModal"
              text="Create Team"
            />
          </div>
        </div>
      </div>
      <div>
        <TeamTable :tableHead="teamTableHead" :tableData="teamTableData" />
      </div>
    </div>
    <CreateTeamModal :show="showCreateTeamModal" />
  </main>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import CreateTeamModal from "@/components/modals/WorkflowManagementModals/CreateTeamModal.vue";
import TeamTable from "@/components/tables/WorkflowTables/TeamTable.vue";
import { ref } from "vue";
export default {
  components: { ActionButton, TeamTable, CreateTeamModal },
  data() {
    return {
      teamTableHead: ["name", "description", "actions"],
      teamTableData: [{ name: "Team 1", description: "Team 1 Description" }],
    };
  },
  setup() {
    const showCreateTeamModal = ref(false);

    return {
      showCreateTeamModal,
    };
  },
};
</script>

<style></style>
