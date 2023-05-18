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
                <h2 class="font-medium text-blue-400">Campaign Hours</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <!-- <WorkingHoursCard /> -->
              <div class="mt-5 m-3">
                <!--div class="my-5">
                  <label
                    class="form-label text-xs my-5 inline-block text-gray-700"
                    >Select the working days and their hours</label
                  >
                  <CheckBoxList
                    class="my-3"
                    :options="selectDays"
                    v-model:value="selectedDays"
                  />
                </!--div-->
                <div class="my-4">
                  <Dropdown
                    select="Select When to Start Campaign"
                    :options="startOptions"
                    v-model="start"
                    label="Start Campaign"
                  />
                </div>
                <div v-if="start == 'later'">
                  <TextBox
                    v-model="startDate"
                    type="date"
                    label="When should the campaign start?"
                    placeholder="Start date"
                  />
                  <TextBox
                    v-model="endDate"
                    type="date"
                    label="When should the campaign end?"
                    placeholder="End date"
                  />
                </div>

                <ActionButton
                  @click="handleCreateWorkingHours"
                  text="Start Campaign"
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
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: "WorkingHoursModal",
  props,
  components: { TextBox, ActionButton, Dropdown },
  data() {
    return {
      file_url: "",
      startWorkingHour: "",
      stopWorkingHour: "",
      startDate: "",
      endeDate: "",
      start: "",
      startOptions: [
        { label: "Start Now", value: "now" },
        { label: "Start Later", value: "later" },
      ],
      selectDays: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],
      selectedDays: [],
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
