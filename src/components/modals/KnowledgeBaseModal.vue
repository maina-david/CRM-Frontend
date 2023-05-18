<template>
  <teleport to="body">
    <div class="flex items-start justify-end min-h-screen pt-24 text-center">
      <transition
        enter-active-class="transition ease-out duration-300 transform"
        enter-from-class="opacity-0 translate-y-10 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
      >
        <div
          class="fixed shadow-2xl p-8 bg-white rounded-lg bottom-5 right-8 ring-offset-2 ring-4"
          role="dialog"
          ref="modal"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="border-b">
            <div class="p-3">
              <h2 class="font-medium">Knowledge Base</h2>
              <div class="flex gap-6">
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>
          </div>

          <div class="">
            <Knowledge />
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import Knowledge from "@/components/cards/Knowledge.vue";
const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: "IncomingCallModal",
  props,
  components: { Knowledge },
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
