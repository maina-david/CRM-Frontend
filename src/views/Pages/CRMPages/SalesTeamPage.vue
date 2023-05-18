<template>
  <main>
    <div class="m-10">
      <div class="flex justify-between border-b">
        <div>
          <h2 class="font-bold text-xl p-3">Sales Team Management</h2>
        </div>
        <div>
          <ActionButton
            @click="handleCreateHelpDeskTeam({}, 'Create')"
            text="Create Sales Team"
          />
        </div>
      </div>
      <div class="bg-white p-2 mt-5">
        <SalesTeamTable
          :tableHead="salesTeamTableHead"
          :tableData="salesTeamData"
        />
      </div>
    </div>
    <CreateSalesTeam
      :currentHelpDesk="currentHelpDesk"
      :state="state"
      :show="showCreateHelpDeskTeam"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import SalesTeamTable from "@/components/tables/CRMTables/SalesTeamTable.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateSalesTeam from "@/components/modals/CRMModals/CreateSalesTeamModal.vue";

export default {
  components: { SalesTeamTable, ActionButton, CreateSalesTeam },
  data() {
    return {
      currentHelpDesk: {},
      state: "",
      salesTeamTableHead: ["name", "description", "status", "actions"],
      salesTeamData: [
        {
          name: "Jane Doe",
          description: "Jane Doe's Sales team Are Here",
          active: 0,
        },
      ],
    };
  },
  setup() {
    const showCreateSalesTeam = ref(false);

    return {
      showCreateSalesTeam,
    };
  },

  methods: {
    handleCreateHelpDeskTeam(data, state) {
      this.state = state;
      this.currentHelpDesk = data;
      this.showCreateHelpDeskTeam = !this.showCreateHelpDeskTeam;
    },
  },
};
</script>

<style></style>
