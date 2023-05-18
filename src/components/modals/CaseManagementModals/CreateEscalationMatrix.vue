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
                      ? "Create Escalation Point"
                      : state == "Edit"
                      ? "Edit Escalation Point"
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
                  placeholder="Enter Name"
                  label="Name"
                  v-model="name"
                />
                <TextBox
                  type="text"
                  placeholder="Enter Description"
                  label="Description"
                  v-model="description"
                />
                <ActionButton
                  v-if="state == 'Edit'"
                  @click="handleEditEscalationMatrix"
                  text="Update Escalation Point"
                  class="mt-5"
                />
                <ActionButton
                  v-else
                  @click="handleCreateEscalationMatrix"
                  text="Create Escalation Point"
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
  currentEscalationMatrix: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "CreateHelpDeskTeam",
  props,
  components: { TextBox, ActionButton },
  data() {
    return {
      id: "",
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
      this.id = this.currentEscalationMatrix.id;
      this.name = this.currentEscalationMatrix.name;
      this.description = this.currentEscalationMatrix.description;
    } else {
      this.id = "";
      this.name = "";
      this.description = "";
    }
  },
  methods: {
    ...mapActions([
      "createTicketEscalationMatrix",
      "createTicketEscalationPoint",
      "updateTicketEscalationMatrix",
    ]),
    handleEditEscalationMatrix() {
      this.updateTicketEscalationMatrix({
        escalation_matrix_id: this.id,
        name: this.name,
        description: this.description,
      });
      this.id = "";
      this.name = "";
      this.description = "";
      this.closeModal();
    },
    handleCreateEscalationMatrix() {
      this.createTicketEscalationPoint({
        name: this.name,
        description: this.description,
      });
      this.id = "";
      this.name = "";
      this.description = "";
      this.closeModal();
    },
  },
};
</script>

<style></style>
