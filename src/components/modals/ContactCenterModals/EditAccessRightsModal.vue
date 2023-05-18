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
                  Edit Access Rights to this Role Profile
                </h2>
                <!-- <p>{{ editedAccessRights }}</p> -->
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <tree
                class="p-3"
                :nodes="accessRightsGroupedFormatted"
                :config="config"
                @nodeChecked="log(nodes)"
                @nodeUnchecked="log(nodes)"
              />
              <ActionButton
                class="mt-5"
                text="Submit"
                @click="handleEditedAccessRights"
              />
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ref, watch } from "vue";
import treeview from "vue3-treeview";
import "vue3-treeview/dist/style.css";
import ActionButton from "../../ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentAccessRightId: {
    type: String,
    default: "",
  },
};
export default {
  created() {
    console.log(this.accessRoot);
  },
  updated() {},
  computed: {
    ...mapGetters(["accessRoot", "accessRightsGroupedFormatted"]),
  },
  name: "UpdateRoleProfileModal",
  props,
  components: { tree: treeview, ActionButton },
  methods: {
    ...mapActions(["assignAccessRightsToRoleProfile"]),
    log(s) {
      // console.log(s);
      var selected = [];
      for (var key in s) {
        var obj = s[key];
        // console.log(obj);
        if (!obj.children) {
          for (var prop in obj) {
            if (prop == "state") {
              if (obj[prop].checked) {
                selected.push(obj.text);
                console.log(prop + " = " + obj[prop].checked);
              }
            }
          }
        }
      }
      this.editedAccessRights = selected;
    },
    nodechecking(e) {
      console.log(e);
    },
    handleEditedAccessRights() {
      this.assignAccessRightsToRoleProfile({
        role_profile_id: this.currentAccessRightId,
        access_name: this.editedAccessRights,
      });
      this.closeModal();
    },
  },
  data() {
    return {
      editedAccessRights: "",
      nodes: {
        id1: {
          text: "channel management",
          children: ["id2"],
        },
        id2: {
          text: "Channel Management",
        },
        id3: {
          text: "Calls",
          children: ["id4", "id5", "id6"],
        },
        id4: {
          text: "Click to Call",
        },
        id5: {
          text: "Inbound Calls",
        },
        id6: {
          text: "Outbound Calls",
        },
        id7: {
          text: "company management",
          children: ["id8", "id9"],
        },
        id8: {
          text: "Company Management",
        },
        id9: {
          text: "Group Management",
        },
        id10: {
          text: "user management",
          children: ["id11", "id12", "id13"],
        },
        id11: {
          text: "Invitation Management",
        },
        id12: {
          text: "Role Profile",
        },
        id13: {
          text: "User Management",
        },
        id14: {
          text: "IVR manager",
          children: ["id15"],
        },
        id15: {
          text: "IVR Manager",
        },
        id16: {
          text: "Queue Management",
          children: ["id17", "id18", "id19", "id20"],
        },
        id17: {
          text: "Queue Management",
        },
        id18: {
          text: "Queue Agent Management",
        },
        id19: {
          text: "MOH Manager",
        },
        id20: {
          text: "MOH Queue Manager",
        },
        id21: {
          text: "CRM",
          children: ["id22", "id23", "id24", "id25", "id26"],
        },
        id22: {
          text: "Sales Users",
        },
        id23: {
          text: "Customer Account User",
        },
        id24: {
          text: "Customer Service User",
        },
        id25: {
          text: "Customer Account Managers",
        },
        id26: {
          text: "Sales Manager",
        },
      },
      config: {
        roots: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0],
        checkboxes: true,
        dragAndDrop: false,
        editable: true,
        checkMode: 0,
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
