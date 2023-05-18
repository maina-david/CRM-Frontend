<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Sales Process Management</h2>
        </div>
        <div>
          <ActionButton
            @click="showCreateSalesProcessModal = !showCreateSalesProcessModal"
            text="Create Sales Process"
          />
        </div>
      </div>
      <div class="mt-10 grid grid-cols-4 gap-4">
        <div v-for="form in salesProcessForm" :key="form.id">
          <SalesProcessCard :form="form" />
        </div>
      </div>
    </div>
    <CreateSalesProcess
      :state="state"
      :currentTicketForm="currentTicketForm"
      :show="showCreateSalesProcessModal"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateSalesProcess from "@/components/modals/CRMModals/CreateSalesProcess.vue";
import SalesProcessCard from "@/components/cards/CRMCards/SalesProcessCard.vue";

export default {
  components: { ActionButton, CreateSalesProcess, SalesProcessCard },
  data() {
    return {
      salesProcessForm: [
        {
          name: "Sales Process 1",
          description: "This is Sales Process 1 Description",
        },
        {
          name: "Sales Process 2",
          description: "This is Sales Process 2 Description",
        },
      ],
    };
  },
  setup() {
    const showCreateSalesProcessModal = ref(false);

    return {
      showCreateSalesProcessModal,
    };
  },
};
</script>

<style></style>
