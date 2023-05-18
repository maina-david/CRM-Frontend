<template>
  <main>
    <div class="m-10">
      <div class="flex justify-between border-b">
        <div>
          <h2 class="font-bold text-xl p-3">All Completed Reviews</h2>
        </div>
      </div>
      <div class="bg-white p-1 mt-5">
        <CompletedReviewTable
          :tableHead="reviewsTableHead"
          :tableData="qualityAssuranceClosedReviews"
        />
      </div>
      <CreateTicketModal :show="showCreateTicketModal" />
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import CreateTicketModal from "@/components/modals/CRMModals/CreateTicketModal.vue";
import CompletedReviewTable from "@/components/tables/QAManagementTables/CompletedReviewTable.vue";

export default {
  components: { CreateTicketModal, CompletedReviewTable },
  data() {
    return {
      reviewsTableHead: [
        "Interaction Id",
        "Agent Name",
        "Call Date",
        "Team",
        "Score",
        "Channel",
        "Reviewed On",
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
    this.getQualityAssuranceClosedReviews();
  },
  methods: {
    ...mapActions(["getQualityAssuranceClosedReviews"]),
  },
  computed: {
    ...mapGetters(["qualityAssuranceClosedReviews"]),
  },
};
</script>

<style></style>
