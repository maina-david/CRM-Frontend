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
                  Add Users to Chat Queue
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>
            <slot>
              <CheckBoxList :options="selectUsers" v-model:value="users" />

              <ActionButton class="mt-5" text="Add Users" />
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";

import ActionButton from "@/components/ActionButton.vue";
import CheckBoxList from "@/components/CheckBoxList.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentGroup: {
    type: Object,
    default: {},
  },
  currentAccountType: {
    type: Object,
    default: {},
  },
};
export default {
  name: "AddUsersToChatQueue",
  props,
  components: { ActionButton, CheckBoxList },
  data() {
    return {
      select: "Select users to add",
      text: "",
      users: [],
      selectUsers: [
        { label: "User 1", value: "user 1" },
        { label: "User 2", value: "user 2" },
        { label: "User 3", value: "user 3" },
        { label: "User 4", value: "user 4" },
        { label: "User 5", value: "user 5" },
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
