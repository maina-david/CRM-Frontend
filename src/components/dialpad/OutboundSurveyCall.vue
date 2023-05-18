<template>
  <div class="grid grid-rows-1 grid-flow-col gap-1">
    <div class="row-span-1 border-b">
      <div
        class="relative flex justify-between rounded-sm text-center overflow-hidden p-2 text-gray-700"
      >
        <div class="callPad flex justify-between">
          <div class="">
            <div class="pulstate">
              <div></div>
              <div></div>
              <div></div>
            </div>

            <div class="">
              <!-- <div class="name m-3" @click="togglePause(audioUrl)">Matt Sich</div> -->
              <div class="number m-3 font-semibold">
                {{ masked_remote_identity }}
              </div>
              <div
                class="status text-sm"
                data-dots="..."
                @click="toggleAudio(audioUrl)"
              >
                Outgoing Call ...
              </div>
            </div>
          </div>

          <div>
            <div
              class="buttons grid grid-cols-3 gap-3 m-1 place-items-center flex justify-center"
            >
              <audio ref="call_audio"></audio>
              <div
                v-if="call_state == 'ANSWERED'"
                @click="muteCall()"
                class="ca-b-single m-1"
                data-label="Mute"
              >
                <span
                  class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
                  >mic_off</span
                >
              </div>
              <div
                v-if="call_state == 'MUTED'"
                @click="unmute()"
                class="ca-b-single m-1 col-start-2"
                data-label="Unmute"
              >
                <span
                  class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
                  >phone_in_talk</span
                >
              </div>
              <div
                v-if="call_state == 'ONHOLD'"
                @click="unhold()"
                class="ca-b-single m-1 col-start-2"
                data-label="Unmute"
              >
                <span
                  class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
                  >phone_in_talk</span
                >
              </div>
              <div
                v-if="call_state == 'ANSWERED'"
                @click="holdCall()"
                class="ca-b-single m-1"
                data-label="Face to Face"
              >
                <span
                  class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
                  >phone_paused</span
                >
              </div>
              <div
                v-if="call_state == 'ANSWERED'"
                class="ca-b-single m-1"
                data-label="Chat"
              >
                <span
                  @click="showSendMessageModal = !showSendMessageModal"
                  class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
                  >chat</span
                >
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid-cols-2 flex justify-between gap-3 items-center text-center"
        >
          <!--div
            v-if="call_state == 'RINGING'"
            class="grid items-center bg-green-500 w-12 h-12 rounded-full action-dig"
            @click="pickCall()"
          >
            <span class="material-icons text-center text-white text-2xl"
              >call</span
            >
          </!--div-->
          <div
            class="grid items-center bg-red-500 w-12 h-12 rounded-full action-dig"
            @click="hangUpCall()"
          >
            <span class="material-icons text-center text-white text-2xl"
              >call_end</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row-span-1">
    <div class="grid grid-cols-7 mt-3 gap-4">
      <div class="col-span-3">
        <CRMDetails />
      </div>
      <div class="col-span-4">
        <SurveyForm :surveys="surveyFormItems" />
      </div>
    </div>
  </div>
  <SendMessageModal :show="showSendMessageModal" />
</template>

<script>
import $ from "jquery";
import { useStore /* mapActions, mapGetters */ } from "vuex";
import { computed, ref } from "vue";
import SurveyForm from "@/components/Forms/SurveyForm.vue";
import CRMDetails from "@/components/cards/IncomingCallDialerCards/CRMDetails.vue";

