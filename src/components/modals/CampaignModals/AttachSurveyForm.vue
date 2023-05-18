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
                      ? "Create Survey Form"
                      : state == "Edit"
                      ? "Edit Survey Form"
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
                <Dropdown
                  select="Select Survey Form"
                  :options="surveyForms"
                  v-model="form_id"
                  label="Select Survey Form for This Survey"
                />
                <ActionButton
                  v-if="state == 'Edit'"
                  text="Attach Survey Form"
                  class="mt-2"
                />
                <ActionButton
                  @click="
                    createCampaignSurvey({
                      campaign_id: currentCampaignData.id,
                      form_id: form_id,
                    })
                  "
                  v-else
                  text="Attach Survey Form"
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
import Dropdown from "@/components/Dropdown.vue";
import ActionButton from "@/components/ActionButton.vue";
import { mapGetters, mapActions } from "vuex";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentCampaignData: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  watch: {
    selectCentralFormsSurvey() {
      this.surveyForms = this.selectCentralFormsSurvey;
    },
  },
  methods: {
    ...mapActions(["getCENTRALForms", "createCampaignSurvey"]),
  },

  computed: {
    ...mapGetters(["selectCentralFormsSurvey"]),
  },
  updated() {
    this.getCENTRALForms();
    console.log("this is the current campaign data", this.currentCampaignData);
  },
  name: "CreateForm",
  props,
  components: { Dropdown, ActionButton },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      form_id: "",
      surveyForms: [
        { label: "Survey Form 1", value: "1" },
        { label: "Survey Form 2", value: "2" },
        { label: "Survey Form 3", value: "3" },
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
