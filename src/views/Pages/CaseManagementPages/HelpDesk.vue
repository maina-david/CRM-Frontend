<template>
  <main>
    <div class="m-10">
      <div class="flex justify-between border-b">
        <div>
          <h2 class="font-bold text-xl p-3">Help Desk Management</h2>
        </div>
        <div>
          <ActionButton
            @click="handleCreateHelpDeskTeam({}, 'Create')"
            text="Create Help Desk Team"
          />
        </div>
      </div>
      <div class="bg-white p-2 mt-5">
        <HelpDeskTeam
          :tableHead="helpDeskTableHead"
          :tableData="helpDeskTeam"
        />
      </div>
    </div>
    <CreateHelpDeskTeam
      :currentHelpDesk="currentHelpDesk"
      :state="state"
      :show="showCreateHelpDeskTeam"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import HelpDeskTeam from "@/components/tables/CRMTables/HelpDeskTeam.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateHelpDeskTeam from "@/components/modals/CRMModals/CreateHelpDeskTeam.vue";

export default {
  components: { HelpDeskTeam, ActionButton, CreateHelpDeskTeam },
  data() {
    return {
      currentHelpDesk: {},
      state: "",
      helpDeskTableHead: ["name", "description", "status", "actions"],
    };
  },
  setup() {
    const showCreateHelpDeskTeam = ref(false);

    return {
      showCreateHelpDeskTeam,
    };
  },
  created() {
    this.getHelpDeskTeam();
  },
  computed: {
    ...mapGetters(["helpDeskTeam"]),
  },
  methods: {
    ...mapActions(["getHelpDeskTeam"]),
    handleCreateHelpDeskTeam(data, state) {
      this.state = state;
      this.currentHelpDesk = data;
      this.showCreateHelpDeskTeam = !this.showCreateHelpDeskTeam;
    },
  },
};
</script>

<style></style>
