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
                  Create Social Media Account
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <Dropdown
                  :options="options"
                  label="Select the Social Media Platform"
                  select="Select Platform"
                  :modelValue="platform"
                />
                <TextBox
                  type="text"
                  placeholder="Enter Account Name"
                  label="Account Name"
                  v-model="name"
                />
                <TextBox
                  type="text"
                  placeholder="Give a Description of the Account"
                  label="Account Description"
                  v-model="description"
                />
                <TextBox
                  type="text"
                  placeholder="Enter phone number"
                  label="Phone number"
                  v-model="phone"
                />
                <ActionButton
                  @click="handleCreateAccount"
                  text="Create Social Media Account"
                  class="mt-5"
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
import Dropdown from "@/components/Dropdown.vue";

import ActionButton from "@/components/ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: "CreateSocialMediaAccount",
  props,
  components: { TextBox, ActionButton, Dropdown },
  data() {
    return {
      name: "",
      description: "",
      platform: "",
      phone: "",
      options: [
        { label: "Whatsapp", value: "Whatsapp" },
        { label: "Instagram", value: "Instagram" },
        { label: "Facebook", value: "Facebook" },
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
    handleCreateAccount() {
      this.showModal = false;
    },
  },
};
</script>

<style></style>
