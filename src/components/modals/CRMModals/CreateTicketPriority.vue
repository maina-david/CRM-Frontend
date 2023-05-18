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
                  Create Priority Configuration
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-1">
                <div>
                  <div class="">
                    <TextBox
                      v-model="name"
                      type="text"
                      label="Priority Name"
                      placeholder="Enter the name of your priority"
                    />
                    <TextBox
                      v-model="description"
                      type="text"
                      label="Priority Description"
                      placeholder="Enter your description"
                    /><TextBox
                      v-model="sla"
                      type="text"
                      label="Service Level Agreement(SLA) in Hours"
                      placeholder="Enter SLA in hours"
                    />
                    <div class="text-xs">
                      <TagInputs
                        :tags="tags"
                        placeholder="Add Emails.."
                        label="Enter the email address to be contacted if the SLA is not met"
                      />
                    </div>

                    <div class="justify-around">
                      <ActionButton
                        @click="handleCreateTicketPriorityConfiguration"
                        class="my-5"
                        text="Add Ticket Priority Configuration"
                      />
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
import { mapActions } from "vuex";
import TextBox from "@/components/TextBox.vue";
import TagInputs from "@/components/TagInputs.vue";
import ActionButton from "@/components/ActionButton.vue";

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
  name: "CreateTicketPriority",
  props,
  components: { TextBox, ActionButton, TagInputs },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      sla: "",
      tags: [],
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
  methods: {
    ...mapActions(["createTicketPriority"]),
    handleCreateTicketPriorityConfiguration() {
      this.createTicketPriority({
        name: this.name,
        description: this.description,
        sla: this.sla,
      });
      this.closeModal();
    },
  },
};
</script>

<style></style>