export default {
  data() {
    return {
      mediaElement: "",
      remoteStream: "",
      surveyFormItems: [
        {
          name: "First Name",
          placeholder: "",
          is_required: 1,
          data_type: "firstname",
          is_masked: 0,
          sequence: 1,
        },
        {
          name: "Maiden Name",
          placeholder: "",
          is_required: 1,
          data_type: "maidenname",
          is_masked: 1,
          sequence: 2,
        },
        {
          name: "Last Name",
          placeholder: "",
          is_required: 1,
          data_type: "lastname",
          is_masked: 0,
          sequence: 3,
        },

        {
          name: "Phone Number",
          placeholder: "",
          is_required: 0,
          data_type: "phone",
          is_masked: 0,
          sequence: 4,
        },
        {
          name: "Email Address",
          placeholder: "",
          is_required: 0,
          data_type: "email",
          is_masked: 0,
          sequence: 5,
        },
        {
          name: "How did you find my service today?",
          placeholder: "",
          is_required: 0,
          data_type: "text",
          is_masked: 0,
          sequence: 6,
        },
        {
          name: "How would you rate it?",
          placeholder: "",
          is_required: 0,
          data_type: "number",
          is_masked: 0,
          sequence: 7,
        },
      ],
    };
  },
  /*  computed: {
    ...mapGetters([
      "current_session",
      "masked_remote_identity",
      "currentCallDetails",
    ]),
  },*/
  methods: {
    /*...mapActions(["answered"]),
    pickCall() {
      var self = this;
      self.answered();
      self.current_session.accept();
      self.current_session.on("accepted", (data) => {
        console.log(data);
        self.answered();
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
    },*/
    handleForm(e) {
      this.form = e;
    },
  },
  setup() {
    var timeoutTimer = true;
    var timeCounter = 0;
    var timeCounterCounting = true;
    const showSendMessageModal = ref(false);
    const store = useStore();
    var current_session = store.getters.current_session;
    var muteCall = function () {
      store.dispatch("muted");
    };
    var unmute = function () {
      store.dispatch("muted");
    };
    var holdCall = function () {
      store.dispatch("onHold");
    };
    var unhold = function () {
      store.dispatch("onHold");
    };
    // eslint-disable-next-line no-unused-vars
    var timeCounterLoop = function () {
      if (timeCounterCounting) {
        setTimeout(function () {
          // eslint-disable-next-line no-unused-vars
          var timeStringSeconds = "";
          var minutes = Math.floor(timeCounter / 60);
          var seconds = timeCounter % 60;
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          $(".status").text(minutes + ":" + seconds);
          timeCounter += 1;
          timeCounterLoop();
        }, 2000);
      }
    };
    // eslint-disable-next-line no-unused-vars
    var setToInCall = function () {
      $(".callPad").toggleClass("in-call");
    };
    var dots = 0;
    // eslint-disable-next-line no-unused-vars
    var looper = function () {
      if (timeoutTimer) {
        setTimeout(function () {
          if (dots > 3) {
            dots = 0;
          }
          var dotsString = "";
          for (var i = 0; i < dots; i++) {
            dotsString += ".";
          }
          $(".status").attr("data-dots", dotsString);
          dots += 1;
          looper();
        }, 500);
      }
    };
    //Function to hangup
    var hangUpCall = () => {
      store.dispatch("ended");
      addAnimationToButton(this);
      timeCounterCounting = false;
      timeCounter = 0;
      timeoutTimer = false;
      $(".pulstate").toggleClass("active-call");
      $(".status").text("Hanging Up...");
      console.log("current session on hangup", current_session);
    };
    //Function that adds animation to buttons on click
    var addAnimationToButton = function (thisButton) {
      //add animation
      $(thisButton).removeClass("clicked");
      var _this = thisButton;
      setTimeout(function () {
        $(_this).addClass("clicked");
      }, 1);
    };
    var checkNumber = function () {
      // eslint-disable-next-line no-unused-vars
      var numberToCheck = $(".phoneString input").val();
    };
    return {
      hangUpCall,
      muteCall,
      unmute,
      holdCall,
      unhold,
      checkNumber,
      showSendMessageModal,
      outgoingCall: computed(() => store.getters.outgoingCall),
      call_state: computed(() => store.getters.call_state),
      current_session: computed(() => store.getters.current_session),
      masked_remote_identity: computed(
        () => store.getters.masked_remote_identity
      ),
    };
  },
  components: {
    SurveyForm,
    CRMDetails,
  },
};
</script>

<style lang="css" scoped></style>
