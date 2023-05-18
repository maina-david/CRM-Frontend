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
                <h2 class="font-medium text-blue-400">Break</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="">
                <div class="my-4 mx-2">
                  <Dropdown
                    select="Select Break"
                    label="Select Break"
                    :options="selectActiveBreaks"
                    v-model="break_id"
                  />
                </div>

                <ActionButton @click="handleTakeBreak" text="Take Break" />
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
import ActionButton from "../../ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: "TakeBreak",
  props,
  components: { ActionButton, Dropdown },
  data() {
    return {
      break_id: "",
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
    this.getActiveBreaks();
  },
  methods: {
    ...mapActions(["getActiveBreaks", "takeBreak", "getAgentStatus"]),
    handleTakeBreak() {
      this.takeBreak({
        break_id: this.break_id,
      });
      this.break_id = "";
      this.getAgentStatus();
      this.showModal = false;
    },
  },
  computed: {
    ...mapGetters(["selectActiveBreaks"]),
  },
};
</script>

<style></style>
