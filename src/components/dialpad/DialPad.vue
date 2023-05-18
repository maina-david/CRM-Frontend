<template>
  <div class="bottom-0">
    <div class="dialed-numbers">
      <label
        class="dialed-numbers"
        v-if="!editing"
        @mouseover="editing = true"
        >{{ dialedNumber }}</label
      >
      <input
        class="dialed-numbers"
        type="number"
        v-if="editing"
        @blur="editing = false"
        v-model="dialedNumber"
      />
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div class="call-duration dialed-numbers" v-if="onCall">
      {{ minutes }}:{{ formattedSeconds }}
    </div>
    <div class="dialpad" v-if="!onCall">
      <button
        v-for="number in numbers"
        :key="number"
        @click="dial(number)"
        v-html="number === '*' ? number : number === '#' ? number : number"
      ></button>
    </div>
    <div class="call-controls" v-if="onCall">
      <div
        class="buttons grid grid-cols-3 gap-3 m-1 place-items-center flex justify-center"
      >
        <div
          v-if="!isMuted"
          @click="mute()"
          class="ca-b-single m-1"
          data-label="Mute"
        >
          <span
            class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
            >mic_off</span
          >
        </div>
        <div
          v-if="isMuted"
          @click="mute()"
          class="ca-b-single m-1 col-start-2"
          data-label="Unmute"
        >
          <span
            class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
            >mic_none</span
          >
        </div>
        <div
          v-if="Hold"
          @click="hold()"
          class="ca-b-single m-1 col-start-2"
          data-label="Unmute"
        >
          <span
            class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
            >phone_in_talk</span
          >
        </div>
        <div
          v-if="!Hold"
          @click="hold()"
          class="ca-b-single m-1"
          data-label="Face to Face"
        >
          <span
            class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
            >phone_paused</span
          >
        </div>
        <div class="ca-b-single m-1" data-label="Chat">
          <span
            @click="transfer()"
            class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
            >add_ic_call</span
          >
        </div>
        <div class="ca-b-single m-1" data-label="Chat">
          <span
            @click="sendmessage()"
            class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
            >chat</span
          >
        </div>
        <div class="ca-b-single m-1" data-label="Chat">
          <span
            @click="hangup()"
            class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
            >call_end</span
          >
        </div>
      </div>
    </div>
    <div class="call-controls" v-else>
      <span
        class="rounded-sm m-2 p-1 text-white bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease material-icons text-3xl"
        @click="call"
        >call</span
      >
      <span
        @click="clearLastDigit"
        class="rounded-sm m-2 p-1 text-white bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease material-icons text-3xl"
        >backspace</span
      >
    </div>
  </div>
</template>

<script>
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { mapActions, mapGetters } from "vuex";

export default {
  watch: {
    callHistoryNumber() {
      if (this.callHistoryNumber !== "") {
        console.log(
          "I am getting a call from call history",
          this.callHistoryNumber
        );
        this.dialedNumber = this.callHistoryNumber;
        this.call(this.dialedNumber);
        this.callFromHistory("");
      }
    },
  },
  data() {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"],
      dialedNumber: "",
      onCall: false,
      isMuted: false,
      Hold: false,
      second: 0,
      intervalId: null,
      editing: false,
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["callHistoryNumber"]),
    formattedNumber() {
      let phoneNumber = parsePhoneNumberFromString(this.dialedNumber, "US");
      if (phoneNumber) {
        return phoneNumber.formatNational();
      } else {
        return this.dialedNumber;
      }
    },
    minutes() {
      return Math.floor(this.second / 60);
    },
    formattedSeconds() {
      return ("0" + (this.second % 60)).slice(-2);
    },
  },
  methods: {
    ...mapActions([
      "store_outgoing",
      "clickToCallHandler",
      "endedClickToCall",
      "muted",
      "onHold",
      "callFromHistory",
    ]),
    callFromCallHistory(number) {
      this.dialedNumber = number;
    },
    dial(number) {
      this.errorMessage = "";
      this.dialedNumber += number.toString();
    },
    call() {
      if (!this.dialedNumber) {
        this.errorMessage = "please enter phone number";
      } else {
        const phoneNumberRegex9 = /^\d{9}$/;
        const phoneNumberRegex10 = /^\d{10}$/;
        const phoneNumberRegex12 = /^\d{12}$/;
        if (
          phoneNumberRegex9.test(this.dialedNumber) ||
          phoneNumberRegex10.test(this.dialedNumber) ||
          phoneNumberRegex12.test(this.dialedNumber)
        ) {
          this.onCall = true;
          this.startCall();
          localStorage.setItem("click_to_Call_status", JSON.stringify("true"));
          this.clickToCallHandler({ phone_number: this.dialedNumber });
        } else {
          this.errorMessage = "please enter correct number";
        }
      }
    },

    clearLastDigit() {
      this.dialedNumber = this.dialedNumber.slice(0, -1);
    },

    hangup() {
      this.onCall = false;
      this.dialedNumber = "";
      clearInterval(this.intervalId);
      this.second = 0;
      this.endedClickToCall();
      localStorage.setItem("click_to_Call_status", JSON.stringify("false"));
    },
    mute() {
      this.isMuted = !this.isMuted;
      this.muted();
    },
    hold() {
      this.Hold = !this.Hold;
      this.onHold();
    },
    transfer() {
      // handle transfer logic here
    },
    startCall() {
      this.intervalId = setInterval(() => {
        this.second++;
      }, 1000);
    },
  },
};
</script>

<style>
.dialpad {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  margin: 0 auto;
}

.dialpad button {
  width: 33.33%;
  height: 50px;
  font-size: 24px;
  background-color: #ddd;
  border: #fff 1em;
  outline: none;
  cursor: pointer;
}

.call-controls {
  display: flex;
  justify-content: center;
  width: 300px;
  margin: 10px auto;
  align-items: center;
}

.call-controls button {
  width: 30%;
  height: 50px;
  font-size: 18px;
  background-color: #ddd;
  border: none;
  outline: none;
  cursor: pointer;
}

.dialed-numbers {
  margin: 10px;
  font-size: 18px;
  text-align: center;
}
.error-message {
  color: red;
  text-align: center;
}
</style>
