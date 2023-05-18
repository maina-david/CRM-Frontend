<template>
  <teleport to="body">
    <div
      ref="modal-backdrop"
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <transition
          enter-active-class="transition ease-out duration-300 transform "
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
        >
          <div
            class="relative bg-white rounded-sm text-left overflow-hidden shadow-xl p-8"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            <div class="border-b">
              <div class="p-3">
                <h2 class="font-medium text-blue-400">
                  {{ state == "Edit" ? "Edit Account" : "Create Account" }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <Dropdown
                v-if="state !== 'Edit'"
                select="Select Account Types"
                label="Select Account Types"
                :options="selectAccountTypes"
                v-model="account_type_id"
              />
              <!-- Showung form: {{ form }} -->
              <div class="grid grid-cols-2 gap-3">
                <AccountForms
                  :accounts="accountFormItems"
                  :state="state"
                  :currentForm="form"
                  @form="handleForm"
                />
              </div>
              <div class="mt-4">
                <ActionButton
                  v-if="state == 'Edit' && !account_type_id"
                  @click="handleGetAccountForm"
                  text="Get Account Form"
                />
                <ActionButton
                  v-else
                  @click="handleCreateAccount"
                  text="Submit"
                />
              </div>
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import { mapActions, mapGetters } from "vuex";
import AccountForms from "@/components/Forms/AccountForms.vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentAccount: {
    type: Object,
    required: false,
    default: {},
  },
  accountTypeId: {
    type: String,
    required: true,
  },
  accountFormId: {
    type: String,
    required: true,
  },
};
export default {
  name: "CreateForm",
  props,
  components: { AccountForms, ActionButton, Dropdown },
  data() {
    return {
      account_id: "",
      account_form_id: "",
      account_type_id: "",
      form: {},
    };
  },
  setup(props) {
    const showModal = ref(false);

    function closeModal() {
      showModal.value = false;
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      }
    );

    return {
      closeModal,
      showModal,
    };
  },
  created() {
    this.getAccountTypes();
  },
  watch: {
    account_type_id: function (val) {
      if (this.state == "Edit") {
        this.getAccountFormItems({
          account_form_id: this.account_form_id,
        });
      } else {
        var currentAccountType = this.accountTypes.find((x) => x.id == val);
        console.log("currentAccount type", currentAccountType);
        this.getAccountFormItems({
          account_form_id: currentAccountType?.account_form_id,
        });
      }
    },
    accountFormItems: function () {
      console.log("account form items with state", this.state);
      if (this.state == "Edit") {
        this.currentAccount.account_items.map((form) => {
          var item = this.form;
          console.log("form items", item);
          console.log("form items 2", this.form);
          item[form.account_form_attr_id] = form.value;
          this.form = item;
        });
      }
    },
    showModal: function () {
      this.account_id = "";
      this.account_form_id = "";
      this.account_type_id = "";
      this.form = {};
    },
  },
  methods: {
    ...mapActions([
      "getAccountTypes",
      "getAccountFormItems",
      "createAccount",
      "updateAccount",
    ]),
    handleForm(e) {
      this.form = e;
    },
    handleCreateAccount() {
      if (this.state == "Edit") {
        this.updateAccount({
          account_id: this.account_id,
          account_type_id: this.account_type_id,
          account_form_id: this.account_form_id,
          user_response: this.form,
        });
      } else {
        this.createAccount({
          account_type_id: this.account_type_id,
          account_form_id: this.accountFormItems[0]?.account_form_id,
          user_response: this.form,
        });
      }
      this.showModal = false;
    },
    handleGetAccountForm() {
      this.account_id = this.currentAccount.account_items[0]?.account_id;
      this.account_type_id = this.accountTypeId;
      this.account_form_id = this.accountFormId;
    },
  },
  computed: {
    ...mapGetters(["accountTypes", "selectAccountTypes", "accountFormItems"]),
  },
};
</script>

<style></style>
