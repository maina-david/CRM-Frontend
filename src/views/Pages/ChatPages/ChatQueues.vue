<template>
  <main>
    <div class="m-10">
      <div class="flex justify-between border-b p-3 mt-10">
        <div class="">
          <h2 class="font-bold text-lg">Chat Queue Management</h2>
        </div>
        <div>
          <ActionButton
            @click="handleShowQueueModal('Create', {})"
            text="Create Chat Queue"
          />
        </div>
      </div>
      <div>
        <ChatQueueTable
          :tableData="chatQueues"
          :tableHead="chatQueueTableHead"
        />
      </div>
    </div>
    <CreateChatQueueModal
      :state="state"
      :currentQueue="currentQueue"
      :show="showChatQueueModal"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ChatQueueTable from "@/components/tables/ChatTables/ChatQueueTable.vue";
import CreateChatQueueModal from "@/components/modals/ChatModals/CreateChatQueueModal.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  components: { ChatQueueTable, ActionButton, CreateChatQueueModal },
  data() {
    return {
      state: "",
      currentQueue: {},
      chatQueueTableHead: [
        "name",
        "description",
        "Active",
        "timeout (seconds)",
        "Max Open Conversations",
        "auto reply message",

        "Actions",
      ],
    };
  },
  setup() {
    const showChatQueueModal = ref(false);

    return {
      showChatQueueModal,
    };
  },
  created() {
    this.getChatQueue();
  },
  methods: {
    ...mapActions(["getChatQueue"]),
    handleShowQueueModal(state, queue) {
      this.state = state;
      this.currentQueue = queue;
      this.showChatQueueModal = !this.showChatQueueModal;
    },
  },
  computed: {
    ...mapGetters(["chatQueues"]),
  },
};
</script>

<style></style>
