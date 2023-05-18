<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Case Management Settings</h2>
      </div>
      <div class="grid grid-cols-4 gap-4 mt-10">
        <div class="col-span-1">
          <CompanyInformationCard />
        </div>
        <div class="col-span-3">
          <TicketReminderConfiguration />
          <TicketPriorityConfiguration />
          <!--HelpDeskConfiguration /-->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CompanyInformationCard from "@/components/cards/ContactCenterCards/CompanyInformationCard.vue";
import TicketReminderConfiguration from "@/components/CRMConfigurationsCard/TicketReminderConfiguration.vue";
import TicketPriorityConfiguration from "@/components/CRMConfigurationsCard/TicketPriorityConfiguration.vue";
//import HelpDeskConfiguration from "@/components/CRMConfigurationsCard/HelpDeskConfiguration.vue";

export default {
  components: {
    CompanyInformationCard,
    TicketReminderConfiguration,
    TicketPriorityConfiguration,
  },
};
</script>

<style></style>
