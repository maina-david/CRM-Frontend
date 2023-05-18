<template>
  <div class="bg-white rounded-sm shadow-sm p-4 justify-center">
    <div class="border-b flex justify-between py-2">
      <div>
        <h2 class="font-bold text-lg py-2">Contact Details Here</h2>
      </div>
      <div class="flex gap-3"></div>
    </div>
    <div class="mt-5">
      <div v-for="contact in contactDetails.contact_detail" :key="contact.id">
        <div class="">
          <div class="p-3 bg-slate-50 flex">
            <h3 class="text-sm font-semibold">
              {{ contact.contact_form_attr.name }} :
            </h3>
            <h4 class="text-sm font-medium">
              {{ contact.value }}
            </h4>
          </div>
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
        v-for="call in contactDetails.call_logs"
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
        v-for="ticket in contactDetails.tickets"
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
  <CreateContactModal
    :show="showCreateContactModal"
    :state="state"
    :currentContact="currentContact"
    :contactTypeId="contacts.contact_type_id"
    :contactFormId="contacts.contact_form_id"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import MusicPlayer from "../../MusicPlayer.vue";
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";
import CreateContactModal from "@/components/modals/CRMModals/CreateContactModal.vue";
import CreateTicketModal from "@/components/modals/CRMModals/CreateTicketModal.vue";
import ChatTranscriptModal from "@/components/modals/ChatModals/ChatTranscriptModal.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  props: {
    contacts: { type: Array },
  },
  components: {
    CreateContactModal,
    MusicPlayer,
    CreateTicketModal,
    ChatTranscriptModal,
    ActionButton,
  },
  data() {
    return {
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
    };
  },
  setup() {
    const showCreateContactModal = ref(false);
    const showCreateTicketModal = ref(false);
    const showChatTranscriptModal = ref(false);
    return {
      showCreateContactModal,
      showCreateTicketModal,
      showChatTranscriptModal,
    };
  },
  created() {
    this.getContactDetail({
      contact_id: this.contacts.id,
    });
  },
  watch: {
    contacts: function (val) {
      this.getContactDetail({
        contact_id: val.id,
      });
    },
  },
  methods: {
    ...mapActions(["getContactDetail"]),
    handleEditContact(data, state) {
      this.state = state;
      this.currentContact = data;
      this.showCreateContactModal = !this.showCreateContactModal;
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
    ...mapGetters(["contactDetails"]),
  },
};
</script>

<style></style>
