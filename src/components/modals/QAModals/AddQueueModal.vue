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
                  Attach Queue to QA team for
                  {{ currentQualityAssuranceTeam.name }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-1">
                <Dropdown
                  :options="SelectQueueOptions"
                  label="Select The Queue Type"
                  select="Select The Queue Type"
                  v-model="queueType"
                  @change="select_queue"
                />

                <Dropdown
                  :options="SelectQueues"
                  label="Select the quue"
                  select="Select the queue"
                  v-model="queueSelected"
                />

                <ActionButton
                  @click="handleAddQueue"
                  text="Add Queue"
                  class="mt-2"
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

import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },

  currentQualityAssuranceTeam: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "AddQueue",
  props,
  components: { Dropdown, ActionButton },
  data() {
    return {
      queueType: "",
      queueSelected: "",
      id: "",

      SelectQueues: [],
      SelectQueueOptions: [
        { label: "voice", value: "voice" },
        { label: "Chat", value: "chat" },
      ],
      SelectVoiceQueues: [
        { label: "voice queue 1", value: "1" },
        { label: "voice queue2", value: "2" },
      ],

      SelectChatQueues: [
        { label: "Chat queue 1", value: "1" },
        { label: "Chat queue2", value: "2" },
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
  computed: {
    ...mapGetters(["selectQueues", "selectChatQueues"]),
  },

  methods: {
    ...mapActions([
      "getQueues",
      "getChatQueue",
      "addQueuesToQualityAssuranceTeam",
    ]),

    handleAddQueue() {
      this.addQueuesToQualityAssuranceTeam({
        team_id: this.id,
        queue_id: this.queueSelected,
        queue_type: this.queueType,
      });

      this.closeModal();
    },
    select_queue() {
      console.log("this is the new select option", this.queueType);
      if (this.queueType === "voice") {
        this.SelectQueues = this.selectQueues;
      } else if (this.queueType === "chat") {
        this.SelectQueues = this.selectChatQueues;
      }
    },
  },
  updated() {
    this.id = this.currentQualityAssuranceTeam.id;
    this.getQueues();
    this.getChatQueue();
  },
};
</script>

<style></style>
