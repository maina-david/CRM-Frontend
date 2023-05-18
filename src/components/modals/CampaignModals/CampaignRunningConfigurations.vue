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
                  {{ currentCampaign.name }} Campaign Days Configurations
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="my-5">
                <label
                  class="form-label text-xs my-5 inline-block text-gray-700"
                  >Select the campaign days and their hours</label
                >
                <!-- <p>workingHour: {{ workingHour }}</p> -->
              </div>
              <div
                v-for="option in workingHour"
                :key="option.date"
                class="mt-5 m-3 flex"
              >
                <div>
                  <input
                    type="checkbox"
                    id="checkbox"
                    v-model="option.selected"
                  />
                  <label for="checkbox">{{ option.date }}</label>
                </div>
                <div v-if="option.selected == true">
                  <TextBox
                    v-model="option.starting_time"
                    type="time"
                    label="At what time does the campaign day start?"
                    placeholder="Start Time"
                  />
                  <TextBox
                    v-model="option.end_time"
                    type="time"
                    label="At what time does the campaign day end"
                    placeholder="End Time"
                  />
                </div>
              </div>
              <ActionButton
                @click="handleCreateWorkingHours"
                text="Submit Campaign Configurations"
              />
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import TextBox from "@/components/TextBox.vue";
import { ref, watch } from "vue";
import { mapActions } from "vuex";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentCampaign: {
    type: Object,
    default: {},
  },
};
export default {
  name: "WorkingHoursModal",
  props,
  components: { ActionButton, TextBox },
  data() {
    return {
      workingHour: [
        {
          date: "MONDAY",
          selected: false,
          starting_time: "00:00",
          end_time: "00:00",
        },
        {
          date: "TUESDAY",
          selected: false,
          starting_time: "00:00",
          end_time: "00:00",
        },
        {
          date: "WEDNSDAY",
          selected: false,
          starting_time: "00:00",
          end_time: "00:00",
        },
        {
          date: "THURSDAY",
          selected: false,
          starting_time: "00:00",
          end_time: "00:00",
        },
        {
          date: "FRIDAY",
          selected: false,
          starting_time: "00:00",
          end_time: "00:00",
        },
        {
          date: "SATURDAY",
          selected: false,
          starting_time: "00:00",
          end_time: "00:00",
        },
        {
          date: "SUNDAY",
          selected: false,
          starting_time: "00:00",
          end_time: "00:00",
        },
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
  methods: {
    ...mapActions(["addCampaignWorkingHour"]),
    handleCreateWorkingHours() {
      var workingHours = this.workingHour.filter((hour) => hour.selected);
      console.log("workinghours", workingHours);
      console.log(" type workinghours", typeof workingHours);
      this.addCampaignWorkingHour({
        campaign_id: this.currentCampaign.id,
        working_hour: workingHours,
      }),
        this.closeModal();
    },
  },
};
</script>

<style></style>
