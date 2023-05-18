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
                  Add AutoReply To {{ currentQueue.name }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <TextBox
                  type="text"
                  placeholder="Enter AutoReply Message"
                  label="AutoReply Message"
                  v-model="autoreply_message"
                />
                <ActionButton
                  @click="handleAddAutoReplyMessage"
                  text="Add Autoreply Message"
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
import { mapActions } from "vuex";
import { ref, watch } from "vue";
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  name: "AddAutoReplyChatQueueModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    currentQueue: {
      type: Object,
    },
  },
  components: { TextBox, ActionButton },
  data() {
    return {
      id: "",
      autoreply_message: "",
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
  updated() {
    this.id = this.currentQueue.id;
    this.autoreply_message =
      this.currentQueue.autoreply_message?.autoreply_message;
  },
  methods: {
    ...mapActions(["addAutoreplyMessageToChatQueue"]),
    handleAddAutoReplyMessage() {
      this.addAutoreplyMessageToChatQueue({
        chat_queue_id: this.id,
        autoreply_message: this.autoreply_message,
      });
      this.closeModal();
    },
  },
};
</script>

<style></style>
