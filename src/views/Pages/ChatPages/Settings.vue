<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Chat Settings</h2>
      </div>
      <div class="grid grid-cols-4 gap-4 mt-10">
        <div class="col-span-1">
          <CompanyInformationCard />
        </div>
        <div class="col-span-3">
          <CRMConfiguration />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CompanyInformationCard from "@/components/cards/ContactCenterCards/CompanyInformationCard.vue";
import CRMConfiguration from "@/components/CRMConfigurationsCard/CRMConfiguration.vue";

export default {
  name: "ChatSettings",
  components: { CompanyInformationCard, CRMConfiguration },
};
</script>

<style></style>
