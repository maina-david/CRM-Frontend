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
                <h2 class="font-medium text-blue-400">Create Template</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="">
                <div class="my-2">
                  <TextBox
                    v-model="name"
                    type="text"
                    label="Enter name"
                    placeholder="Name this template"
                  />
                  <TextArea
                    v-model="message"
                    type="text"
                    label="Enter a message template"
                    placeholder="Type message template"
                  />
                </div>
                <div class="my-2">
                  <ActionButton
                    text="Submit Template"
                    @click="handleSumbitTemplate"
                  />
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
import ActionButton from "@/components/ActionButton.vue";
import TextBox from "@/components/TextBox.vue";
import TextArea from "@/components/TextArea.vue";
import { mapActions } from "vuex";

export default {
  updated() {
    if (this.state === "Edit") {
      this.name = this.currentTemplateData.name;
      this.message = this.currentTemplateData.sms_text;
    }
  },
  methods: {
    ...mapActions(["createSmsTemplate", "editSmsTemplate"]),
    handleSumbitTemplate() {
      if (this.state === "Create") {
        console.log("I am creating SMS templates");
        this.createSmsTemplate({ name: this.name, sms_text: this.message });
      } else {
        console.log("I am editing SMS templates");
        this.editSmsTemplate({
          template_id: this.currentTemplateData.id,
          name: this.name,
          sms_text: this.message,
        });
      }
    },
  },
  name: "TakeBreak",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    state: {
      type: String,
      default: "",
    },
    currentTemplateData: {
      type: Object,
    },
  },
  components: { ActionButton, TextBox, TextArea },
  data() {
    return {
      message: "",
      name: "",
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
