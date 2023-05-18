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
                      ? "Create Team"
                      : state == "Edit"
                      ? "Edit Team"
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
                <!-- <TextBox
                  type="number"
                  placeholder="Maximum number of agents per user"
                  label="Maximum agents per user"
                  v-model="maxAgents"
                />
                <TextBox
                  type="number"
                  placeholder="Interactions per agent/channel/ week"
                  label="Interactions Per Agent /Per Channel /Per Week"
                  v-model="interactions"
                />
                <Dropdown
                  :options="selectSupervisor"
                  label="Select the Supervisor"
                  select="Select Supervisor"
                  v-model="supervisor"
                /> -->

                <ActionButton
                  v-if="state == 'Edit'"
                  @click="handleEditQualityAssuranceTeam"
                  text="Edit Team"
                  class="mt-2"
                />
                <ActionButton
                  v-else
                  @click="handleCreateQualityAssuranceTeam"
                  text="Create Team"
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
import { mapActions } from "vuex";
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
// import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentQualityAssuranceTeam: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "CreateForm",
  props,
  components: { TextBox, ActionButton },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      supervisor: "",
      maxAgents: 0,
      interactions: 0,
      selectSupervisor: [
        { label: "Jane Doe", value: "1" },
        { label: "Evaluator 2", value: "2" },
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
  updated() {
    if (this.state == "Edit") {
      this.id = this.currentQualityAssuranceTeam.id;
      this.name = this.currentQualityAssuranceTeam.name;
      this.description = this.currentQualityAssuranceTeam.description;
    } else {
      this.id = "";
      this.name = "";
      this.description = "";
    }
  },
  methods: {
    ...mapActions(["createQualityAssuranceTeam", "updateQualityAssuranceTeam"]),
    handleCreateQualityAssuranceTeam() {
      this.createQualityAssuranceTeam({
        name: this.name,
        description: this.description,
      });
      this.name = "";
      this.description = "";
      this.closeModal();
    },
    handleEditQualityAssuranceTeam() {
      this.updateQualityAssuranceTeam({
        q_a_team_id: this.id,
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
