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
                <div>
                  <h2 class="font-medium text-blue-400">
                    Survey Form Response
                  </h2>
                </div>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <div
                  v-for="response in surveyResponseDetails"
                  :key="response.id"
                >
                  <div class="my-3">
                    <div class="p-3 bg-slate-50 flex">
                      <div class="my-1">
                        <h3 class="text-sm font-semibold">
                          {{ response.question }} :
                        </h3>
                      </div>
                      <div class="my-1">
                        <h4 class="text-sm font-medium">
                          {{ response.answer }}
                        </h4>
                      </div>
                    </div>
                  </div>
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
import { ref, watch } from "vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentAccountForm: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "CreateForm",
  props,
  data() {
    return {
      id: "",
      name: "",
      surveyResponseDetails: [
        {
          question: "What is your name?",
          answer: "Jane Doe",
        },
        {
          question: "What is the name of the agent that served you?",
          answer: "Jonathan Doe",
        },
        {
          question: "How would you rate our service today?",
          answer: "12/10",
        },
        {
          question: "In your opinion, what would you need us to improve?",
          answer:
            "I would appreciate if the call were picked faster so that i am not put on hold for so long",
        },
        {
          question: "Any Other thing you would want us to know?",
          answer: "No, Thank you!",
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
};
</script>

<style></style>
