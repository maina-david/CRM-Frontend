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
                <div>
                  <h2 class="font-medium text-blue-400">Chat Transcript</h2>
                </div>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <div v-for="chat in currentTicketChatTranscript" :key="chat">
                  <div class="">
                    <div class="p-3 bg-slate-50 flex">
                      <h3 class="text-sm font-semibold">
                        {{ chat.direction }} :
                      </h3>
                      <h4 class="text-sm font-medium">
                        {{ chat.message }}
                      </h4>
                    </div>
                  </div>
                </div>
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
import { mapGetters } from "vuex";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentAccountForm: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  computed: {
    ...mapGetters(["currentTicketChatTranscript"]),
  },
  name: "CreateForm",
  props,
  data() {
    return {
      id: "",
      name: "",
      chatTranscript: [
        {
          senderName: "Agent",
          senderText: "Hello, Welcome to Lorepsum. How may we be of help?",
        },
        {
          senderName: "Linda",
          senderText: "Hello, I need support on a product i bought",
        },
        {
          senderName: "Agent",
          senderText: "Which Product are you talking about?",
        },
        {
          senderName: "Linda",
          senderText: "Product 123. I got it from your shop in Town",
        },
        {
          senderName: "Agent",
          senderText: "Please send me a picture of your receipt",
        },
        {
          senderName: "Linda",
          senderText: "Yes... Sure!",
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
};
</script>

<style></style>
