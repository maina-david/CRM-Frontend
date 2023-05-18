<template>
  <main>
    <div class="m-10">
      <div class="flex justify-between border-b">
        <div>
          <h2 class="font-bold text-xl p-3">Open Reviews</h2>
        </div>
        <div>
          <router-link :to="{ name: 'CompletedReviews' }">
            <ActionButton text="Completed Reviews" />
          </router-link>
        </div>
      </div>
      <div
        class="text-sm font-medium text-center mt-5 text-gray-600 dark:text-gray-400 dark:border-gray-700"
      >
        <ul class="flex h-full p-0 m-2 list-none">
          <li
            v-for="menuItem in menuItems"
            :key="menuItem"
            @click="activeTab = menuItem"
            :class="['tab_btn', { selected: activeTab === menuItem }]"
            class="h-full first:ml-0 w-full block p-2 max-w-sm"
          >
            {{ menuItem }}
          </li>
        </ul>
      </div>
      <keep-alive>
        <component
          :is="activeTab"
          :tableHead="reviewsTableHead"
          :tableData="qualityAssuranceOpenReviews"
        />
      </keep-alive>
      <CreateTicketModal :show="showCreateTicketModal" />
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import CreateTicketModal from "@/components/modals/CRMModals/CreateTicketModal.vue";
import MyAssignedReviews from "@/MenuItems/QualityAssuranceMenuItems/MyAssignedReviews.vue";
import AllReviews from "@/MenuItems/QualityAssuranceMenuItems/AllReviews.vue";

export default {
  components: {
    ActionButton,
    CreateTicketModal,
    AllReviews,
    MyAssignedReviews,
  },
  data() {
    return {
      menuItems: ["AllReviews", "MyAssignedReviews"],
      activeTab: "MyAssignedReviews",
      reviewsTableHead: [
        "Interaction Id",
        "Call Date",
        "Team",
        "Channel",
        "action",
      ],
      reviewsTableData: [
        {
          interaction_id: "TSC- 09875",
          agent_name: "Jane Doe",
          call_date: "23rd September 2022",
          queue: "Test Queue",
          channel: "WhatsApp",
        },
        {
          interaction_id: "TSC- 09875",
          agent_name: "Queen Doe",
          call_date: "29rd October 2022",
          queue: " Queue 1",
          channel: "Instagram",
        },
        {
          interaction_id: "TSC- 09875",
          agent_name: "Jane Doe",
          call_date: "23rd September 2022",
          queue: "Test Queue",
          channel: "Voice",
        },
        {
          interaction_id: "TSC- 09875",
          agent_name: "Queen Doe",
          call_date: "29rd October 2022",
          queue: " Queue 1",
          channel: "Twitter",
        },
        {
          interaction_id: "TSC- 09875",
          agent_name: "Jane Doe",
          call_date: "23rd September 2022",
          queue: "Test Queue",
          channel: "Voice",
        },
        {
          interaction_id: "TSC- 09875",
          agent_name: "Queen Doe",
          call_date: "29rd October 2022",
          queue: " Queue 1",
          channel: "Facebook",
        },
      ],
      ticketForm: "",
    };
  },
  setup() {
    const showCreateTicketModal = ref(false);

    return {
      showCreateTicketModal,
    };
  },
  created() {
    this.getQualityAssuranceOpenReviews();
  },
  methods: {
    ...mapActions(["getQualityAssuranceOpenReviews"]),
  },
  computed: {
    ...mapGetters(["qualityAssuranceOpenReviews"]),
  },
};
</script>

<style>
.tab-btn {
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 2px solid #cccccc;
  outline: none;
}
.selected {
  border-bottom: 3px solid #84cc16;
}
</style>
