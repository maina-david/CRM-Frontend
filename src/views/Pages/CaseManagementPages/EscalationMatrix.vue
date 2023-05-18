<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Escalation Points Setup</h2>
        </div>
        <div>
          <ActionButton
            @click="handleCreateEscalationMatrix({}, 'Create')"
            text="Create Escalation Point"
          />
        </div>
      </div>
      <div class="bg-white p-2 mt-10">
        <EscalationMatrixTable
          :tableHead="escalationMatrixTableHead"
          :tableData="ticketEscalationPoint"
        />
      </div>
    </div>
    <CreateEscalationMatrix
      :show="showCreateEscalationMatrix"
      :state="state"
      :currentEscalationMatrix="currentEscalationMatrix"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import CreateEscalationMatrix from "@/components/modals/CaseManagementModals/CreateEscalationMatrix.vue";
import EscalationMatrixTable from "@/components/tables/CaseManagementTables/EscalationMatrixTable.vue";

export default {
  components: {
    ActionButton,
    CreateEscalationMatrix,
    EscalationMatrixTable,
  },
  data() {
    return {
      state: "",
      currentEscalationMatrix: {},
      escalationMatrixTableHead: ["name", "description", "levels", "actions"],
    };
  },
  setup() {
    const showCreateEscalationMatrix = ref(false);

    return {
      showCreateEscalationMatrix,
    };
  },
  created() {
    this.getTicketEscalationPoint();
  },
  methods: {
    ...mapActions(["getTicketEscalationPoint"]),
    handleCreateEscalationMatrix(data, state) {
      localStorage.setItem("current_escalation_point", data.id);
      this.state = state;
      this.currentEscalationMatrix = data;
      this.showCreateEscalationMatrix = !this.showCreateEscalationMatrix;
    },
  },
  computed: {
    ...mapGetters(["ticketEscalationPoint"]),
  },
};
</script>

<style></style>
