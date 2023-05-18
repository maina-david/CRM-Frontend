<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">
            {{ currentCampaign.name }} Campaign Details
          </h2>
        </div>
        <div v-if="currentCampaign.campaign_type_id == 'AGENTLED'">
          <router-link :to="{ name: 'SurveyForms' }">
            <ActionButton text="View Survey Forms" />
          </router-link>
        </div>
      </div>
      <div>
        <div class="bg-white p-2 mt-10">
          <CampaignTimeCard :currentCampaign="currentCampaign" />
        </div>
        <div class="grid grid-cols-4 grid-flow-col gap-6 mt-10">
          <div class="col-span-1 gap-4">
            <div>
              <UploadContactsCard />
            </div>
            <div class="mt-4"><GetContactsfromAccounts /></div>
          </div>
          <div class="col-span-3">
            <div class="bg-white p-2">
              <CampaignContacts
                :tableHead="campaignContactsTableHead"
                :tableData="campaignContact"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UploadContactsCard from "@/components/cards/CampaignCards/UploadContactsCard.vue";
import ActionButton from "@/components/ActionButton.vue";
import GetContactsfromAccounts from "@/components/cards/CampaignCards/GetContactsfromAccounts.vue";
import CampaignContacts from "@/components/tables/CampaignTables/CampaignContacts.vue";
import CampaignTimeCard from "@/components/cards/CampaignCards/CampaignTimeCard.vue";

export default {
  data() {
    return {
      currentCampaign: {},
      campaignContactsTableHead: ["Name", "Phone Number", "Status", "Actions"],
    };
  },
  created() {
    this.currentCampaign = JSON.parse(localStorage.getItem("current_campaign"));
    this.getCampaignContact({
      campaign_id: this.currentCampaign.id,
    });
  },
  methods: {
    ...mapActions(["getCampaignContact"]),
  },
  computed: {
    ...mapGetters(["campaignContact"]),
  },
  components: {
    UploadContactsCard,
    GetContactsfromAccounts,
    CampaignContacts,
    CampaignTimeCard,
    ActionButton,
  },
};
</script>

<style></style>
