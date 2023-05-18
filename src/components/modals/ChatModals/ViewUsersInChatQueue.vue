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
                  {{ currentQueue.name }} Users
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-1">
                <div class="flex flex-row">
                  <div class="mx-6 pr-6 border-r-2">
                    <Radio
                      :label="'Add Users to ' + currentQueue.name"
                      :options="selectUsers"
                      v-model="newChatQueueUser"
                    />
                    <ActionButton
                      v-if="newChatQueueUser"
                      @click="handleAddChatQueueUser"
                      text="Add User to Chat Queue"
                    />
                  </div>
                  <label
                    for="chatQueue"
                    class="form-label text-xs inline-block mb-2 text-gray-700"
                    >{{ currentQueue.name }} Users</label
                  >
                  <RemoveUserFromChatQueueTable
                    @updatedModal="handleUpdatedModal"
                    :tableData="currentQueue.users"
                    :tableHead="chatQueueTeamHead"
                    :chatQueueId="currentQueue.id"
                  />
                </div>
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
import { mapActions, mapGetters } from "vuex";
import RemoveUserFromChatQueueTable from "@/components/tables/ChatTables/RemoveUserFromChatQueueTable.vue";
import Radio from "@/components/Radio.vue";
import ActionButton from "@/components/ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentQueue: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "ViewUsersInChatQueue",
  props,
  components: {
    RemoveUserFromChatQueueTable,
    Radio,
    ActionButton,
  },
  data() {
    return {
      newChatQueueUser: "",
      chatQueueTeamHead: ["Name", "Email", "Phone Number", "Actions"],
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
  methods: {
    ...mapActions(["getUsers", "addUserToChatQueue"]),
    handleAddChatQueueUser() {
      this.addUserToChatQueue({
        user_id: this.newChatQueueUser,
        chat_queue_id: this.currentQueue.id,
      });
      this.closeModal();
    },
    handleUpdatedModal() {
      this.closeModal();
    },
  },
  computed: {
    ...mapGetters(["selectUsers"]),
  },
};
</script>

<style></style>
