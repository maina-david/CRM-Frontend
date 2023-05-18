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
                <h2 class="font-medium text-blue-400">{{ state }} Queue</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <TextBox
                  type="text"
                  placeholder="Enter  Name"
                  label="Name"
                  v-model="name"
                />
                <TextBox
                  type="text"
                  placeholder="Enter  Description"
                  label="Description"
                  v-model="description"
                />
                <TextBox
                  type="number"
                  placeholder="Enter Time Out"
                  label="Enter Time Out (Seconds)"
                  v-model="timeout"
                />
                <TextBox
                  type="text"
                  placeholder="Enter the Auto-reply message"
                  label="Auto Reply Message"
                  v-model="autoreply_message"
                />
                <TextBox
                  type="number"
                  placeholder="Maximum open conversations per agent"
                  label="Maximum open conversations per agent"
                  v-model="max_open_conversation"
                />
                <ActionButton
                  v-if="state == 'Edit'"
                  @click="handleEditChatQueue"
                  text="Edit Chat Queue"
                  class="mt-5"
                />
                <ActionButton
                  v-else
                  @click="handleCreateChatQueue"
                  text="Create Chat Queue"
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
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Queue",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    currentQueue: {
      type: Object,
    },
    state: {
      type: String,
      required: true,
    },
  },
  components: { TextBox, ActionButton },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      active: "",
      timeout: 0,
      autoreply_message: "",
      max_open_conversation: 0,
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
    if (this.state == "Edit") {
      this.id = this.currentQueue.id;
      this.name = this.currentQueue.name;
      this.description = this.currentQueue.description;
      this.active = this.currentQueue.active;
      this.timeout = this.currentQueue.timeout;
      this.autoreply_message = this.currentQueue.autoreply_message;
      this.max_open_conversation = this.currentQueue.max_open_conversation;
    } else {
      this.name = "";
      this.description = "";
      this.active = "";
      this.timeout = 0;
      this.autoreply_message = "";
      this.max_open_conversation = 0;
    }
  },
  methods: {
    ...mapActions(["createChatQueue", "updateChatQueue"]),
    handleCreateChatQueue() {
      this.createChatQueue({
        name: this.name,
        description: this.description,
        timeout: this.timeout,
        autoreply_message: this.autoreply_message,
        max_open_conversation: this.max_open_conversation,
      });
      this.closeModal();
    },
    handleEditChatQueue() {
      this.updateChatQueue({
        chat_queue_id: this.id,
        name: this.name,
        description: this.description,
        timeout: this.timeout,
        autoreply_message: this.autoreply_message,
        max_open_conversation: this.max_open_conversation,
      });
      this.closeModal();
    },
  },
};
</script>

<style></style>
