<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">
            Review Interaction {{ interactionData.interaction_reference }}
          </h2>
        </div>

        <div>
          <div v-if="interactionData.channel === 'Voice'">
            <audio
              id="player"
              class="mb-5"
              controls="controls"
              @click="toggleAudio()"
            >
              <source :src="audioURL" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <div v-else>
            <ActionButton
              @click="handleChatTranscript()"
              text="View Chat Transcript"
            />
          </div>
        </div>
      </div>
      <div class="bg-white p-2 mt-10">
        <ReviewInteractionTable
          :interaction="interactionData"
          :tableHead="teamTableHead"
          :tableData="interactionData.form.q_a_form_items"
        />
      </div>
    </div>
    <ChatTranscriptModal :show="showChatTranscriptModal" />
  </main>
</template>

<script>
import ReviewInteractionTable from "@/components/tables/QAManagementTables/ReviewInteractionTable.vue";
import ActionButton from "@/components/ActionButton.vue";
import { mapGetters, mapActions } from "vuex";
import { ref } from "vue";
import ChatTranscriptModal from "@/components/modals/ChatModals/ChatTranscriptModal.vue";

export default {
  created() {
    this.audioURL =
      "https://goipspace.fra1.cdn.digitaloceanspaces.com/recordings/" +
      this.interactionData.interaction_reference +
      ".wav";
    console.log("this is the interaction data", this.interactionData);
  },
  methods: {
    ...mapActions(["storeCurrentTicketChatTranscript"]),
    handleChatTranscript() {
      this.storeCurrentTicketChatTranscript(
        this.interactionData.conversation.messages
      );
      this.showChatTranscriptModal = !this.showChatTranscriptModal;
    },
  },
  computed: {
    ...mapGetters(["interactionData", "currentTicketChatTranscript"]),
  },
  components: { ReviewInteractionTable, ActionButton, ChatTranscriptModal },
  data() {
    return {
      audioURL: "",
      teamTableHead: ["Question", "Review", "Comment"],
      channel: "voice",
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
