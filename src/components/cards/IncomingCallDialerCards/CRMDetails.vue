<template>
  <div class="bg-slate-50 p-4">
    <div class="flex justify-between my-3">
      <div>
        <h3 class="text-sm font-semibold text-gray-700 text-left">
          Account Details
        </h3>
      </div>
      <div
        v-if="show_account_details == true"
        @click="showCreateAccountModal = !showCreateAccountModal"
      >
        <span
          class="material-icons text-sm py-0.5 px-1 rounded-full bg-slate-300"
          >edit</span
        >
      </div>
    </div>
    <div class="mt-1 text-xs" v-if="show_account_details == true">
      <div v-for="(value, key) in accountDetails.account_items" :key="key">
        <div class="">
          <div class="p-1 bg-slate-50 flex">
            <h3 class="text-xs font-semibold my-2">{{ key }} :</h3>
            <h4 class="text-xs font-medium my-2">
              {{ value }}
            </h4>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-gray-700 text-left mt-4">
          Contacts
        </h3>
      </div>
      <div v-if="show_account_details == true">
        <div v-for="(value, key) in accountDetails.contact_items" :key="key">
          <div class="">
            <div class="p-1 bg-slate-50 flex" v-if="key !== 'contact_id'">
              <h3 class="text-xs font-semibold my-2">{{ key }}</h3>
              <h4 class="text-xs font-medium my-2">
                {{ value }}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <ActionButton
        text="Create Contact"
        @click="showCreateContactModal = !showCreateContactModal"
      />
    </div>
    <div v-else>
      <ActionButton
        text="Create Account"
        @click="showCreateAccountModal = !showCreateAccountModal"
      />
    </div>
  </div>
  <CreateAccountModal :show="showCreateAccountModal" />
  <CreateContactModal :show="showCreateContactModal" />
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import { ref } from "vue";
import CreateAccountModal from "@/components/modals/CRMModals/CreateAccountModal.vue";
import CreateContactModal from "@/components/modals/CRMModals/CreateContactModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["storeCallDetailsContact", "storeCallDetailsAccount"]),
  },
  created() {
    if (this.currentCallDetails === "") {
      console.log("i am empty");
    } else {
      if (this.currentCallDetails.formated_account) {
        this.accountDetails.account_items =
          this.currentCallDetails.formated_account;
        this.storeCallDetailsAccount(this.currentCallDetails.account.id);
      }

      if (this.currentCallDetails.formated_contact) {
        this.accountDetails.contact_items =
          this.currentCallDetails.formated_contact;
        this.storeCallDetailsContact(this.currentCallDetails.contact.id);
        this.show_account_details = true;
        console.log(
          "i am getting account details on created",
          this.currentCallDetails
        );
      }
    }
  },
  watch: {
    currentCallDetails() {
      this.accountDetails.account_items =
        this.currentCallDetails.formated_account;
      this.storeCallDetailsAccount(this.currentCallDetails.account.id);
      this.accountDetails.contact_items =
        this.currentCallDetails.formated_contact;
      this.storeCallDetailsContact(
        this.currentCallDetails.formated_contact.contact_id
      );
      this.show_account_details = true;
      console.log(
        "i am getting account details on watch",
        this.currentCallDetails
      );
    },
  },
  computed: {
    ...mapGetters(["currentCallDetails"]),
  },
  data() {
    return {
      show_account_details: false,
      accountDetails: {
        account_items: [],
        contact_items: {},
      },
    };
  },
  setup() {
    const showCreateAccountModal = ref(false);
    const showCreateContactModal = ref(false);
    return {
      showCreateAccountModal,
      showCreateContactModal,
    };
  },
  components: { ActionButton, CreateAccountModal, CreateContactModal },
};
</script>

<style></style>
