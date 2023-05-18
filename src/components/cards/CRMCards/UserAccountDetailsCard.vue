<template>
  <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
    <div class="border-b flex justify-between py-2">
      <div>
        <h2 class="font-bold text-lg py-2">Account Details</h2>
      </div>
      <div class="flex gap-3">
        <ActionButton
          text="Edit Account"
          @click="handleEditAccount(accountDetails, 'Edit')"
        />
      </div>
    </div>
    <div class="mt-5">
      <div v-for="account in accountDetails.account" :key="account">
        <div class="">
          <div
            class="p-3 bg-slate-50"
            v-for="(value, key) in account"
            :key="key"
          >
            <div class="flex justify-between">
              <div class="flex">
                <h3 class="text-sm font-semibold">{{ key }} :</h3>
                <h4 class="text-sm font-medium">
                  {{ value }}
                </h4>
              </div>
              <div v-if="key == 'Phone Number'">
                <span
                  class="material-icons text-sm bg-transparent p-2 rounded-full bg-lime-200 text-lime-700"
                  >call</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ContactDetailsCard :allContacts="accountDetails.contacts" />
  <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
    <div class="border-b flex justify-between py-2">
      <div>
        <h2 class="font-bold text-lg py-2">Account Logs</h2>
      </div>
    </div>
    <div class="mt-5">
      <div
        class="p-3 bg-slate-50 gap-3"
        v-for="log in accountDetails.account_logs"
        :key="log.id"
      >
        <div class="flex justify-between">
          <div>
            <h3 class="text-xs font-semibold my-2">Action: {{ log.action }}</h3>
          </div>
        </div>

        <h4 class="text-xs font-medium my-2">
          Changed By:
          {{ log.changed_by }}
        </h4>

        <div>
          <h4 class="text-xs font-light my-2">
            Created on: {{ gettimeformat(log.creation_time) }}
          </h4>
        </div>
        <div>
          <h4 class="text-xs font-light my-2">
            Approved By: {{ log.approvedBy }}
          </h4>
        </div>
        <div>
          <h4 class="text-xs font-light my-2">
            Created on: {{ gettimeformat(log.approval_time) }}
          </h4>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
    <div class="py-2">
      <div class="border-b py-2">
        <h2 class="font-bold text-lg py-2">Interaction Details</h2>
      </div>
      <div class="py-3">
        <h2 class="font-bold text-sm py-2">Chat History</h2>
      </div>
      <div class="border-b flex justify-between py-2 px-3 my-3">
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
        v-for="interaction in accountDetails.conversations"
        :key="interaction"
      >
        <div
          class="border-b flex justify-between py-2"
          v-if="interaction.channel === 'WhatsApp'"
        >
          <div>
            <h6 class="text-sm py-2">
              <img class="w-6 h-6 rounded-full order-1" :src="WhatsAppIcon" />
            </h6>
          </div>
          <div>
            <h6 class="text-sm py-2">{{ interaction.agent }}</h6>
          </div>
          <div>
            <h6 class="text-sm py-2">
              {{ gettimeformat(interaction.date) }}
            </h6>
          </div>
          <div>
            <ActionButton
              @click="showChatTranscriptModal = !showChatTranscriptModal"
              text="View Chat Transcript"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div class="flex justify-between my-4">
        <div>
          <h2 class="font-bold text-sm py-2">Call History</h2>
        </div>
        <div>
          <audio id="player" class="" controls="controls">
            <source id="mp3_src" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      <div class="border-b flex justify-between py-2 px-3">
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
        class="p-3 bg-slate-50 gap-3"
        v-for="call in accountDetails.call_logs"
        :key="call.id"
      >
        <div class="flex justify-between my-2">
          <div>
            <h3 class="text-xs font-semibold my-2">{{ call.desposition }}</h3>
          </div>
          <div>
            <h3 class="text-xs font-semibold my-2">{{ call.queue }}</h3>
          </div>
          <div v-if="call.agent">
            <h3 class="text-xs font-semibold my-2">{{ call.agent }}</h3>
          </div>
          <div v-else>
            <h3 class="text-xs font-semibold my-2">Call Not Answered</h3>
          </div>
          <div>
            <h4 class="text-xs font-light my-2">
              <MusicPlayer
                :modelValue="audioUrl"
                @click="
                  toggleAudio(
                    'https://goipspace.fra1.digitaloceanspaces.com/recordings/' +
                      call.call_id +
                      '.wav'
                  )
                "
              />
            </h4>
          </div>
          <h4 class="text-xs font-medium my-2">
            {{ gettimeformat(call.call_date) }}
          </h4>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
    <div class="border-b flex justify-between py-2">
      <div>
        <h2 class="font-bold text-lg py-2">Ticket History</h2>
      </div>
      <div>
        <ActionButton
          @click="showCreateTicketModal = !showCreateTicketModal"
          text="Create Ticket"
        />
      </div>
    </div>

    <div class="border-b flex justify-between py-2 px-3 my-3">
      <div>
        <h6 class="text-sm py-2 font-semibold">Channel</h6>
      </div>
      <div>
        <h6 class="text-sm py-2 font-semibold">Ticket Number</h6>
      </div>
      <div>
        <h6 class="text-sm py-2 font-semibold">Status</h6>
      </div>
      <div>
        <h6 class="text-sm py-2 font-semibold">Created On</h6>
      </div>
    </div>
    <div class="mt-5">
      <div
        class="p-3 bg-slate-50 gap-3"
        v-for="ticket in accountDetails.tickets"
        :key="ticket"
      >
        <div class="flex justify-between">
          <div>
            <div v-if="ticket.channel == 'WhatsApp'">
              <img class="w-6 h-6 rounded-full order-1" :src="WhatsAppIcon" />
            </div>
            <div v-if="ticket.channel == 'Instagram'">
              <img class="w-6 h-6 rounded-full order-1" :src="InstagramIcon" />
            </div>
            <div v-if="ticket.channel == 'Facebook'">
              <img class="w-6 h-6 rounded-full order-1" :src="FacebookIcon" />
            </div>
            <div v-if="ticket.channel == 'Twitter'">
              <img class="w-6 h-6 rounded-full order-1" :src="TwitterIcon" />
            </div>
            <div v-if="ticket.channel == 'Voice'">voice</div>
          </div>
          <h4 class="text-xs font-medium my-2">
            {{ ticket.ticket_number }}
          </h4>
          <h4 class="text-xs font-medium my-2">
            {{ ticket.status }}
          </h4>
          <h4 class="text-xs font-medium my-2">
            {{ gettimeformat(ticket.created_on) }}
          </h4>
        </div>
      </div>
    </div>
  </div>
  <CreateTicketModal :show="showCreateTicketModal" />
  <ChatTranscriptModal :show="showChatTranscriptModal" />
  <CreateAccountModal
    :show="showCreateAccountModal"
    :state="state"
    :currentAccount="currentAccount"
    :accountTypeId="accounts.account_type_id"
    :accountFormId="accounts.account_form_id"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import CreateAccountModal from "@/components/modals/CRMModals/CreateAccountModal.vue";
