<template>
  <div>
    <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
      <h2 class="font-bold text-lg py-2 mb-3 border-b">Interaction Details</h2>
      <div class="my-5 bg-slate-100 p-3">
        <div>
          <h2 class="font-bold text-md">Chat History</h2>
        </div>
        <div v-if="ticketDetail.ticket_interactions.length == 0">
          <span
            class="p-2 bg-orange-100 text-orange-700 flex justify-center m-5"
            >No Chat Interactions</span
          >
        </div>

        <div
          class="border-b flex justify-between py-2 px-3 my-3"
          v-if="ticketDetail.ticket_interactions.length > 0"
        >
          <div>
            <h6 class="text-sm py-2 font-semibold">Channel</h6>
          </div>
          <div>
            <h6 class="text-sm py-2 font-semibold">Agent</h6>
          </div>
          <div>
            <h6 class="text-sm py-2 font-semibold">Date</h6>
          </div>
          <div>
            <h6 class="text-sm py-2 font-semibold">Action</h6>
          </div>
        </div>
        <div
          v-for="interaction in ticketDetail.ticket_interactions"
          :key="interaction"
        >
          <div
            class="border-b flex justify-between py-2 px-3 m-3"
            v-if="interaction.channel === 'WhatsApp'"
          >
            <div>
              <h6 class="text-sm py-2">
                <img class="w-6 h-6 rounded-full order-1" :src="WhatsAppIcon" />
              </h6>
            </div>
            <div>
              <h6 class="text-sm py-2">{{ interaction.conversation.agent }}</h6>
            </div>
            <div>
              <h6 class="text-sm py-2">
                {{ format_time(interaction.conversation.date) }}
              </h6>
            </div>
            <div>
              <ActionButton
                @click="
                  (showChatTranscript = !showChatTranscript),
                    set_transcript_data(interaction)
                "
                text="View Transcript"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="my-5 bg-slate-100 p-3">
        <div class="my-2">
          <div class="my-2 flex justify-between">
            <div>
              <h2 class="font-bold text-md">Call History</h2>
            </div>
            <div class="mx-2">
              <audio id="player" class="" controls="controls">
                <source id="mp3_src" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
        <div v-if="ticketDetail.ticket_interactions.length == 0">
          <span
            class="p-2 bg-orange-100 text-orange-700 flex justify-center m-5"
            >No Call Interactions</span
          >
        </div>
        <div
          class="border-b flex justify-between py-2 px-3"
          v-if="ticketDetail.ticket_interactions.length > 0"
        >
          <div>
            <h6 class="text-sm py-2 font-semibold">Status</h6>
          </div>
          <div>
            <h6 class="text-sm py-2 font-semibold">Queue</h6>
          </div>
          <div>
            <h6 class="text-sm py-2 font-semibold">Agent</h6>
          </div>
          <div>
            <h6 class="text-sm py-2 font-semibold">Action</h6>
          </div>
          <div>
            <h6 class="text-sm py-2 font-semibold">Date</h6>
          </div>
        </div>

        <div
          v-for="interaction in ticketDetail.ticket_interactions"
          :key="interaction"
        >
          <div
            class="py-2 px-3 bg-slate-50 gap-3"
            v-if="interaction.channel === 'Voice'"
          >
            <div class="flex justify-between">
              <div>
                <h3 class="text-xs my-2">
                  {{ interaction.calls[0].call_status }}
                </h3>
              </div>
              <div>
                <h3 class="text-xs my-2">
                  {{ interaction.calls[0].call_detail[0].queue }}
                </h3>
              </div>
              <div>
                <h3 class="text-xs my-2">
                  {{ interaction.calls[0].call_detail[0].agent }}
                </h3>
              </div>
              <div>
                <h3 class="text-xs my-2">
                  {{ interaction.calls[0].call_detail[0].duration }}
                </h3>
              </div>
              <div>
                <h4 class="text-xs font-light my-2">
                  <MusicPlayer
                    :modelValue="audioUrl"
                    @click="
                      toggleAudio(
                        'https://goipspace.fra1.digitaloceanspaces.com/recordings/' +
                          interaction.calls[0].call_id +
                          '.wav'
                      )
                    "
                  />
                </h4>
              </div>
              <div>
                <h4 class="text-xs font-medium my-2">
                  {{ format_time(interaction.calls[0].call_date) }}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ChatTranscriptModal :show="showChatTranscript" />
</template>

<script>
import ChatTranscriptModal from "@/components/modals/ChatModals/ChatTranscriptModal.vue";
import ActionButton from "@/components/ActionButton.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import moment from "moment";

import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["ticketDetail"]),
  },
  components: { ChatTranscriptModal, ActionButton, MusicPlayer },
  setup() {
    const showChatTranscript = ref(false);

    return {
      showChatTranscript,
    };
  },
  methods: {
    ...mapActions(["storeCurrentTicketChatTranscript"]),
    set_transcript_data(interaction) {
      console.log("this is the chat transcript interaction", interaction);
      this.storeCurrentTicketChatTranscript(interaction.conversation.messages);
    },
    format_time(data) {
      var moment_date = moment(data).format("YYYY-MM-DD, h:mm:ss a");
      return moment(moment_date).startOf("minute").fromNow();
    },
    toggleAudio(sourceUrl) {
      var audio = document.getElementById("player");
      var source = document.getElementById("mp3_src");
      source.src = sourceUrl;
      audio.pause();
      console.log(sourceUrl);
      console.log(audio);
      if (sourceUrl) {
        audio.load();
        audio.play();
      }
    },
  },
  data() {
    return {
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
      accountDetail: {
        chatHistory: [
          { channel: "whatsapp", name: "Jane Doe", date: "23rd September" },
          { channel: "instagram", name: "Jane Doe", date: "23rd September" },
          { channel: "twitter", name: "Jane Doe", date: "23rd September" },
          { channel: "facebook", name: "Jane Doe", date: "23rd September" },
        ],
        callHistory: [
          {
            date: "23rd September 2022",
            file_url:
              "https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1661320915_04-Forward.mp3",
            duration: "00:58:48",
          },
          {
            date: "21st September 2022",
            file_url:
              "https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1661320915_04-Forward.mp3",
            duration: "00:01:48",
          },
          {
            date: "3rd September 2022",
            file_url:
              "https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1661320915_04-Forward.mp3",
            duration: "00:00:48",
          },
        ],
      },
    };
  },
};
</script>

<style></style>
