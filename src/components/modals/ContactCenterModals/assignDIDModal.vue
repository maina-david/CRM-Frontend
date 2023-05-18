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
                  Assign DID to {{ currentUser.name }}
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <Dropdown
                  class="my-3"
                  select="Select DID"
                  label="Select DID"
                  :options="selectAllocatedDids"
                  v-model="selected_did"
                />
                <ActionButton
                  @click="
                    assignClickToCallDID({
                      agent_id: currentUser.id,
                      did: selected_did,
                    })
                  "
                  text="AssignDID"
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

import { mapGetters, mapActions } from "vuex";
import ActionButton from "../../ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";
export default {
  methods: {
    ...mapActions(["assignClickToCallDID"]),
  },
  name: "assignDIDModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  components: { Dropdown, ActionButton },
  computed: {
    ...mapGetters(["selectAllocatedDids"]),
  },
  data() {
    return {
      update: "Update",
      name: "",
      description: "",
      selected_did: "",
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
