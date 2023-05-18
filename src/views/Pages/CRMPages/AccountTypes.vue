<template>
  <main>
    <div class="m-10">
      <div class="my-5 flex justify-between border-b">
        <div class="">
          <h2 class="font-bold text-xl p-3">Account Types</h2>
        </div>
        <div class="inline-flex gap-3 mb-4">
          <router-link :to="{ name: 'Forms' }">
            <ActionButton text="View All Forms" />
          </router-link>
          <ActionButton
            @click="handleCreateAccountType({}, 'Create')"
            text="Create Account Type"
          />
        </div>
      </div>
      <div class="">
        <div class="bg-white rounded-sm shadow-sm p-4">
          <AccountTypeTable
            :tableData="accountTypes"
            :tableHead="accountTypeTableHead"
          />
        </div>
      </div>
      <CreateAccountType
        :show="showCreateAccountTypeModal"
        :currentAccountType="currentAccountType"
        :state="state"
      />
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import CreateAccountType from "@/components/modals/CRMModals/CreateAccountType.vue";
import ActionButton from "@/components/ActionButton.vue";
import AccountTypeTable from "@/components/tables/CRMTables/AccountTypeTable.vue";

export default {
  name: "AccountTypes",
  components: {
    ActionButton,
    CreateAccountType,
    AccountTypeTable,
  },
  data() {
    return {
      currentAccountType: "",
      state: "",
      accountTypeTableHead: [
        "name",
        "description",
        "Accounts",
        "Attached Account Form",
        "Contacts",
        "Attached Contact Form",
        "groups",
        "Account Number",
        "status",
        "Actions",
      ],
    };
  },
  setup() {
    const showCreateAccountTypeModal = ref(false);

    return {
      showCreateAccountTypeModal,
    };
  },
  created() {
    this.getAccountTypes();
  },
  methods: {
    ...mapActions(["getAccountTypes"]),
    handleCreateAccountType(data, state) {
      this.currentAccountType = data;
      this.state = state;
      this.showCreateAccountTypeModal = !this.showCreateAccountTypeModal;
    },
  },
  computed: {
    ...mapGetters(["accountTypes"]),
  },
};
</script>

<style></style>
