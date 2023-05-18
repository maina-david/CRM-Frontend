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
                  {{ currentState }} MOH
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <TextBox
                  type="text"
                  placeholder="Enter MOH Name"
                  label="MOH Name"
                  v-model="name"
                />
                <TextBox
                  type="text"
                  placeholder="Give a Description of the MOH"
                  label="MOH Description"
                  v-model="description"
                />
                <ActionButton
                  @click="handleMoh"
                  :text="currentState"
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
import { mapActions } from "vuex";
import TextBox from "../../TextBox.vue";
import ActionButton from "../../ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentState: {
    type: String,
    required: true,
  },
  currentMoh: {
    type: Object,
    required: true,
  },
};
export default {
  name: "UpdateModal",
  props,
  components: { TextBox, ActionButton },
  data() {
    return {
      id: "",
      name: "",
      description: "",
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
    if (this.currentState == "Edit") {
      this.id = this.currentMoh.id;
      this.name = this.currentMoh.name;
      this.description = this.currentMoh.description;
    } else {
      this.name = "";
      this.description = "";
    }
  },
  methods: {
    ...mapActions(["createMoh", "editMoh"]),
    handleMoh() {
      console.log("creating");
      if (this.currentState == "Edit") {
        this.editMoh({
          id: this.id,
          name: this.name,
          description: this.description,
        });
      } else {
        this.createMoh({
          name: this.name,
          description: this.description,
        });
      }
      this.name = "";
      this.description = "";
      this.showModal = false;
    },
  },
};
</script>

<style></style>
