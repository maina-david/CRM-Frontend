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
                  {{ currentChatBot.name }} Linked Accounts
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-1">
                <Dropdown
                  label="Select a channel"
                  :options="selectsupportedChannelBox"
                  v-model="channel_id"
                />
                <div v-if="channel_id" class="flex flex-row">
                  <LinkedAccountsTable
                    @updatedModal="handleUpdatedModal"
                    :tableData="linkedChatBotAccounts"
                    :tableHead="chatQueueTeamHead"
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
import LinkedAccountsTable from "@/components/tables/ChatTables/LinkedAccountsTable.vue";
import Dropdown from "@/components/Dropdown.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  currentChatBot: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "LinkedAccountsModal",
  props,
  components: {
    LinkedAccountsTable,
    Dropdown,
  },
  data() {
    return {
      channel_id: "",
      chatQueueTeamHead: ["Channel", "Account Name"],
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
    this.channel_id = "";
    this.getSupportedChannelBox();
  },
  updated() {
    this.channel_id = "";
  },
  watch: {
    channel_id: function (val) {
      console.log("channel id val", val);
      if (val !== "") {
        this.getLinkedChatBotAccounts({
          chatbot_id: this.currentChatBot.id,
          channel_id: val,
        });
      }
    },
  },
  methods: {
    ...mapActions(["getLinkedChatBotAccounts", "getSupportedChannelBox"]),
    handleUpdatedModal() {
      this.channel_id = "";
      this.closeModal();
    },
  },
  computed: {
    ...mapGetters(["linkedChatBotAccounts", "selectsupportedChannelBox"]),
  },
};
</script>

<style></style>
