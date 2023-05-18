<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Reviewer's Scoring Report</h2>
        </div>
      </div>
      <div class="grid grid-cols-3 mt-10 gap-3">
        <div class="bg-white p-2 col-span-1">
          <ReviewerReportPerQuestion />
        </div>
        <div class="bg-white p-2 col-span-2">
          <ReviewerReportTable
            :tableHead="reportTableHead"
            :tableData="reportTableData"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ReviewerReportTable from "@/components/tables/QAManagementTables/ReviewerReportTable.vue";
import ReviewerReportPerQuestion from "@/components/cards/QACards/ReviewerReportPerQuestion.vue";
import { ref } from "vue";

export default {
  components: { ReviewerReportTable, ReviewerReportPerQuestion },
  data() {
    return {
      audioURL: "",
      reportTableHead: [
        "Agent Name",
        "Total Score",
        "Channel",
        "Handling Time",
        "Action",
      ],
      channel: "voice",
      reportTableData: [
        {
          name: "Linda Tonui",
          achieved_score: 45,
          total_score: 60,
          handling_time: "2 minutes",
          channel: "Voice",
          file_url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        },
        {
          name: "Jane Doe",
          achieved_score: 13,
          total_score: 60,
          handling_time: "7 minutes",
          channel: "Whatsapp",
        },
        {
          name: "Linda Tonui",
          achieved_score: 45,
          total_score: 60,
          handling_time: "2 minutes",
          channel: "Voice",
          file_url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        },
        {
          name: "Linda Tonui",
          achieved_score: 45,
          total_score: 60,
          handling_time: "2 minutes",
          channel: "Instagram",
        },
      ],
      teamTableData: [
        {
          question: "Did the agent begin with greetings?",
          type: "toggle",
        },
        {
          question: "How would you rate the agent's performance?",
          type: "scale",
          max_range: "300",
        },
      ],
    };
  },
  setup() {
    const showCreateTeamModal = ref(false);
    const showChatTranscriptModal = ref(false);

    return {
      showCreateTeamModal,
      showChatTranscriptModal,
    };
  },
};
</script>

<style></style>
