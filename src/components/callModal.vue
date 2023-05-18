<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div>
    <div>
      <audio-player
        ref="audioPlayer"
        :audio-list="audioList.map((elm) => elm.url)"
        :before-play="handleBeforePlay"
        :show-prev-button="show_false"
        :show-next-button="show_false"
        :show-play-button="show_false"
        :show-volume-button="show_false"
        :show-progress-bar="show_false"
        :show-playback-rate="show_false"
        :isLoop="show_true"
        :disabled-progress-drag="show_true"
        :disabled-progress-click="show_true"
      />
    </div>
    <div>
      <b-modal
        id="action-modal"
        @ok="openModal($event)"
        v-model="modalShow"
        :no-close-on-backdrop="true"
        hide-footer
        no-close-on-esc
        hide-header-close
      >
        <p style="text-align: center" v-if="companyid == 'null'">
          Complete the company set up in order to start using the solution and
          access other modules
        </p>
        <b-row v-else align-h="around">
          <audio ref="call_audio"></audio>
          <b-col lg="12" xl="12">
            <div class="card">
              <div
                v-if="call_state == 'INCOMING'"
                class="card-header bg-success p-3"
              >
                <div class="ul-weather-card__header">
                  <i
                    class="i-Telephone ul-weather-card__font-md text-white mr-2"
                  ></i>
                  <span @click="answer_call()" class="t-font-bolder"
                    >Incoming Call new system 2</span
                  >
                </div>
              </div>
              <div
                v-if="call_state == 'ANSWERED'"
                class="card-header bg-primary p-3"
              >
                <div class="ul-weather-card__header">
                  <i
                    class="i-Telephone ul-weather-card__font-md text-white mr-2"
                  ></i>
                  <span class="t-font-bolder">Answered</span>
                </div>
              </div>
              <div
                v-if="call_state == 'ENDED'"
                class="card-header bg-light p-3"
              >
                <div class="ul-weather-card__header">
                  <i
                    class="i-Close ul-weather-card__font-md text-white mr-2"
                  ></i>
                  <span class="t-font-bolder">Call Ended</span>
                </div>
              </div>
              <div
                v-if="call_state == 'ONHOLD'"
                class="card-header bg-primary p-3"
              >
                <div class="ul-weather-card__header">
                  <i
                    class="i-Pause ul-weather-card__font-md text-white mr-2"
                  ></i>
                  <span class="t-font-bolder">On Hold</span>
                </div>
              </div>
              <div
                v-if="call_state == 'MUTED'"
                class="card-header bg-primary p-3"
              >
                <div class="ul-weather-card__header">
                  <i
                    class="i-Telephone ul-weather-card__font-md text-white mr-2"
                  ></i>
                  <span class="t-font-bolder">Muted</span>
                </div>
              </div>
              <div class="card-body">
                <div class="ul-weather-card__calendar">
                  <div class="ul-weather-card__calendar-time">
                    <h5 @click="answer_call()" class="text-mute px-2">
                      Incoming Call New System 1
                    </h5>
                    <b-row>
                      <h3 class="px-4 py-2">{{ remote_identity_masked }}</h3>
                    </b-row>
                  </div>
                  <div class="text-center px-6">
                    <b-row v-if="call_state == 'INCOMING'" align-v="center">
                      <b-col cols="7" sm="7" md="7" lg="7" xl="7">
                        <b-button
                          @click="answer_call()"
                          size="xl"
                          variant="success m-1"
                          class="btn-rounded text-white"
                        >
                          Answer</b-button
                        >
                      </b-col>
                      <b-col cols="5" sm="5" md="5" lg="5" xl="5">
                        <b-button
                          @click="decline_call()"
                          size="lg"
                          variant="danger m-1"
                          class="btn-rounded text-white"
                        >
                          Decline
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row
                      v-if="
                        call_state == 'ANSWERED' ||
                        call_state == 'SURVEY_COMPLETE'
                      "
                      align-v="center"
                    >
                      <b-col
                        cols="4"
                        sm="4"
                        md="4"
                        lg="4"
                        xl="4"
                        align-self="center"
                      >
                        <b-button
                          @click="hold_call()"
                          size="lg"
                          variant="success m-1"
                          class="btn-rounded text-white"
                        >
                          Hold
                        </b-button>
                      </b-col>
                      <b-col
                        cols="4"
                        sm="4"
                        md="4"
                        lg="4"
                        xl="4"
                        align-self="center"
                      >
                        <b-button
                          @click="mute_call()"
                          size="lg"
                          variant="success m-1"
                          class="btn-rounded text-white"
                        >
                          Mute
                        </b-button>
                      </b-col>
                      <b-col cols="4" sm="4" md="4" lg="4" xl="4">
                        <b-button
                          v-if="survey_questions.length < 1"
                          @click="decline_call()"
                          size="lg"
                          variant="danger m-1"
                          class="btn-rounded text-white"
                          >End
                        </b-button>
                        <b-button
                          v-else
                          @click="end_call()"
                          size="lg"
                          variant="danger m-1"
                          class="btn-rounded text-white"
                          >End
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row v-if="call_state == 'ONHOLD'" align-v="center">
                      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                        <b-button
                          @click="unhold_call()"
                          size="xl"
                          variant="success m-1"
                          class="btn-rounded text-white"
                        >
                          Resume
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row v-if="call_state == 'MUTED'">
                      <b-col cols="12" sm="12" md="12" lg="12" xl="12">
                        <b-button
                          @click="unmute_call()"
                          size="xl"
                          variant="success m-1"
                          class="btn-rounded text-white"
                        >
                          Unmute
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-row v-if="call_state == 'ENDED'" align-v="center">
                      <b-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        align-self="center"
                      >
                        <h3 class="px-4 py-2 text-danger">Call Ended</h3>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
          <b-row>
            <b-col lg="4" xl="4" class="d-none d-xl-block d-lg-block">
              <b-card
                v-if="!contact_detail"
                header="Caller Details"
                header-bg-variant="transparent"
              >
                <div id="initial-queue">
                  <h2 class="text-muted">No Caller Details for this call.</h2>
                </div>
              </b-card>
              <b-card title="Caller Details">
                <div
                  v-for="(contactItem, key) in contact_detail"
                  :key="key"
                  class="ul-widget-card__title-info text-left"
                >
                  <div v-if="key !== 'id'" class="mx-12">
                    <p class="m-0 text-14">
                      <span class="font-weight-bold">{{ key }}</span> :
                      <span class="m-0 text-16">{{ contactItem }}</span>
                    </p>
                  </div>
                </div>

                <b-card title="Contacted Campaigns">
                  <div content-class=" ul-widget-nav-tabs-line">
                    <div class="ul-widget__body p-0">
                      <div class="tab-content">
                        <div
                          class="tab-pane active show"
                          id="ul-widget5-tab1-content"
                        >
                          <div
                            v-for="(campaignItem, key) in related_campaign"
                            :key="key"
                            class="ul-widget5"
                          >
                            <hr class="p-0 m-0" />
                            <div class="ul-widget__item">
                              <div class="ul-widget5__content">
                                <div class="ul-widget5__section">
                                  <a href="#" class="ul-widget4__title">
                                    {{ campaignItem.name }}
                                  </a>
                                  <div class="ul-widget5__info">
                                    <span>Contacted Name:</span>
                                    <span class="text-primary">{{
                                      campaignItem.contacted_name
                                    }}</span>
                                  </div>
                                </div>
                              </div>
                              <div class="ul-widget5__content">
                                <div class="ul-widget5__stats">
                                  <span class="ul-widget5__sales text-mute">{{
                                    campaignItem.contact_address
                                  }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-card>
              </b-card>
            </b-col>

            <b-col cols="12" sm="12" md="12" lg="8" xl="8">
              <div v-if="call_state == 'SURVEY_COMPLETE'">
                <b-card
                  header="Survey Questions Completed"
                  header-bg-variant="transparent"
                >
                  <div id="initial-queue">
                    <h2 class="text-muted">
                      Survey Questions submited Successfully.
                    </h2>
                  </div>
                  <b-button
                    @click="decline_call()"
                    size="xl"
                    variant="success m-1"
                    class="btn-rounded text-white"
                  >
                    End Call Session</b-button
                  >
                </b-card>
              </div>
              <div v-else>
                <b-card
                  v-if="survey_questions.length < 1"
                  header="Survey Questions"
                  header-bg-variant="transparent"
                >
                  <div id="initial-queue">
                    <h2 class="text-muted">
                      No Survey Questions for this call.
                    </h2>
                  </div>
                </b-card>
                <b-card v-else title="Survey Questions">
                  <div v-if="this.call_state == 'INCOMING'" id="initial-queue">
                    <h2 class="text-muted">
                      Answer call to view survey questions, if any.
                    </h2>
                  </div>
                  <form-wizard
                    v-else
                    title
                    subtitle
                    v-model="survey_responses"
                    @on-complete="onComplete"
                    shape="circle"
                    color="#A855F7"
                  >
                    <FormulateForm
                      v-model="survey_responses"
                      @submit="onComplete"
                    >
                      <div v-for="item in survey_questions" :key="item.id">
                        <tab-content
                          v-if="item.data_type_id === 1"
                          title="Text Question"
                          icon="i-Information"
                        >
                          <FormulateInput
                            type="text"
                            :name="item.id.toString()"
                            :label="item.lable"
                            validation="required"
                            class="col-md-12"
                          />
                        </tab-content>
                        <tab-content v-if="item.data_type_id === 2">
                          <FormulateInput
                            type="number"
                            :name="item.id.toString()"
                            :label="item.lable"
                            validation="required"
                            class="col-md-12"
                          />
                        </tab-content>
                        <tab-content v-if="item.data_type_id === 3">
                          <FormulateInput
                            type="email"
                            :name="item.id.toString()"
                            :label="item.lable"
                            validation="required"
                            class="col-md-12"
                          />
                        </tab-content>
                        <tab-content v-if="item.data_type_id === 4">
                          <FormulateInput
                            type="checkbox"
                            :name="item.id.toString()"
                            :label="item.lable"
                            :options="getlabels(item.option)"
                            validation="required"
                            class="col-md-12"
                          />
                        </tab-content>
                        <tab-content v-if="item.data_type_id === 5">
                          <FormulateInput
                            type="radio"
                            :name="item.id.toString()"
                            :label="item.lable"
                            :options="getlabels(item.option)"
                            validation="required"
                            class="col-md-12"
                          />
                        </tab-content>
                        <tab-content v-else-if="item.data_type_id === 6">
                          <FormulateInput
                            type="select"
                            :name="item.id.toString()"
                            :label="item.lable"
                            validation="required"
                            :options="getlabels(item.option)"
                            class="col-md-12"
                          />
                        </tab-content>
                      </div>
                    </FormulateForm>
                    <button
                      class="btn btn-outline-primary btn-rounded"
                      type="primary"
                      slot="prev"
                    >
                      Back
                    </button>
                    <button
                      class="btn btn-outline-primary btn-rounded"
                      type="primary"
                      slot="next"
                    >
                      Next
                    </button>
                    <button
                      class="btn btn-outline-success btn-rounded"
                      type="primary"
                      slot="finish"
                    >
                      Finish
                    </button>
                  </form-wizard>
                </b-card>
              </div>
            </b-col>
          </b-row>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { UA } from "sip.js";
import AudioPlayer from "@liripeng/vue-audio-player";

export default {
  components: {
    AudioPlayer,
  },
  data() {
    return {
      companyid: "",
      campaign_id: "",
      call_id: "",
      text: "",
      number: 0,
      email: "",
      checkbox: {},
      radio: {},
      campaign_surveys: [],
      data_types: [],
      survey_responses: {},
      call_state: "IDLE", //INCOMING, ANSWERED, ENDED, ONHOLD, MUTED, IDLE, SURVEY_COMPLETE
      related_campaign: [],
      contact_detail: {},
      survey_questions: [],
      uri: "",
      mediaElement: "",
      remote_identity: "", //Phone number of the person being called by the system
      remote_identity_masked: "",
      current_session: "",
      new_client: "",
      remoteStream: "",
      RingTone: "",
      counting: "",
      modalShow: false,
      sip_id: "",
      sip_password: "",
      currentAudioName: "",
      show_false: false,
      show_true: true,
      audioList: [
        {
          name: "audio 1",
          url: "https://electionslaraveldev.goipcloud.co.ke/uploads/1653654662.mp3",
        },
        {
          name: "audio 2",
          url: "https://electionslaraveldev.goipcloud.co.ke/uploads/1653654662.mp3",
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["getSideBarToggleProperties"]),
  },

  watch: {
    call_state: function () {
      var self = this;

      if (self.call_state == "INCOMING") {
        console.log("i am playing the audio");
        self.get_caller_details(); //run self function to get caller details
        self.modalShow = true;
      }

      if (
        self.call_state == "ANSWERED" ||
        self.call_state == "SURVEY_COMPLETE"
      ) {
        self.trackTimer();
      }

      if (self.call_state == "IDLE") {
        self.modalShow = false;
      }

      if (self.call_state == "ENDED" && self.survey_questions.length < 1) {
        self.modalShow = false;
        self.trackTimer();
      }

      if (self.call_state == "ENDED") {
        self.counting = "";
      }
    },
  },

  created() {
    console.log("created and waiting for modal");
    this.sip_id = localStorage.getItem("sip_id");
    this.sip_password = localStorage.getItem("sip_password");
    this.uri = "sip:" + this.sip_id + "@178.62.118.44";
    this.register();
    this.companyid = localStorage.getItem("company_id");

    this.get_data_types();
    this.testingCallModal();
  },

  mounted() {
    console.log("ringtone audio log here", this.$refs.audioPlayer);
  },

  methods: {
    testingCallModal() {
      setTimeout(() => {
        console.log("changing state to INCOMING for testing");
        this.changeCallState("INCOMING");
      }, 5000);
    },

    getDashboardData() {
      this.$emit("getDashboardData");
    },

    handleRingtonePlay() {
      var self = this;
      console.log("ringtone playing");
      self.$refs.audioPlayer.play();
    },

    handleRingtoneStop() {
      var self = this;
      console.log("ringtone stopped");
      self.$refs.audioPlayer.pause();
      self.$refs.audioPlayer.$refs.audio.currentTime = 0;
    },

    // Something to do before playing
    handleBeforePlay(next) {
      // There are a few things you can do here...
      this.currentAudioName =
        this.audioList[this.$refs.audioPlayer.currentPlayIndex].name;

      next(); // Start playing
    },

    openModal(e) {
      e.preventDefault();
      console.log("modal open");
    },

    changeCallState(newState) {
      this.call_state = newState;
      if (newState == "INCOMING") {
        this.modalShow = true;
      }
      if (newState == "IDLE") {
        this.modalShow = false;
      }
    },

    timeConvert(n) {
      n = n / 1000;
      var sec_num = parseInt(n, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },

    trackTimer() {
      const event = setInterval(() => {
        this.counting = new Date(new Date().getTime());
      }, 1000);
      console.log(event);
    },

    register() {
      var self = this;
      self.related_campaign = [];
      self.contact_detail = {};
      self.survey_questions = [];
      self.remote_identity = "";
      var new_client = new UA({
        uri: this.uri,
        transportOptions: {
          wsServers: ["wss://opensips.goipcloud.co.ke/ws"],
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
      new_client.on("invite", function (session) {
        self.current_session = session;
        self.call_state = "INCOMING";
        self.handleRingtonePlay();
        console.log("new incoming call");
        console.log(session);
        self.remote_identity = session.remoteIdentity.uri.normal.user;
        self.remote_identity_masked =
          self.remote_identity.slice(0, 4) +
          "XXXX" +
          self.remote_identity.slice(8, 10);
        console.log(self.remote_identity);

        session.on("bye", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.call_state = "ENDED";
          self.getDashboardData();
          self.handleRingtoneStop();
          self.remote_identity = "";
        });

        session.on("destroyed", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.call_state = "ENDED";
          self.getDashboardData();
          self.handleRingtoneStop();
          self.remote_identity = "";
        });

        session.on("cancel", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.call_state = "ENDED";
          self.getDashboardData();
          self.handleRingtoneStop();
          self.remote_identity = "";
        });

        session.on("terminated", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.call_state = "ENDED";
          self.getDashboardData();
          self.handleRingtoneStop();
          self.remote_identity = "";
        });

        session.on("rejected", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.call_state = "ENDED";
          self.getDashboardData();
          self.handleRingtoneStop();
          self.remote_identity = "";
        });

        session.on("failed", function (session) {
          console.log("this call has ended");
          console.log(session);
          self.current_session = {};
          self.call_state = "ENDED";
          self.getDashboardData();
          self.handleRingtoneStop();
          self.remote_identity = "";
        });
      });
    },

    answer_call() {
      var self = this;
      this.current_session.accept();
      this.current_session.on("accepted", (data) => {
        console.log(data);
        self.call_state = "ANSWERED";
        self.mediaElement = self.$refs.call_audio;
        self.handleRingtoneStop();

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
        self.mediaElement.srcObject = self.remoteStream;
        self.mediaElement.play();
      });
    },

    hold_call() {
      var self = this;
      var axios = require("axios");
      var data = { phone_number: this.remote_identity };
      var config = {
        method: "post",
        url: localStorage.getItem("baseUrl") + "call_action/hold_call",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data,
      };
      console.log(config.data);
      axios(config)
        .then(function (response) {
          self.call_state = "ONHOLD";
          self.makeToast("success", response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    unhold_call() {
      var self = this;
      var axios = require("axios");
      var data = { phone_number: this.remote_identity };
      var config = {
        method: "post",
        url: localStorage.getItem("baseUrl") + "call_action/hold_call",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data,
      };
      console.log(config.data);
      // var self = this;
      axios(config)
        .then(function (response) {
          self.call_state = "ANSWERED";
          self.makeToast("success", response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    end_call() {
      var self = this;
      self.hangup_call_channel();
      self.handleRingtoneStop();
      self.current_session = "";
      if (self.call_state == "SURVEY_COMPLETE") {
        self.changeCallState("IDLE");
      } else {
        self.call_state = "ENDED";
      }
      self.getDashboardData();
      console.log("this call has ended");
      self.remote_identity = "";
    },

    decline_call() {
      var self = this;
      self.hangup_call_channel();
      self.handleRingtoneStop();
      self.current_session = "";
      console.log("this call has ended");
      self.changeCallState("IDLE");
      self.getDashboardData();
      self.remote_identity = "";
    },

    mute_call() {
      var self = this;
      var axios = require("axios");
      var data = { phone_number: this.remote_identity };
      var config = {
        method: "post",
        url: localStorage.getItem("baseUrl") + "call_action/mute_call",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data,
      };
      console.log(config.data);
      axios(config)
        .then(function (response) {
          self.call_state = "MUTED";
          self.makeToast("success", response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    unmute_call() {
      var self = this;
      var axios = require("axios");
      var data = { phone_number: this.remote_identity };
      var config = {
        method: "post",
        url: localStorage.getItem("baseUrl") + "call_action/mute_call",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data,
      };
      console.log(config.data);
      axios(config)
        .then(function (response) {
          self.call_state = "ANSWERED";
          self.makeToast("success", response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    hangup_call_channel() {
      var self = this;
      var axios = require("axios");
      var data = { sip: self.sip_id, phone_number: this.remote_identity };
      var config = {
        method: "post",
        url: localStorage.getItem("baseUrl") + "call_action/cancel_call",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data,
      };
      console.log(config.data);
      axios(config)
        .then(function (response) {
          self.makeToast("success", response.data.message);
          self.getDashboardData();
          self.handleRingtoneStop();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //this function is used to get caller details

    get_caller_details() {
      console.log("i am getting caller details here. run me as an api");
      var self = this;
      var axios = require("axios");
      var data = "";

      var config = {
        method: "get",
        // https://electionslaraveldev.goipcloud.co.ke/api/call_action/get_caller_data/0725267275
        url:
          localStorage.getItem("baseUrl") +
          "call_action/get_caller_data/" +
          self.remote_identity,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data,
      };

      console.log("Get caller details config");
      console.log(config);

      axios(config)
        .then(function (response) {
          console.log(
            "Contact details / survey / related campaign response",
            JSON.stringify(response.data)
          );
          self.related_campaign = response.data.response.related_campaign;
          self.contact_detail = response.data.response.contact_detail;
          self.call_id = response.data.response.call_id;
          self.survey_questions =
            response.data.response.survey_questions.FormItems;
          self.campaign_id =
            response.data.response.survey_questions.campaign_id;
          self.survey_questions = self.survey_questions.map((a) => {
            return {
              id: a.id,
              data_type_id: a.data_type_id,
              lable: a.lable,
              option: a.option,
              status: a.status,
              status_text: a.status_text,
              description: a.description,
            };
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getlabels(input) {
      input = input.map((a) => {
        return { value: a.id, label: a.value };
      });

      return input;
    },

    get_data_types() {
      var self = this;
      var axios = require("axios");
      var data = "";

      var config = {
        method: "get",
        url: localStorage.getItem("baseUrl") + "get_data_type",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          self.data_types = response.data;
          self.data_types = self.data_types.map((a) => {
            return { value: a.id, label: a.name };
          });
        })

        .catch(function (error) {
          console.log(error);
        });
    },

    get_campaign_surveys() {
      var self = this;
      var axios = require("axios");
      var data = "";

      var config = {
        method: "get",
        url:
          localStorage.getItem("baseUrl") +
          "campaign/get_form_items/" +
          self.campaign_id, //change to use dynamic campaign_id
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          self.campaign_surveys = response.data.FormItems;
          console.log("Get campaign surveys response", self.campaign_surveys);
        })

        .catch(function (error) {
          console.log(error);
        });
    },

    onComplete() {
      var self = this;
      console.log("Response questions", this.survey_responses);
      this.survey_responses = { survey_response: this.survey_responses };
      this.survey_responses.campaign_id = self.campaign_id;
      this.survey_responses.crm_id = this.contact_detail.id;
      this.survey_responses.call_id = this.call_id;
      console.log(
        "Survey Response Data with campaign and crm",
        this.survey_responses
      );

      var axios = require("axios");
      var config = {
        method: "post",
        url:
          localStorage.getItem("baseUrl") + "campaign/accept_survey_response",
        headers: {
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: this.survey_responses,
      };
      console.log("config send response", config);

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          self.makeToast("success", response.data.message);
          self.survey_responses = {};
          if (self.call_state == "ENDED") {
            self.changeCallState("IDLE");
          } else {
            self.call_state = "SURVEY_COMPLETE";
          }
          self.getDashboardData();
        })
        .catch(function (error) {
          console.log(error.response);
          self.makeToast("warning", error.response.data.message);
        });
    },

    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style>
#action-modal .modal {
  padding: 0 !important;
}

#action-modal .modal-dialog {
  max-width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
}

#action-modal .modal-content {
  border: 0 !important;
  border-radius: 5 !important;
  min-height: 100% !important;
  height: auto !important;
}
</style>
