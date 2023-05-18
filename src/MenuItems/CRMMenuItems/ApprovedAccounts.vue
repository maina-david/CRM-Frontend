<template>
  <div class="mt-10 m-4">
    <div class="grid grid-cols-4 grid-flow-col gap-2 mt-5">
      <div class="col-span-1 w-full">
        <div class="">
          <div class="bg-white max-w-xs w-full block rounded-sm shadow-sm p-2">
            <div class="mx-3 filter contrast-400 blur-xs">
              <SearchBar />
            </div>
            <div v-for="acc in account.data" :key="acc.id">
              <h2 id="accordion-collapse-heading-1">
                <div class="justify-center mr-4">
                  <button
                    type="button"
                    @click="handleApprovedAccountDetails(acc)"
                    class="flex w-full m-3 p-1 font-medium border border-b-0 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 hover:bg-slate-200 bg-slate-100"
                    data-accordion-target="#accordion-collapse-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-collapse-body-1"
                  >
                    <span class="text-sm text-left p-2"
                      >{{ acc.account_number }} - (<span>{{
                        Object.values(acc)[2]
                      }}</span
                      >)</span
                    >
                  </button>
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="Object.keys(currentAccount).length != 0"
        class="col-span-3 w-full"
      >
        <UserAccountDetailsCard :accounts="currentAccount" />
      </div>
      <div v-else class="text-center col-span-3 w-full">
        <p class="text-2xl text-gray-400 text-center mt-24">
          Select an account to view details.
        </p>
      </div>
    </div>
  </div>
  <CreateContactModal
    :show="showCreateContactModal"
    :state="state"
    :currentAccount="currentAccount"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import UserAccountDetailsCard from "@/components/cards/CRMCards/UserAccountDetailsCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import CreateContactModal from "@/components/modals/CRMModals/CreateContactModal.vue";

export default {
  components: {
    UserAccountDetailsCard,
    SearchBar,
    CreateContactModal,
  },
  data() {
    return {
      state: "",
      currentAccount: {},
    };
  },
  setup() {
    const showCreateContactModal = ref(false);
    return {
      showCreateContactModal,
    };
  },
  created() {
    this.getAccounts();
  },
  methods: {
    ...mapActions(["getAccounts"]),
    handleApprovedAccountDetails(data) {
      this.currentAccount = data;
    },
  },
  computed: {
    ...mapGetters(["account"]),
  },
};
</script>

<style></style>
