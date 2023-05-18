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
                  {{
                    state == "Create"
                      ? "Create Ticket Form"
                      : state == "Edit"
                      ? "Edit Ticket Form"
                      : ""
                  }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-1">
                <TextBox
                  type="text"
                  placeholder="Enter Ticket Form Name"
                  label="Name"
                  v-model="name"
                />
                <TextBox
                  type="text"
                  placeholder="Enter Ticket Form Description"
                  label="Description"
                  v-model="description"
                />
                <ActionButton
                  @click="handleTicketForm"
                  text="Submit Ticketing Form"
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
import { ref, watch } from "vue";
import { mapActions } from "vuex";
import TextBox from "@/components/TextBox.vue";
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
  currentTicketForm: {
    type: Object,
    default: {},
  },
};
export default {
  name: "CreateTicketCreationForm",
  props,
  components: { TextBox, ActionButton },
  data() {
    return {
      ticket_form_id: "",
      name: "",
      description: "",
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
      this.ticket_form_id = this.currentTicketForm.id;
      this.name = this.currentTicketForm.name;
      this.description = this.currentTicketForm.description;
    } else {
      this.ticket_form_id = "";
      this.name = "";
      this.description = "";
    }
  },
  methods: {
    ...mapActions(["createTicketForm", "updateTicketForm"]),
    handleTicketForm() {
      if (this.state == "Edit") {
        this.updateTicketForm({
          ticket_form_id: this.ticket_form_id,
          name: this.name,
          description: this.description,
        });
      } else {
        this.createTicketForm({
          name: this.name,
          description: this.description,
        });
      }
      this.ticket_form_id = "";
      this.name = "";
      this.description = "";
      this.closeModal();
    },
  },
};
</script>

<style></style>
