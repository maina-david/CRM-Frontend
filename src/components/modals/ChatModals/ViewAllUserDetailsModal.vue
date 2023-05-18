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
                <h2 class="font-medium text-blue-400">All User Details</h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-1">
                <div class="grid grid-cols-8 mt-3 gap-4">
                  <div class="col-span-8">
                    <div
                      class="text-sm font-medium text-center mt-5 text-gray-600 dark:text-gray-400 dark:border-gray-700"
                    >
                      <ul class="flex h-full p-0 m-2 list-none">
                        <li
                          v-for="menuItem in menuItems"
                          :key="menuItem"
                          @click="activeTab = menuItem"
                          :class="[
                            'tab_btn',
                            { selected: activeTab === menuItem },
                          ]"
                          class="h-full first:ml-0 w-full block p-2 max-w-sm"
                        >
                          {{ menuItem }}
                        </li>
                      </ul>
                    </div>
                    <keep-alive>
                      <component
                        :is="activeTab"
                        :recentConversations="
                          currentCallDetails.social_interaction
                        "
                        :campaignData="currentCallDetails.recent_campaign"
                      />
                    </keep-alive>
                  </div>
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
import CRMDetails from "@/components/cards/IncomingCallDialerCards/CRMDetails.vue";
import RecentTickets from "@/components/cards/IncomingCallDialerCards/RecentTickets.vue";
import CallLogs from "@/components/cards/IncomingCallDialerCards/CallLogs.vue";
import CampaignDetails from "@/components/cards/IncomingCallDialerCards/CampaignDetails.vue";
import SocialMedia from "@/components/cards/IncomingCallDialerCards/SocialMedia.vue";
import RecentConversations from "@/components/cards/IncomingCallDialerCards/RecentConversations.vue";
import { mapActions, mapGetters } from "vuex";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentAccountForm: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  watch: {
    currentConversationDetails() {
      console.log("i am changing from watch", this.currentConversationDetails);
    },
  },
  created() {},
  computed: {
    ...mapGetters(["currentConversationDetails"]),
  },
  methods: {
    ...mapActions(["getCurrentCall"]),
  },
  name: "CreateForm",
  props,
  components: {
    CRMDetails,
    RecentTickets,
    CallLogs,
    CampaignDetails,
    SocialMedia,
    RecentConversations,
  },
  data() {
    return {
      id: "",
      name: "",
      description: "",
      menuItems: [
        "CRMDetails",
        "RecentTickets",
        "CallLogs",
        "RecentConversations",
        "CampaignDetails",
      ],
      activeTab: "CRMDetails",
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
