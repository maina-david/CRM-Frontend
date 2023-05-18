<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Settings</h2>
      </div>
      <div class="grid grid-cols-4 gap-4 mt-10">
        <div class="col-span-1">
          <CompanyInformationCard />
        </div>
        <div class="col-span-3">
          <ContactCenterConfiguration />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CompanyInformationCard from "@/components/cards/ContactCenterCards/CompanyInformationCard.vue";
import { ref } from "vue";
import ContactCenterConfiguration from "@/components/CompanyConfigurationsCard/ContactCenterConfiguration.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Settings",
  components: {
    CompanyInformationCard,
    ContactCenterConfiguration,
  },
  data() {
    return {};
  },
  setup() {
    const showDialerModal = ref(false);
    return {
      showDialerModal,
    };
  },
};
</script>
