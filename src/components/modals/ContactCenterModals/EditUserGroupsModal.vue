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
                  Add Users to this group
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <CheckBoxList :options="selectUsers" v-model:value="users" />

              <ActionButton
                @click="handleManageUsers"
                class="mt-5"
                text="Add Users"
              />
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import { mapActions, mapGetters } from "vuex";

import ActionButton from "../../ActionButton.vue";
import CheckBoxList from "../../CheckBoxList.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentGroup: {
    type: Object,
    default: {},
  },
};
export default {
  name: "EditUserGroupsModal",
  props,
  components: { ActionButton, CheckBoxList },
  methods: {
    ...mapActions(["getUsers", "assignUsersToGroup"]),
    handleManageUsers() {
      this.assignUsersToGroup({
        group_id: this.currentGroup.id,
        user_ids: this.users,
      });
      this.closeModal();
    },
    log(s) {
      console.log(s);
    },
  },
  data() {
    return {
      select: "Select users to add",
      text: "",
      users: [],
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
  created() {
    this.getUsers();
  },
  updated() {
    if (this.currentGroup.length <= 0) {
      this.users = [];
    } else {
      this.users = this.currentGroup.users.map((user) => {
        return user.id;
      });
    }
  },
  computed: {
    ...mapGetters(["selectUsers"]),
  },
};
</script>

<style></style>
