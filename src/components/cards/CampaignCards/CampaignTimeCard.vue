<template>
  <div>
    <div class="border-b flex justify-between p-3">
      <div>
        <h2 class="font-semibold">Campaign Running Hours</h2>
      </div>
      <div>
        <ActionButton
          @click="handleCampaignConfiguration"
          text="Campaign Running Configurations"
        />
      </div>
    </div>
    <div>
      <div class="p-3 text-center" v-if="campaignWorkingHour.length == 0">
        <h3 class="m-3">You haven't setup any campaign hours</h3>
      </div>
      <div v-else>
        <div class="grid grid-cols-4 gap-2">
          <ViewCampaignHoursCard :campaignDays="campaignWorkingHour" />
        </div>
      </div>
    </div>
  </div>
  <CampaignRunningConfigurations
    :show="showModal"
    :currentCampaign="currentCampaign"
  />
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import CampaignRunningConfigurations from "@/components/modals/CampaignModals/CampaignRunningConfigurations.vue";
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ViewCampaignHoursCard from "./ViewCampaignHoursCard.vue";

const props = {
  currentCampaign: {
    type: Object,
    default: {},
  },
};
export default {
  components: {
    ActionButton,
    ViewCampaignHoursCard,
    CampaignRunningConfigurations,
  },
  props,
  data() {
    return {};
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  created() {
    this.getCampaignWorkingHour({
      campaign_id: this.currentCampaign.id,
    });
  },
  methods: {
    ...mapActions(["getCampaignWorkingHour"]),
    handleCampaignConfiguration() {
      this.showModal = !this.showModal;
    },
  },
  computed: {
    ...mapGetters(["campaignWorkingHour"]),
  },
};
</script>

<style></style>
