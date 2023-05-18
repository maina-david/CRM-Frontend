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
                <h2 class="font-medium text-blue-400">Company Off</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="">
                <Dropdown
                  class="my-3"
                  select="Select Track"
                  label="Select track to be played when the company is off"
                  :options="selectSettingAudio"
                  v-model="file_url"
                />

                <ActionButton
                  @click="handleChangeCompanyOffTrack"
                  text="Submit Company Off Track"
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
import { mapActions, mapGetters } from "vuex";
import ActionButton from "../../ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: "CompanyToggle",
  props,
  components: { ActionButton, Dropdown },
  data() {
    return {
      file_url: "",
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
    this.getSettingAudios();
  },
  methods: {
    ...mapActions(["getSettingAudios", "updateCallCenterOffMusic"]),
    handleChangeCompanyOffTrack() {
      this.updateCallCenterOffMusic({
        file_id: this.file_url,
      });
      this.showModal = false;
    },
  },
  computed: {
    ...mapGetters(["selectSettingAudio"]),
  },
};
</script>

<style></style>
