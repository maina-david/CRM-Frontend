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
                  {{ holidayState }} Holiday
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div>
                <div class="mt-5 m-3">
                  <TextBox
                    v-model="date"
                    type="date"
                    label="Pick the holiday date"
                    placeholder="Pick the holiday date"
                  />
                  <TextBox
                    v-model="name"
                    type="text"
                    label="Name of the holiday"
                    placeholder="Name of the holiday"
                  />
                  <TextBox
                    v-model="description"
                    type="text"
                    label="Description of the holiday"
                    placeholder="Description of the holiday"
                  />
                  <Dropdown
                    class="my-3"
                    select="Select Track"
                    label="Select Track"
                    :options="selectSettingAudio"
                    v-model="file_id"
                  />
                  <ActionButton
                    @click="handleCreateHoliday"
                    text="Submit Holiday"
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
import { mapActions, mapGetters } from "vuex";
import { ref, watch } from "vue";
import TextBox from "@/components/TextBox.vue";
import Dropdown from "@/components/Dropdown.vue";
import ActionButton from "@/components/ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  holidayState: {
    type: String,
    default: false,
  },
  currentHoliday: {
    type: Object,
    default: false,
  },
};
export default {
  name: "HolidayCard",
  props,
  components: { TextBox, ActionButton, Dropdown },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      date: "",
      file_id: "",
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
  updated() {
    this.id = this.currentHoliday.id;
    this.name = this.currentHoliday.name;
    this.description = this.currentHoliday.description;
    this.date = this.currentHoliday.date;
    this.file_id = this.currentHoliday.file_id;
  },
  methods: {
    ...mapActions(["getSettingAudios", "addHoliday", "updateHoliday"]),
    handleCreateHoliday() {
      if (this.holidayState == "Edit") {
        this.updateHoliday({
          id: this.id,
          name: this.name,
          description: this.description,
          date: this.date.slice(5),
          file_id: this.file_id,
        });
      } else {
        this.addHoliday({
          name: this.name,
          description: this.description,
          date: this.date.slice(5),
          file_id: this.file_id,
        });
        this.name = "";
        this.description = "";
        this.date = "";
        this.file_id = "";
      }
      this.showModal = false;
    },
  },
  computed: {
    ...mapGetters(["selectSettingAudio"]),
  },
};
</script>

<style></style>
