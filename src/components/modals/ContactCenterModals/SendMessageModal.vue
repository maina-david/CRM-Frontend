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
                <h2 class="font-medium text-blue-400">Send Message</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="">
                <div class="my-2">
                  <div class="my-4 mx-2">
                    <Dropdown
                      @change="handleTemplateChange"
                      select="Select Template"
                      label="Select a template to use"
                      :options="smsTemplatesSelect"
                      v-model="template_id"
                    />
                  </div>
                  <div>
                    <TextArea
                      v-model="message"
                      type="text"
                      label="Enter a message template"
                      placeholder="Type message template"
                    />
                  </div>
                </div>
                <div class="my-2">
                  <ActionButton
                    text="Send Message"
                    @click="
                      sendSms({
                        phone_number: remote_identity,
                        sms_text: message,
                      })
                    "
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
import TextArea from "@/components/TextArea.vue";
import Dropdown from "@/components/Dropdown.vue";
import { mapGetters, mapActions } from "vuex";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  methods: {
    ...mapActions(["sendSms"]),
    handleTemplateChange() {
      console.log("I am changing selected templates");
      var self = this;
      this.message = this.smsTemplates.filter(function (template) {
        return template.id == self.template_id;
      })[0].sms_text;
      console.log(this.message);
    },
  },
  name: "SendMessage",
  props,
  components: { ActionButton, TextArea, Dropdown },
  computed: {
    ...mapGetters(["smsTemplatesSelect", "smsTemplates", "remote_identity"]),
  },
  data() {
    return {
      message: "",
      template_id: "",
      selectTemplate: [{ label: "Default Template", value: "default" }],
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
