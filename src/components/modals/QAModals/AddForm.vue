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
                  Add Form to {{ currentQualityAssuranceTeam.name }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>
            <slot>
              <Dropdown
                select="Select Quality Assurance Form"
                :options="selectQualityAssuranceForm"
                v-model="qualityAssuranceForm"
                label="Select Quality Assurance Form"
              />

              <ActionButton
                @click="handleAddTeamToForm"
                class="mt-5"
                text="Add QA Form to QA Team"
              />
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentQualityAssuranceTeam: {
    type: Object,
    default: {},
  },
};
export default {
  name: "AddForm",
  props,
  components: { ActionButton, Dropdown },
  methods: {
    ...mapActions(["getQualityAssuranceForm", "addFormToQualityAssuranceTeam"]),
    handleAddTeamToForm() {
      this.addFormToQualityAssuranceTeam({
        q_a_team_id: this.currentQualityAssuranceTeam.id,
        q_a_form_id: this.qualityAssuranceForm,
      });
      this.showModal = false;
    },
  },
  data() {
    return {
      qualityAssuranceForm: "",
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
  created() {
    this.getQualityAssuranceForm();
  },
  computed: {
    ...mapGetters(["selectQualityAssuranceForm"]),
  },
};
</script>

<style></style>
