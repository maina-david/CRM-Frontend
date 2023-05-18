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
                  {{ breakState }} Break
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <!-- <BreaksCard /> -->
              <div class="mt-5 m-3">
                <TextBox
                  v-model="name"
                  type="text"
                  label="Name of the break"
                  placeholder=""
                />
                <TextBox
                  v-model="description"
                  type="text"
                  label="Description of the break"
                  placeholder=""
                /><TextBox
                  v-model="minutes"
                  type="number"
                  label="Length of the break in minutes"
                  placeholder=""
                />
                <TextBox
                  v-model="breaks"
                  type="number"
                  label="Number of breaks agent can take per day"
                  placeholder=""
                />

                <ActionButton @click="handleSubmitBreak" text="Submit" />
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
  breakState: {
    type: String,
    default: false,
  },
  currentBreak: {
    type: Object,
    default: false,
  },
};
export default {
  name: "BreakCard",
  props,
  components: { ActionButton, TextBox },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      minutes: "",
      breaks: "",
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
    this.id = this.currentBreak.id;
    this.name = this.currentBreak.name;
    this.description = this.currentBreak.description;
    this.minutes = this.currentBreak.maximum_allowed_time;
    this.breaks = this.currentBreak.allowed_per_day;
  },
  methods: {
    ...mapActions(["addBreak", "updateBreak"]),
    handleSubmitBreak() {
      if (this.breakState == "Edit") {
        this.updateBreak({
          id: this.id,
          name: this.name,
          description: this.description,
          allowed_per_day: this.breaks,
          maximum_allowed_time: this.minutes,
        });
      } else {
        this.addBreak({
          name: this.name,
          description: this.description,
          allowed_per_day: this.breaks,
          maximum_allowed_time: this.minutes,
        });
        this.name = "";
        this.description = "";
        this.minutes = "";
        this.breaks = "";
      }
      this.showModal = false;
    },
  },
};
</script>

<style></style>
