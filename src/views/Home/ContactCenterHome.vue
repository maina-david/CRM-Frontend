<template>
  <div>
    <div class="app relative flex min-h-screen">
      <!--Agents Slider-->
      <div
        class="right-drawer"
        :style="{
          width: callDrawerVisible ? '30%' : '0',
          paddingLeft: callDrawerVisible ? '10px' : '0',
        }"
      >
        <div style="text-align: right; margin: 5px">
          <button class="close text-xs" @click="callDrawerVisible = false">
            &#9587;
          </button>
        </div>
        <DialerV2 />
      </div>
      <!--Call Agents Slider-->
      <div class="mr-0 fixed top-16">
        <SideBar />
      </div>
      <div class="flex-1">
        <NavBar />
      </div>

      <button
        @click="callDrawerVisible = true"
        v-if="
          handleGuard(clickToCall) ||
          handleGuard(inbound) ||
          handleGuard(outbound)
        "
        title="Make Call"
        class="fixed z-90 bottom-10 right-8 bg-lime-500 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-lime-700 hover:drop-shadow-2xl hover:animate-bounce duration-300"
      >
        <span class="material-icons text-3xl">call</span>
      </button>
    </div>
    <audio ref="call_audio"></audio>

    <div v-if="incomingCall">
      <IncomingCallModal :show="showIncomingCallModal" />
    </div>
    <div v-if="outgoingCall">
      <OutboundCallModal :show="showOutboundCallModal" />
    </div>
    <div v-if="internalCall">
      <InternalCallModal :show="internalCall" :state="'Incoming'" />
    </div>

    <div class="mb-5 hidden">
      <audio id="player" class="" controls="controls" preload="true" loop>
        <source
          id="mp3_src"
          src="https://goipspace.fra1.cdn.digitaloceanspaces.com/call_center/default_moh/ring.wav"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import { UA } from "sip.js";
import SideBar from "@/components/Sidebars/ContactCenterSideBar.vue";
import NavBar from "@/components/NavBar.vue";
import Guard from "@/componentGuard.js";
// import DialerModal from "@/components/modals/ContactCenterModals/DialerModal.vue";
import IncomingCallModal from "@/components/modals/ContactCenterModals/IncomingCallModal.vue";
import OutboundCallModal from "@/components/modals/ContactCenterModals/OutboundCallModal.vue";
import InternalCallModal from "@/components/modals/ContactCenterModals/InternalCallModal.vue";
import DialerV2 from "@/components/dialpad/DialerV2.vue";

