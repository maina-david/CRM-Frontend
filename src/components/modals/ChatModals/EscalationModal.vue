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
            class="relative w-2/3 bg-white rounded-sm text-left overflow-hidden shadow-xl p-8"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            {{ currentEscalation }}
            <div class="border-b">
              <div class="p-3">
                <h2 class="font-medium text-blue-400">
                  Node:
                  <span class="text-blue-800">{{
                    currentEscalation.name
                  }}</span>
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>
            <AccordionFormBuilder
              :initial_form_items="currentEscalation.formItems"
              @form_items="handleForm"
            />
            <hr class="mt-6" />
            <div class="m-6">
              <p>Assign a help desk to escalate to:</p>
              <Radio label="" :options="escalationHelpDesks" />
            </div>
            <ActionButton
              @click="handleCreateEscalation"
              text="Setup Escalation"
              class="mt-5"
            />
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import ActionButton from "../../ActionButton.vue";
import Radio from "@/components/Radio.vue";
import AccordionFormBuilder from "@/components/dynamicFormOutline/AccordionFromBuilder.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentEscalation: {
    type: Object,
    default: {},
  },
};
export default {
  name: "EscalationModal",
  props,
  components: {
    ActionButton,
    Radio,
    AccordionFormBuilder,
  },
  data() {
    return {
      form_items: [],
      escalationItems: 1,
      escalationHelpDesks: [
        { label: "HelpDesk 1", value: 1 },
        { label: "HelpDesk 2", value: 2 },
        { label: "HelpDesk 3", value: 3 },
        { label: "HelpDesk 4", value: 4 },
        { label: "HelpDesk 5", value: 5 },
        { label: "HelpDesk 6", value: 6 },
      ],
    };
  },
  watch: {
    form_items: function (val) {
      this.currentEscalation.formItems = val;
    },
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
      this.form_items = e;
    },
    addOption() {
      this.escalationItems++;
    },
    removeOption() {
      this.escalationItems--;
    },
    handleCreateEscalation() {
      this.$emit("escalations", this.currentEscalation);
      this.showModal = false;
    },
    truncateString(str) {
      if (str.length > 60) {
        return str.slice(0, 60) + "...";
      } else {
        return str;
      }
    },
  },
};
</script>

<style></style>
