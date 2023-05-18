<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b">
      <div class="p-3">
        <h2 class="font-semibold">Chat Transcript</h2>
      </div>
    </div>
    <slot>
      <div class="mt-5">
        <div v-for="chat in chatTranscript" :key="chat">
          <div class="">
            <div class="p-3 bg-slate-50 flex">
              <h3 class="text-sm font-semibold">{{ chat.senderName }} :</h3>
              <h4 class="text-sm font-medium">
                {{ chat.senderText }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CreateFile",
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
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  components: {},
  computed: {},
  methods: {},
};
</script>

<style></style>
