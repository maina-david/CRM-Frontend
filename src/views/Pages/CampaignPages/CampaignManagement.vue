<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Campaign Management</h2>
        </div>
        <div>
          <ActionButton
            @click="handleCreateCampaign('Create', {})"
            text="Create Campaign"
          />
        </div>
      </div>
      <div class="bg-white p-2 mt-10">
        <Campaigns :tableHead="campaignTableHead" :tableData="campaign" />
      </div>
    </div>
    <CreateCampaignModal
      :show="showCreateCampaignModal"
      :state="state"
      :currentCampaign="currentCampaign"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import Campaigns from "@/components/tables/CampaignTables/Campaigns.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateCampaignModal from "@/components/modals/CampaignModals/CreateCampaignModal.vue";
export default {
  data() {
    return {
      state: "",
      currentCampaign: {},
      campaignTableHead: [
        "name",
        "description",
        "campaign type",
        "groups",
        "status",
        "actions",
      ],
      campaignTableData: [
        {
          name: "Campaign 1",
          description: "Campaign 1 Description",
          campaign_type: "Voice",
          groups: [{ name: "Group 1" }, { name: "Group 2" }],
          status: "Active",
        },
      ],
    };
  },
  components: { Campaigns, ActionButton, CreateCampaignModal },
  setup() {
    const showCreateCampaignModal = ref(false);

    return {
      showCreateCampaignModal,
    };
  },
  created() {
    this.getCampaign();
  },
  methods: {
    ...mapActions(["getCampaign"]),
    handleCreateCampaign(state, data) {
      this.state = state;
      this.currentCampaign = data;
      this.showCreateCampaignModal = !this.showCreateCampaignModal;
    },
  },
  computed: {
    ...mapGetters(["campaign"]),
  },
};
</script>

<style></style>
