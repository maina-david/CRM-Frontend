<template>
  <teleport to="body">
    <div class="flex items-start justify-center min-h-screen pt-24 text-center">
      <transition
        enter-active-class="transition ease-out duration-300 transform "
        enter-from-class="opacity-0 translate-y-10 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
      >
        <div
          class="shadow-2xl p-8"
          role="dialog"
          ref="modal"
          aria-modal="true"
          v-show="showModal"
          aria-labelledby="modal-headline"
        >
          <div class="border-b">
            <div class="">
              <button class="absolute top-4 right-4">
                <span class="material-icons" @click="closeModal">close</span>
              </button>
            </div>
          </div>

          <div class="mt-5">
            <Dialer />
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import Dialer from "../../dialpad/Dialer.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: "DialerModal",
  props,
  components: { Dialer },
  methods: {
    log(s) {
      console.log(s);
    },
  },
  data() {
    return {};
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
