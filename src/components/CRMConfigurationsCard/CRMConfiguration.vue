<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b flex p-3 justify-between">
      <div class="">
        <h2 class="font-semibold">CRM Configurations</h2>
      </div>
      <div class="inline-flex gap-3 mb-4">
        <ActionButton
          @click="showCreateAccountNumberModal = !showCreateAccountNumberModal"
          text="Create Account Number"
        />
      </div>
    </div>
    <div v-for="number in accountNumbers" :key="number.id">
      <AccountNumberSetup :number="number" />
    </div>
    <CreateAccountNumber :show="showCreateAccountNumberModal" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateAccountNumber from "@/components/modals/CRMModals/CreateAccountNumber.vue";
import AccountNumberSetup from "@/components/CRMConfigurationsCard/AccountNumberSetup.vue";

export default {
  components: { ActionButton, AccountNumberSetup, CreateAccountNumber },

  setup() {
    const showCreateAccountNumberModal = ref(false);

    return {
      showCreateAccountNumberModal,
    };
  },
  created() {
    this.getAccountNumbers();
  },
  methods: {
    ...mapActions(["getAccountNumbers"]),
  },
  computed: {
    ...mapGetters(["accountNumbers"]),
  },
};
</script>

<style></style>
