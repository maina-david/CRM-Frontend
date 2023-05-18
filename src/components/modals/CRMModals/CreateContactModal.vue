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
                  {{ state == "Edit" ? "Edit Contact" : "Create Contact" }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <Dropdown
                v-if="state !== 'Edit'"
                select="Select Account"
                label="Select Account"
                :options="selectAccount"
                v-model="account_id"
              />
              <Dropdown
                v-if="state !== 'Edit' && account_id !== ''"
                select="Select Contact Form"
                label="Select Contact Form"
                :options="selectContactForms"
                v-model="contact_form_id"
              />
              <div class="grid grid-cols-2 gap-3">
                <ContactForms :accounts="contactFormItems" @form="handleForm" />
              </div>
              <div class="mt-4">
                <ActionButton
                  v-if="state == 'Edit' && !account_id"
                  @click="handleGetContactForm"
                  text="Get Contact Form"
                />
                <ActionButton
                  v-else
                  @click="handleCreateContact"
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
import ContactForms from "@/components/Forms/ContactForms.vue";
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
};
export default {
  name: "CreateForm",
  props,
  components: { ContactForms, ActionButton, Dropdown },
  data() {
    return {
      account_id: "",
      contact_form_id: "",
      id: "",
      name: "",
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
    this.getContactForms();
    this.getAccounts();
  },
  watch: {
    contact_form_id: function (val) {
      this.getContactFormItems({
        contact_form_id: val,
      });
    },
  },
  methods: {
    ...mapActions([
      "getContactForms",
      "getContactFormItems",
      "createContact",
      "getAccounts",
    ]),
    handleForm(e) {
      this.form = e;
    },
    handleCreateContact() {
      console.log("contact_form_id", this.contactFormItems[0]?.contact_form_id);
      console.log("user_response ", this.form);
      this.createContact({
        account_id: this.account_id,
        contact_form_id: this.contactFormItems[0]?.contact_form_id,
        user_response: this.form,
      });
      this.showModal = false;
    },
  },
  computed: {
    ...mapGetters(["selectContactForms", "contactFormItems", "selectAccount"]),
  },
};
</script>

<style></style>
