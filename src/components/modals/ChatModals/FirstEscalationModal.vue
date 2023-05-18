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
            <AccordionFormBuilder />
            <ActionButton
              @click="handleCreateEscalation"
              text="Setup First Escalation"
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
import AccordionFormBuilder from "@/components/dynamicFormOutline/AccordionFromBuilder.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  multipleOptions: {
    type: Array,
    default: [],
  },
  currentEscalation: {
    type: Object,
    default: {},
  },
};
export default {
  name: "FirstEscalation",
  props,
  components: {
    ActionButton,
    AccordionFormBuilder,
  },
  data() {
    return {
      escalationItems: 1,
      escalations: [],
    };
  },
  watch: {
    escalationItems: function (val) {
      this.currentEscalation.nodeId = val;
      this.currentEscalation.multipleOptions = [];
      this.currentEscalation.child = [];
      this.escalations[val - 2] = this.currentEscalation;
      this.currentEscalation = {};
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
    addOption() {
      this.escalationItems++;
    },
    removeOption() {
      this.escalationItems--;
    },
    handleCreateEscalation() {
      this.$emit("escalations", this.escalations);
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
