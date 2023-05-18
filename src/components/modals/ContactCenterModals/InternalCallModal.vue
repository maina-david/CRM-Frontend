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
              <h2 class="font-medium text-blue-400" v-if="state === 'Incoming'">
                Incoming Call
              </h2>
              <h2 class="font-medium text-blue-400" v-if="state === 'Outgoing'">
                Outgoing call
              </h2>
              <button class="absolute top-4 right-4">
                <span class="material-icons" @click="closeModal">close</span>
              </button>
            </div>
          </div>

          <div class="">
            <InternalCall
              :callSource="state"
              :agentDataInternal="agentDataInternal"
            />
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import { mapGetters } from "vuex";
import InternalCall from "@/components/dialpad/InternalCall.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  agentData: {
    type: Object,
  },
  state: {
    type: String,
  },
};
export default {
  created() {
    this.agentDataInternal = this.agentData;
    localStorage.setItem(
      "transferData",
      JSON.stringify(this.agentDataInternal)
    );
  },
  computed: {
    ...mapGetters(["currentCallDetails"]),
  },

  updated() {
    this.agentDataInternal = this.agentData;
  },
  name: "InternalCallModal",
  props,
  components: { InternalCall },
  methods: {
    log(s) {
      console.log(s);
    },
  },
  data() {
    return {
      callSource: "",
      agentDataInternal: {},
    };
  },
  setup(props) {
    const showModal = ref(false);

    function closeModal() {
      console.log("THIS IS INTERNAL CALL MODAL CLOSING");
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
