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
                  Assign Account Form to Account Type
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>
            <slot>
              <div class="mt-5">
                <Dropdown
                  select="Select AccountForm"
                  label="Select AccountForm"
                  :options="selectAccountForms"
                  v-model="account_form_id"
                />
                <ActionButton
                  @click="handleAddAccountFormToAccountType"
                  text="Add Account Form"
                  class="mt-5"
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
import { mapActions, mapGetters } from "vuex";
import { ref, watch } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentIvr: {
    type: Object,
    required: true,
  },
  currentAccountType: {
    type: Object,
    required: true,
  },
};
export default {
  name: "SelectAccountFormModal",
  props,
  components: { ActionButton, Dropdown },
  data() {
    return {
      account_form_id: "",
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
    this.getAccountForms();
  },
  methods: {
    ...mapActions(["getAccountForms", "assignAccountFormToAccountType"]),
    handleAddAccountFormToAccountType() {
      this.assignAccountFormToAccountType({
        account_form_id: this.account_form_id,
        account_type_id: this.currentAccountType.id,
      });
      this.showModal = false;
    },
  },
  computed: {
    ...mapGetters(["selectAccountForms"]),
  },
};
</script>

<style></style>
