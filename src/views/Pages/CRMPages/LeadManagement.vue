<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between my-10">
        <div>
          <h2 class="font-bold text-xl p-3">Lead Management</h2>
        </div>
        <div class="flex gap-5 p-3 flex-row">
          <div>
            <router-link :to="{ name: 'LeadManagementCards' }">
              <ActionButton text="View Forms" />
            </router-link>
          </div>
          <div>
            <ActionButton
              text="Create Lead"
              @click="showCreateLeadModal = !showCreateLeadModal"
            />
          </div>
        </div>
      </div>
      <div class="bg-white p-2 mt-10">
        <AllLeadsTable :tableHead="leadTableHead" :tableData="leadTableData" />
      </div>
    </div>
    <CreateLeadModal :show="showCreateLeadModal" />
  </main>
</template>

<script>
import AllLeadsTable from "@/components/tables/CRMTables/AllLeadsTable.vue";
import CreateLeadModal from "@/components/modals/CRMModals/CreateLeadModal.vue";
import ActionButton from "@/components/ActionButton.vue";
import { ref } from "vue";
export default {
  components: { AllLeadsTable, ActionButton, CreateLeadModal },
  data() {
    return {
      leadTableHead: [
        "lead number",
        "created by",
        "created on",
        "updated at",
        "Sales Process Level",
        "assigned_to",
        "actions",
      ],
      leadTableData: [
        {
          lead_number: "RDG-345679",
          created_by: "Jane Doe",
          created_on: "2022-11-09T06:27:50.000000Z",
          updated_at: "2022-12-09T06:27:50.000000Z",
          sales_process_level: "Lead Stage",
          assigned_to: "Jane Doe",
        },
        {
          lead_number: "KGG-123456",
          created_by: "John Doe",
          created_on: "2022-12-18T06:27:50.000000Z",
          updated_at: "2022-12-19T06:27:50.000000Z",
          sales_process_level: "Demonstration Stage",
          assigned_to: "Jane Doe",
        },
        {
          lead_number: "RDG-345679",
          created_by: "Jane Doe",
          created_on: "2022-11-09T06:27:50.000000Z",
          updated_at: "2022-12-09T06:27:50.000000Z",
          sales_process_level: "Lead Stage",
          assigned_to: "Jane Doe",
        },
        {
          lead_number: "KGG-123456",
          created_by: "John Doe",
          created_on: "2022-12-18T06:27:50.000000Z",
          updated_at: "2022-12-19T06:27:50.000000Z",
          sales_process_level: "Quotation Stage",
          assigned_to: "Jane Doe",
        },
      ],
    };
  },
  setup() {
    const showCreateTeamModal = ref(false);
    const showCreateLeadModal = ref(false);

    return {
      showCreateTeamModal,
      showCreateLeadModal,
    };
  },
};
</script>

<style></style>
