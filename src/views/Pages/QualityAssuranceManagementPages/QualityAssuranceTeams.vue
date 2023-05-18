<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Quality Assurance Teams</h2>
        </div>
        <div class="flex gap-6">
          <div class="">
            <ActionButton
              @click="handleCreateQualityAssuranceTeam('Create', {})"
              text="Create QA Team"
            />
          </div>
        </div>
      </div>
      <div class="bg-white p-2 mt-10">
        <QATeamTable
          :tableHead="teamTableHead"
          :tableData="qualityAssuranceTeam"
        />
      </div>
    </div>
    <CreateTeamModal
      :show="showCreateTeamModal"
      :state="state"
      :currentQualityAssuranceTeam="currentQualityAssuranceTeam"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import CreateTeamModal from "@/components/modals/QAModals/CreateTeamModal.vue";
import QATeamTable from "@/components/tables/QAManagementTables/QATeamTable.vue";

export default {
  components: { ActionButton, CreateTeamModal, QATeamTable },
  data() {
    return {
      state: "",
      currentQualityAssuranceTeam: {},
      teamTableHead: [
        "name",
        "description",
        "Attached QA From",
        "supervisor",

        //"Interactions Per Week/Agent/Channel",
        //"Max Agents to per User",
        "actions",
      ],
    };
  },
  setup() {
    const showCreateTeamModal = ref(false);

    return {
      showCreateTeamModal,
    };
  },
  created() {
    this.getQualityAssuranceTeam();
  },
  methods: {
    ...mapActions(["getQualityAssuranceTeam"]),
    handleCreateQualityAssuranceTeam(state, data) {
      this.state = state;
      this.currentQualityAssuranceTeam = data;
      this.showCreateTeamModal = !this.showCreateTeamModal;
    },
  },
  computed: {
    ...mapGetters(["qualityAssuranceTeam"]),
  },
};
</script>

<style></style>
