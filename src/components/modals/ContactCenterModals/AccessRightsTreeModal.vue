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
                <h2 class="font-semibold">
                  Add Access Rights to this Role Profile
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <tree
                class="p-3"
                :nodes="nodes"
                :config="config"
                @nodeOpened="log(`node-opened`)"
                @nodeClosed="log('node-closed')"
                @nodeFocus="log('node-focus')"
                @nodeToggle="log('node-toggle')"
                @nodeBlur="log('node-blur')"
                @nodeEdit="log('node-edit')"
                @nodeChecked="log('node-checked')"
                @nodeUnchecked="log('node-unchecked')"
                @nodeDragstart="log('node-dragstart')"
                @nodeDragenter="log('node-dragenter')"
                @nodeDragleave="log('node-dragleave')"
                @nodeDragend="log('node-dragend')"
                @nodeOver="log('node-over')"
                @nodeDrop="log('node-drop')"
              />
              <ActionButton class="mt-5" text="Submit" />
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import treeview from "vue3-treeview";
import "vue3-treeview/dist/style.css";
import ActionButton from "../../ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};
export default {
  name: "UpdateRoleProfileModal",
  props,
  components: { tree: treeview, ActionButton },
  methods: {
    log(s) {
      console.log(s);
    },
  },
  data() {
    return {
      nodes: {
        id1: {
          text: "User Management",
          children: ["id11", "id12", "id7"],
        },
        id11: {
          text: "User",
          children: [
            "Send Invitations",
            "Revoke Invitations",
            "Update Role Profile",
            "Deactivate User",
          ],
        },
        id12: {
          text: "Channel Management",
          children: [
            "Send Invitations",
            "Revoke Invitations",
            "Update Role Profile",
            "Deactivate User",
          ],
        },
        id2: {
          text: "IVR Management",
          children: ["id3", "id4", "id5", "id6"],
        },
        id3: {
          text: "Queue Management",
          children: [
            "Send Invitations",
            "Revoke Invitations",
            "Update Role Profile",
            "Deactivate User",
          ],
        },
        id4: {
          text: "Call Management",
          children: [
            "Send Invitations",
            "Revoke Invitations",
            "Update Role Profile",
            "Deactivate User",
          ],
        },
        id5: {
          text: "Dialers",
          children: [
            "Send Invitations",
            "Revoke Invitations",
            "Update Role Profile",
            "Deactivate User",
          ],
        },
        id6: {
          text: "Reports",
          children: [
            "Send Invitations",
            "Revoke Invitations",
            "Update Role Profile",
            "Deactivate User",
          ],
        },
        id7: {
          text: "Billing",
          children: [
            "Send Invitations",
            "Revoke Invitations",
            "Update Role Profile",
            "Deactivate User",
          ],
        },
      },
      config: {
        roots: [
          "id1",
          "id2",
          "id3",
          "id4",
          "id5",
          "id6",
          "id7",
          "id11",
          "id12",
        ],
        checkboxes: true,
        dragAndDrop: true,
        editable: true,
      },
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
