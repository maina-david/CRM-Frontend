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
                  {{ state == "Edit" ? "Edit Lead" : "Create Lead" }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <!-- Showung form: {{ form }} -->
              <div class="grid grid-cols-2 gap-3">
                <LeadForms :leads="leadFormItems" @form="handleForm" />
              </div>
              <div class="mt-4">
                <ActionButton v-if="state == 'Edit'" text="Get Account Form" />
                <ActionButton
                  v-else
                  @click="handleCreateLead"
                  text="Submit Lead"
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
import LeadForms from "@/components/Forms/LeadForms.vue";
import ActionButton from "@/components/ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: "CreateForm",
  props,
  components: { LeadForms, ActionButton },
  data() {
    return {
      form: {},
      leadFormItems: [
        {
          name: "First Name",
          placeholder: "",
          is_required: 1,
          data_type: "firstname",
          is_masked: 0,
          sequence: 1,
        },
        {
          name: "Maiden Name",
          placeholder: "",
          is_required: 1,
          data_type: "maidenname",
          is_masked: 1,
          sequence: 2,
        },
        {
          name: "Last Name",
          placeholder: "",
          is_required: 1,
          data_type: "lastname",
          is_masked: 0,
          sequence: 3,
        },

        {
          name: "Phone Number",
          placeholder: "",
          is_required: 0,
          data_type: "phone",
          is_masked: 0,
          sequence: 4,
        },
        {
          name: "Email Address",
          placeholder: "",
          is_required: 0,
          data_type: "email",
          is_masked: 0,
          sequence: 5,
        },
        {
          name: "When were you born?",
          placeholder: "",
          is_required: 0,
          data_type: "date",
          is_masked: 0,
          sequence: 6,
        },
        {
          name: "Age",
          placeholder: "",
          is_required: 0,
          data_type: "number",
          is_masked: 0,
          sequence: 7,
        },
      ],
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
  methods: {
    handleForm(e) {
      this.form = e;
    },
  },
};
</script>

<style></style>