export default {
  name: "ContactCenterHome",
  components: {
    SideBar,
    DialerV2,
    NavBar,
    // DialerModal,
    IncomingCallModal,
    OutboundCallModal,
    InternalCallModal,
  },
  data() {
    return {
      sip_id: "",
      callDrawerVisible: false,
      remoteStream: "",
      mediaElement: "",
      sip_password: "",
      uri: "",
      new_client: "",
      current_session: "",
      remote_identity: "",
      clickToCall: "Click to Call",
      inbound: "Inbound Calls",
      outbound: "Outbound Calls",
      audioUrl:
        "https://goipspace.fra1.cdn.digitaloceanspaces.com/call_center/default_moh/ring.wav",
      myState: false,
    };
  },
  setup() {
    const showDialerModal = ref(false);
    const showIncomingCallModal = ref(false);
    const showOutboundCallModal = ref(false);
    const showInternalCallModal = ref(false);
    return {
      showDialerModal,
      showIncomingCallModal,
      showOutboundCallModal,
      showInternalCallModal,
    };
  },
  watch: {
    call_state: function (val) {
      console.log("call state watch", val);
      if (val == "RINGING") {
        console.log("ringing");
        this.toggleAudio(this.audioUrl);
      } else {
        console.log("not ringing");
        this.togglePause(this.audioUrl);
      }
    },

    logOutSIP: function (val) {
      if (val == true) {
        this.new_client.unregister();
        this.new_client.stop();
        this.logOutSIPUser(false);
      }
    },

    // outboundCall: function (val) {
    //   console.log("character length", val);
    //   var self = this;
    //   if (val === "false") {
    //     console.log("ignore call");
    //   } else if (val.length > 3) {
    //     this.store_outgoing("false");
    //     var outbound_session = this.new_client.invite(val, {
    //       sessionDescriptionHandlerOptions: {
    //         constraints: {
    //           audio: true,
    //           video: false,
    //         },
    //       },
    //     });

    //     outbound_session.on("trackAdded", function () {
    //       var remoteStream = new MediaStream();
    //       outbound_session.sessionDescriptionHandler.peerConnection
    //         .getReceivers()
    //         .forEach((receiver) => {
    //           if (receiver.track) {
    //             remoteStream.addTrack(receiver.track);
    //           }
    //         });
    //       console.log("this call has been answered");
    //       console.log(remoteStream);
    //       var mediaElement = self.$refs.call_audio_out;
    //       console.log("mediaElement");
    //       console.log(mediaElement);
    //       mediaElement.srcObject = remoteStream;
    //       mediaElement.play();
    //     });
    //   }
    // },
  },
  created() {
    this.sip_id = localStorage.getItem("sip_id");
    this.fetchSmsTemplates();

    this.sip_password = localStorage.getItem("sip_password");
    this.uri = "sip:" + this.sip_id + "@178.62.118.44";
    if (!this.sip_id) {
      console.log("No SIP ID assigned");
    } else {
      console.log("I am registering here");
      this.register();
    }
    this.connect();
  },
  computed: {
    ...mapGetters([
      "incomingCall",
      "outgoingCall",
      "internalCall",
      "call_state",
      "outboundCall",
      "lastRegister",
      "previousState",
      "smsTemplatesSelect",
      "logOutSIP",
    ]),
  },
  methods: {
    ...mapActions([
      "ringing",
      "idle",
      "getCurrentCall",
      "storeCallDetailsPhone",
      "store_client",
      "store_outgoing",
      "storeLastRegister",
      "store_Previous_State",
      "getActiveAgents",
      "getQueues",
      "fetchSmsTemplates",
      "logOutSIPUser",
    ]),
    connect() {
      var userId = localStorage.getItem("userid");
      window.Echo.channel(userId).listen(".agent_status", (e) => {
        console.log("i disconnected");
        console.log(e);
        if (
          this.previousState === "ONLINE" &&
          e.status.sip_status === "DISCONNECTED"
        ) {
          console.log("previous state", this.previousState);
          console.log("current state", e.status.sip_status);
          this.store_Previous_State("PENDING REQUEST");

          this.register();
          setTimeout(30000);
          this.storeLastRegister(Date.now());
          // this.storePreviousState(e.status.sip_status);
        } else if (e.status.sip_status === "ONLINE") {
          this.store_Previous_State(e.status.sip_status);
        }
      });
    },
    toggleAudio(sourceUrl) {
      console.log("toggle ringtone play");
      var audio = document.getElementById("player");
      var source = document.getElementById("mp3_src");
      console.log(sourceUrl);
      source.src = sourceUrl;
      audio.pause();
      console.log(audio);
      if (sourceUrl) {
        audio.load();
        audio.play();
      }
    },
    togglePause(sourceUrl) {
      console.log("toggle ringtone pause");
      var audio = document.getElementById("player");
      var source = document.getElementById("mp3_src");
      source.src = sourceUrl;
      audio.pause();
    },
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },

    register() {
      console.log("I am registering here in the register function");
      var self = this;
      self.remote_identity = "";
      var new_client = new UA({
        uri: this.uri,
        transportOptions: {
          wsServers: ["wss://opensips.goipcloud.co.ke/ws"],
          connectionTimeout: 30,
          reconnectionTimeout: 30,
        },
        sessionDescriptionHandlerFactoryOptions: {
          constraints: {
            audio: true,
            video: false,
          },
        },
        authorizationUser: self.sip_id,
        password: self.sip_password,
        register: true,
      });

      new_client.start();
      this.new_client = new_client;
      this.store_client(this.new_client);
      new_client.on("invite", function (session) {
        self.current_session = session;
        console.log("new incoming call");
        console.log(session);
        self.remote_identity = session.remoteIdentity.uri.normal.user;

        console.log(self.remote_identity);
        if (
          JSON.parse(localStorage.getItem("click_to_Call_status")) === "true"
        ) {
          localStorage.setItem("click_to_Call_status", JSON.stringify("false"));
          self.current_session.accept();
          self.current_session.on("accepted", (data) => {
            console.log(data);

            console.log("refs", self.$refs.call_audio);
            self.mediaElement = self.$refs.call_audio;
            self.remoteStream = new MediaStream();
            console.log(
              self.current_session.sessionDescriptionHandler.peerConnection.getReceivers()
            );
            self.current_session.sessionDescriptionHandler.peerConnection
              .getReceivers()
              .forEach((receiver) => {
                if (receiver.track) {
                  self.remoteStream.addTrack(receiver.track);
                }
              });
            console.log("this call has been answered");
            console.log(self.remoteStream);
            console.log("mediaElement");
            console.log(self.mediaElement);
            self.mediaElement.srcObject = self.remoteStream;
            self.mediaElement.play();
          });

          console.log("i am getting here for click to call");
        } else {
          self.ringing({
            session: session,
            remote_identity: self.remote_identity,
          });
          localStorage.setItem("current_ticket_channel", JSON.stringify("7"));
          self.getCurrentCall(self.remote_identity);
          self.storeCallDetailsPhone(self.remote_identity);
          /* this is where you answer the call if it is a click to call */
        }

        session.on("bye", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.remote_identity = "";
          self.idle();
        });

        session.on("destroyed", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.remote_identity = "";
          self.idle();
        });

        session.on("cancel", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.remote_identity = "";
          self.idle();
        });

        session.on("terminated", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.remote_identity = "";
          self.idle();
        });

        session.on("rejected", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.remote_identity = "";
          self.idle();
        });

        session.on("failed", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.remote_identity = "";
          self.idle();
        });
      });
    },
  },
};
</script>
<style>
.close {
  background: white;
  border: 0;
  cursor: pointer;
  margin: 5px;
}
.right-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 0; /* initially */
  overflow: hidden;
  height: 100vh;
  padding-left: 0; /* initially */
  border-left: 1px solid whitesmoke;
  background: white;
  z-index: 200;
  transition: all 0.2s;
}
</style>