import ContactDetailsCard from "@/components/cards/CRMCards/ContactDetailsCard.vue";
import MusicPlayer from "../../MusicPlayer.vue";
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";
import CreateTicketModal from "@/components/modals/CRMModals/CreateTicketModal.vue";
import ChatTranscriptModal from "@/components/modals/ChatModals/ChatTranscriptModal.vue";
import moment from "moment";

export default {
  props: {
    accounts: { type: Array },
  },
  data() {
    return {
      audioUrl: "",
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
    };
  },
  components: {
    ActionButton,
    CreateAccountModal,
    ContactDetailsCard,
    MusicPlayer,
    CreateTicketModal,
    ChatTranscriptModal,
  },
  setup() {
    const showCreateAccountModal = ref(false);
    const showCreateTicketModal = ref(false);
    const showChatTranscriptModal = ref(false);

    return {
      showCreateAccountModal,
      showCreateTicketModal,
      showChatTranscriptModal,
    };
  },
  created() {
    this.getAccountDetail({
      account_id: this.accounts.id,
    });
  },
  watch: {
    accounts: function (val) {
      this.getAccountDetail({
        account_id: val.id,
      });
    },
  },
  methods: {
    gettimeformat(time) {
      var moment_date = moment(time).format("YYYY-MM-DD, h:mm:ss a");
      return moment(moment_date).startOf("minute").fromNow();
    },
    ...mapActions(["getAccountDetail"]),
    handleEditAccount(data, state) {
      this.state = state;
      this.currentAccount = data;
      this.showCreateAccountModal = !this.showCreateAccountModal;
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

  computed: {
    ...mapGetters(["accountDetails"]),
  },
};
</script>

<style></style>
