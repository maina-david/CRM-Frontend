<template>
  <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
    <div class="border-b flex justify-between p-2">
      <div>
        <h2 class="font-bold text-lg py-2">Account Details</h2>
      </div>
      <div class="flex gap-2">
        <ActionButton
          @click="
            handleApproveAccount(
              accountDetailPending.account_updated[0].account_stage_id,
              'APPROVE'
            )
          "
          text="Approve Account"
        />
        <ActionButton
          text="Decline Account"
          class="bg-red-500"
          @click="
            handleApproveAccount(
              accountDetailPending.account_updated[0].account_stage_id,
              'DECLINE'
            )
          "
        />
      </div>
    </div>
    <div class="flex gap-3 right-0">
      <h2 class="font-md text-xs py-3 px-2">Changes made by :</h2>
      <h2 class="font-md text-xs py-3 px-2">
        When : {{ formatDate(accounts.updated_at) }}
      </h2>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="bg-green-100">
        <h2 class="font-bold text-sm py-3 px-2">Previous Data</h2>
        <div class="mt-5">
          <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
            <div class="mt-5">
              <div v-if="!accountDetailPending.account_original" class="">
                <div class="text-center col-span-3 w-full">
                  <p class="text-2xl text-gray-400 text-center mt-24">
                    No account details.
                  </p>
                </div>
              </div>
              <div
                v-else
                v-for="account in accountDetailPending.account_original"
                :key="account.id"
              >
                <div class="">
                  <div class="p-3 bg-slate-50 flex">
                    <h3 class="text-sm font-semibold">
                      {{ account.account_form_attrs.name }} :
                    </h3>
                    <h4 class="text-sm font-medium">
                      {{ account.value }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-orange-100">
        <h2 class="font-bold text-sm py-3 px-2">Proposed Changes</h2>
        <div class="mt-5">
          <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
            <div class="mt-5">
              <div v-if="!accountDetailPending.account_updated" class="">
                <div class="text-center col-span-3 w-full">
                  <p class="text-2xl text-gray-400 text-center mt-24">
                    No account details.
                  </p>
                </div>
              </div>
              <div
                v-else
                v-for="account in accountDetailPending.account_updated"
                :key="account.id"
              >
                <div class="">
                  <div class="p-3 bg-slate-50 flex">
                    <h3 class="text-sm font-semibold">
                      {{ account.account_form_attrs.name }} :
                    </h3>
                    <h4 class="text-sm font-medium">
                      {{ account.value }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CreateAccountModal
    :show="showCreateAccountModal"
    :state="state"
    :currentAccount="currentAccount"
    :accountTypeId="accounts.account_type_id"
    :accountFormId="accounts.account_form_id"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import ActionButton from "@/components/ActionButton.vue";
import CreateAccountModal from "@/components/modals/CRMModals/CreateAccountModal.vue";

export default {
  props: {
    accounts: { type: Array },
  },
  components: {
    ActionButton,
    CreateAccountModal,
  },
  setup() {
    const showCreateAccountModal = ref(false);
    return {
      showCreateAccountModal,
    };
  },
  created() {
    this.getAccountsDetailPending({
      account_id: this.accounts.id,
    });
  },
  watch: {
    accounts: function (val) {
      this.getAccountsDetailPending({
        account_id: val.id,
      });
    },
  },
  methods: {
    ...mapActions(["getAccountsDetailPending", "accountApproveRequest"]),
    handleEditAccount(data, state) {
      this.state = state;
      this.currentAccount = data;
      this.showCreateAccountModal = !this.showCreateAccountModal;
    },
    handleApproveAccount(data, state) {
      if (confirm("Confirm " + state + " this account?") == true) {
        console.log("approve/decline account", data, state);
        this.accountApproveRequest({
          account_stage_id: data,
          action: state,
        });
      } else {
        console.log("approve/decline account cancelled");
      }
    },
    formatDate(date) {
      return moment(date).calendar();
    },
  },
  computed: {
    ...mapGetters(["accountDetailPending"]),
  },
};
</script>

<style></style>
