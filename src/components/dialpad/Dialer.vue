<template>
  <div class="pad bg-slate-100 shadow-lg">
    <div class="dial-pad">
      <div class="contact">
        <div class="avatar">
          <span class="material-icons">account_circle</span>
        </div>
        <div class="contact-info">
          <div class="contact-name">Matt Sich</div>
          <div class="contact-position">CodePenner</div>
          <div class="contact-number">(123) 456 - 7890</div>
        </div>
        <div class="contact-buttons">
          <button class="icon-message">
            <span class="material-icons">mail</span>
          </button>
          <button class="icon-video">
            <span class="material-icons">videocam</span>
          </button>
        </div>
      </div>
      <!--where number clicked displayed--->
      <div class="phoneString text-slate-700 flex justify-between">
        <input type="number" placeholder="Enter extension number" />
        <div class="goBack action-dig">
          <span class="material-icons">backspace</span>
        </div>
      </div>
      <!--Dial Pad Here--->
      <div
        v-if="showDialPad"
        class="digits text-slate-700 grid grid-cols-3 gap-4"
      >
        <div class="dig number-dig" name="1">1</div>
        <div class="dig number-dig" name="2">2</div>
        <div class="dig number-dig" name="3">3</div>
        <div class="dig number-dig" name="4">4</div>
        <div class="dig number-dig" name="5">5</div>
        <div class="dig number-dig" name="6">6</div>
        <div class="dig number-dig" name="7">7</div>
        <div class="dig number-dig" name="8">8</div>
        <div class="dig number-dig" name="9">9</div>
        <div class="dig number-dig" name="*">*</div>
        <div class="dig number-dig" name="0">0</div>
        <div class="dig number-dig" name="#">#</div>
      </div>
      <div v-if="showHistory">
        <h3 class="font-semibold text-sm m-3">Call History</h3>
        <div v-for="history in callHistory" :key="history">
          <div class="bg-slate-100 p-2 m-2">
            <div class="flex justify-between">
              <div class="text-xs font-semibold">{{ history.caller }}</div>
              <div class="text-xs">{{ history.duration }}</div>
            </div>
            <spans
              v-if="history.status == 'outgoing'"
              class="material-icons mt-2 flex justify-start text-left text-sm text-blue-600"
              >call_made</spans
            >
            <span
              v-if="history.status == 'incoming'"
              class="material-icons mt-2 flex text-sm text-green-600"
              >call_received</span
            >
            <span
              v-if="history.status == 'missed'"
              class="material-icons mt-2 flex text-sm text-red-600"
              >call_missed</span
            >
          </div>
        </div>
      </div>
      <div class="digits text-white">
        <div class="dig addPerson action-dig" @click="viewCallHistory()">
          <span class="material-icons">history</span>
        </div>
        <div class="dig-spacer action-dig"></div>
        <div class="dig goBack action-dig" @click="viewDialPad()">
          <span class="material-icons">dialpad</span>
        </div>
      </div>
    </div>
    <!---Displays while a call is is progress--->

    <div class="call-pad bg-white">
      <div class="pulsate">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="ca-avatar">
        <span class="material-icons">account_circle</span>
      </div>
      <div class="ca-name">Customeerrr</div>
      <div class="ca-number">123 456 7890</div>
      <div class="ca-status" data-dots="...">Calling</div>
      <div class="ca-buttons flex gap-8">
        <div class="ca-b-single m-1" data-label="Mute">
          <span
            class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-40"
            >mic_off</span
          >
        </div>
        <div class="ca-b-single m-1" data-label="Hold Call">
          <span
            class="material-icons p-2 hover:border-4 hover:border-blue-300 hover:rounded-full hover:shadow-2xl hover:text-blue-400"
            >phone_paused</span
          >
        </div>
      </div>
    </div>

    <div class="dig call action-dig">
      <div class="call-change"><span></span></div>
      <div class="call-icon"><span class="material-icons">call</span></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

import { mapGetters, mapActions } from "vuex";
/* eslint-disable */

/*import groupManagement from "@/componentGuard.js";*/

//import Company from "@/componentGuard.js";
/*import RoleProfile from "@/componentGuard.js";*/
//import UserManagement from "@/componentGuard.js";
export default {
  methods: {
    ...mapActions(["store_outgoing", "clickToCallHandler", "endedClickToCall"]),
    viewDialPad() {
      this.showDialPad = !this.showDialPad;
      this.showHistory = false;
    },
    viewCallHistory() {
      this.showHistory = !this.showHistory;
      this.showDialPad = false;
    },
  },
  computed: {
    ...mapGetters["client"],
  },

  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dialer",
  data() {
    return {
      incomingCall: true,
      callHistory: [
        { caller: "Elephant Man", duration: "00:53", status: "incoming" },
        { caller: "Jane Doe", duration: "01:20", status: "outgoing" },
        { caller: "Elephant Man", duration: "00:03", status: "missed" },
        { caller: "Jane Doe", duration: "00:53", status: "incoming" },
      ],
      showHistory: false,
      showDialPad: false,
      phone_number: "",
      timeoutTimer: true,
    };
  },

  created() {
    localStorage.setItem("dialerOnCall", JSON.stringify("false"));
    //Event listener for each number button
    var self = this;
    $(document).on("click", ".number-dig", function () {
      //add animation
      addAnimationToButton(this);
      //add number
      var currentValue = $(".phoneString input").val();
      console.log("current value", currentValue);
      var valueToAppend = $(this).attr("name");
      console.log("appended value", valueToAppend);
      $(".phoneString input").val(currentValue + valueToAppend);

      checkNumber();
    });

    var timeCounter = 0;
    var timeCounterCounting = true;

    //Event listener for each action button
    $(document).on("click", ".action-dig", function () {
      //add animation
      addAnimationToButton(this);
      if ($(this).hasClass("goBack")) {
        var currentValue = $(".phoneString input").val();
        var newValue = currentValue.substring(0, currentValue.length - 1);
        $(".phoneString input").val(newValue);
        checkNumber();
      } else if ($(this).hasClass("call")) {
        if (JSON.parse(localStorage.getItem("dialerOnCall")) === "false") {
          localStorage.setItem("dialerOnCall", JSON.stringify("true"));
          console.log(
            "I am now making an outbound call to number",
            $(".phoneString input").val()
          );
          if ($(".phoneString input").val().length < 5) {
            self.clickToCallHandler({
              phone_number: $(".phoneString input").val(),
            });
          }

          if ($(".phoneString input").val().length > 5) {
            localStorage.setItem(
              "click_to_Call_status",
              JSON.stringify("true")
            );
            self.clickToCallHandler({
              phone_number: $(".phoneString input").val(),
            });
          }
        }

        if ($(".call-pad").hasClass("in-call")) {
          setTimeout(function () {
            setToInCall();
          }, 500);
          timeCounterCounting = false;
          timeCounter = 0;
          hangUpCall();
          self.endedClickToCall();
          $(".pulsate").toggleClass("active-call");

          $(".phoneString input").val("");
          checkNumber();
        } else {
          $(".ca-status").text("Calling");
          setTimeout(function () {
            setToInCall();
            self.timeoutTimer = true;
            looper();
            //showActiveCallAfterAFewSeconds
            setTimeout(function () {
              self.timeoutTimer = false;
              timeCounterCounting = true;
              timeCounterLoop();

              $(".pulsate").toggleClass("active-call");
              $(".ca-status").animate(
                {
                  opacity: 0,
                },
                1000,
                function () {
                  $(this).text("00:00");
                  $(".ca-status").attr("data-dots", "");

                  $(".ca-status").animate(
                    {
                      opacity: 1,
                    },
                    1000
                  );
                }
              );
            }, 3000);
          }, 500);
        }
      } else {
        console.log("No");
      }
    });

    var timeCounterLoop = function () {
      if (timeCounterCounting) {
        setTimeout(function () {
          // eslint-disable-next-line no-unused-vars
          var timeStringSeconds = "";
          var minutes = Math.floor(timeCounter / 60.0);
          var seconds = timeCounter % 60;
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          $(".ca-status").text(minutes + ":" + seconds);

          timeCounter += 1;

          timeCounterLoop();
        }, 2000);
      }
    };

    var setToInCall = function () {
      $(".call-pad").toggleClass("in-call");
      $(".call-icon").toggleClass("in-call");
      $(".call-change").toggleClass("in-call");
      $(".ca-avatar").toggleClass("in-call");
    };

    var dots = 0;
    var looper = function () {
      if (self.timeoutTimer) {
        setTimeout(function () {
          if (dots > 3) {
            dots = 0;
          }
          var dotsString = "";
          for (var i = 0; i < dots; i++) {
            dotsString += ".";
          }
          $(".ca-status").attr("data-dots", dotsString);
          dots += 1;

          looper();
        }, 500);
      }
    };
    var self = this;
    //Function to hangup
    var hangUpCall = function () {
      console.log("i am handing up here");
      localStorage.setItem("dialerOnCall", JSON.stringify("false"));
      localStorage.setItem("click_to_Call_status", JSON.stringify("false"));
      self.timeoutTimer = false;
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

    //Function to check number that exists somewhere

    var checkNumber = function () {
      var numberToCheck = $(".phoneString input").val();
      var contactMatt = {
        name: "",
        number: "",
      };
      var contactHellogiov = {
        number: $(".phoneString input").val(),
      };
      if (
        numberToCheck.length > 0 &&
        contactMatt.number.substring(0, numberToCheck.length) == numberToCheck
      ) {
        //show this contact!
        showUserInfo(contactMatt);
      } else if (
        numberToCheck.length > 0 &&
        contactHellogiov.number.substring(0, numberToCheck.length) ==
          numberToCheck
      ) {
        showUserInfo(contactHellogiov);
      } else {
        hideUserInfo();
      }
    };

    //Function to show user information
    var showUserInfo = function (userInfo) {
      $(".avatar").attr(
        "style",
        "background-image: url(" + userInfo.image + ")"
      );
      if (!$(".contact").hasClass("showContact")) {
        $(".contact").addClass("showContact");
      }
      $(".contact-name").text(userInfo.name);
      $(".contact-position").text(userInfo.desc);
      var matchedNumbers = $(".phoneString input").val();
      var remainingNumbers = userInfo.number.substring(matchedNumbers.length);
      $(".contact-number").html(
        "<span>" + matchedNumbers + "</span>" + remainingNumbers
      );

      //update call elements
      $(".ca-avatar").attr(
        "style",
        "background-image: url(" + userInfo.image + ")"
      );
      $(".ca-name").text(userInfo.name);
      $(".ca-number").text(userInfo.number);
    };

    var hideUserInfo = function () {
      $(".contact").removeClass("showContact");
    };
  },
};
</script>

<style lang="scss" scoped>
$lightGray: #e2e8f0;
$white: #fff;
$blue: #285efa;
$green: #3de066;
$red: #fa4a5d;
$pulseDuration: 0.3s;

body {
  letter-spacing: 1px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.pad {
  width: 300px;
  height: 630px;
  position: absolute;
  right: 10px;
  bottom: 45px;
  margin: auto;
  box-shadow: 0 30px 35px -30px black;

  animation: showPad 0.3s ease forwards 1;

  .dial-pad {
    .contact {
      width: 60%;
      position: relative;
      margin-left: 20%;
      margin-top: 40px;
      opacity: 0;
      transition: opacity 0.5s ease;

      &.showContact {
        opacity: 1;
      }
      .avatar {
        background-repeat: no-repeat;
        background-size: auto 100%;
        background-position: center center;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        position: absolute;
        left: 0px;
        top: 8px;
      }
      .contact-info {
        border-radius: 8px;
        width: 85%;
        margin-left: 15%;
        background-color: $lightGray;
        height: 76px;
        overflow: hidden;

        & > div {
          width: 80%;
          margin-left: 20%;
          font-size: 12px;
          margin-top: 3px;
        }
        .contact-name {
          // color: #fdfdfd;
          margin-top: 12px;
        }
        .contact-position {
          font-style: italic;
          color: #aeaeae;
        }
        .contact-number {
          color: rgb(60, 59, 59);
          span {
            color: $green;
            display: inline;
          }
        }
      }
      .contact-buttons {
        position: absolute;
        right: -5px;
        top: 0px;
        width: 40px;
        height: 76px;
        button {
          border: none;
          width: 25px;
          height: 25px;
          border-radius: 100%;
          display: block;
          position: absolute;
          right: 0px;
          background-size: 75% auto;
          background-position: center center;
          background-repeat: no-repeat;
          &:focus {
            outline: none;
          }
          &.icon-message {
            background-color: #ffc44e;
            top: 5px;
          }
          &.icon-video {
            background-color: #a529f9;
            bottom: 5px;
          }
        }
      }
    }
    .phoneString {
      width: 100%;
      height: 60px;
      background-color: $lightGray;
      margin-top: 40px;
      input {
        background-color: transparent;
        width: 80%;
        margin-left: 20%;
        height: 60px;
        border: none;
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 2px;
        &:focus {
          outline: none;
        }
      }
    }
    .digits {
      overflow: hidden;
      margin-left: 20%;
      margin-top: 20px;
      .dig-spacer {
        width: 60px;
        margin: 10px calc(50% - 90px);
        float: left;
      }
      .dig {
        font-size: 15px;
        float: left;
        background-color: $lightGray;
        text-align: center;
        width: 40px;
        height: 36px;
        border-radius: 50%;
        padding-top: 4px;
        font-weight: 700;
        cursor: pointer;

        &.clicked {
          animation: pulse-gray linear $pulseDuration 1;
        }

        &.astrisk {
          padding-top: 17px;
          height: 43px;
        }
        &.pound {
          padding-top: 10px;
          height: 50px;
        }
        &.addPerson,
        &.goBack {
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 55% auto;
        }
        &.addPerson {
          background-color: #285efa;
          &.clicked {
            animation: pulse-blue linear $pulseDuration 1;
          }
        }
        &.goBack {
          background-color: #fa4a5d;
          &.clicked {
            animation: pulse-red linear $pulseDuration 1;
          }
        }
      }
    }
  }

  .call-pad {
    opacity: 0;
    height: 0px;
    pointer-events: none;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    transition: opacity 0.3s ease;
    position: absolute;
    width: 100%;

    left: 0px;
    top: 0px;
    transition: opacity 0.3s ease;

    &.in-call {
      height: 100%;
      opacity: 1;
      pointer-events: all;
    }
    .pulsate {
      opacity: 0;
      width: 150px;
      height: 0px;
      overflow: visible;
      position: relative;
      display: block;
      margin: 0 auto 0;
      top: 120px;
      transition: opacity 0.5s ease;
      &.active-call {
        animation: pulsator 2s ease infinite;
        opacity: 1;
      }
      div {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.06);
        border-radius: 100%;
        margin: auto;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        &:nth-child(1) {
          width: 110px;
          height: 110px;
        }
        &:nth-child(2) {
          width: 122px;
          height: 122px;
        }
        &:nth-child(3) {
          width: 134px;
          height: 134px;
        }
      }
    }
    .ca-avatar {
      width: 100px;
      height: 100px;
      margin: 70px auto;
      margin-bottom: 30px;
      display: block;
      background-color: #111111;
      border-radius: 100%;
      background-position: center center;
      background-size: 100% auto;
      background-repeat: no-repeat;
      transition: opacity 1s ease, transform 1s ease;
      opacity: 0.5;
      transform: scale(0.5, 0.5);
      &.in-call {
        transform: scale(1, 1);
        opacity: 1;
      }
    }
    .ca-name,
    .ca-number,
    .ca-status {
      width: 60%;
      margin-left: 20%;
      // color: white;
      text-align: center;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .ca-name {
      font-size: 18px;
    }
    .ca-number {
      font-size: 28px;
      letter-spacing: 2px;
    }
    .ca-status {
      font-size: 30px;
      margin-top: 40px;
      margin-bottom: 40px;
      &:after {
        content: attr(data-dots);
        position: absolute;
      }
    }
    .ca-buttons {
      width: 70%;
      margin-left: 15%;

      .ca-b-single {
        float: left;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        position: relative;
        margin-bottom: 40px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 55% auto;
        &:nth-child(3n-1) {
          margin-left: calc(100% - 230px);
          margin-right: calc(100% - 230px);
        }
        &:after {
          content: attr(data-label);
          //  color: white;
          position: absolute;
          text-align: center;
          font-size: 10px;
          width: 100px;
          bottom: -20px;
          left: -18px;
          letter-spacing: 2px;
        }
      }
    }
  }
}

.call {
  color: white;
  font-size: 20px;
  text-align: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 10px 0px;
  font-weight: 700;
  cursor: pointer;
  position: absolute;
  left: calc(50% - 30px);
  bottom: 25px;
  background-color: #3de066;
  .call-icon {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-size: 60% auto;
    background-repeat: no-repeat;
    background-position: center center;
    transition: transform 0.3s ease;
    &.in-call {
      -ms-transform: rotate(134deg);
      -webkit-transform: rotate(134deg);
      transform: rotate(134deg);
    }
  }
  .call-change {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;

    span {
      width: 70px;
      height: 67px;
      display: block;
      background-color: $red;
      position: relative;
      top: 70px;
      left: 70px;
      border-radius: 100%;
      transition: left 0.3s ease, top 0.3s ease;
    }
    &.in-call span {
      top: -5px;
      left: -5px;
    }
  }

  &.clicked {
    animation: pulse-green linear $pulseDuration 1 forwards;
  }
}

@keyframes pulse-gray {
  0% {
    box-shadow: inset 0 0 0px 30px $lightGray, inset 0 0 0px 30px white;
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  10% {
    -ms-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  30% {
    box-shadow: inset 0 0 0px 10px $lightGray, inset 0 0 0px 30px white;
  }
  60% {
    box-shadow: inset 0 0 0px 0px $lightGray, inset 0 0 0px 0px white;
    -ms-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  100% {
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}
@keyframes pulse-blue {
  0% {
    box-shadow: inset 0 0 0px 30px $blue, inset 0 0 0px 30px white;
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  10% {
    -ms-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  30% {
    box-shadow: inset 0 0 0px 10px $blue, inset 0 0 0px 30px white;
  }
  60% {
    box-shadow: inset 0 0 0px 0px $blue, inset 0 0 0px 0px white;
    -ms-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  100% {
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}
@keyframes pulse-green {
  0% {
    box-shadow: inset 0 0 0px 30px $green, inset 0 0 0px 30px white;
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  10% {
    -ms-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  30% {
    box-shadow: inset 0 0 0px 10px $green, inset 0 0 0px 30px white;
  }
  60% {
    box-shadow: inset 0 0 0px 0px $green, inset 0 0 0px 0px white;
    -ms-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  100% {
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}
@keyframes pulse-red {
  0% {
    box-shadow: inset 0 0 0px 30px $red, inset 0 0 0px 30px white;
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  10% {
    -ms-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  30% {
    box-shadow: inset 0 0 0px 10px $red, inset 0 0 0px 30px white;
  }
  60% {
    box-shadow: inset 0 0 0px 0px $red, inset 0 0 0px 0px white;
    -ms-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  100% {
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}
@keyframes pulsator {
  0% {
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  40% {
    -ms-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  100% {
    -ms-transform: scale(1, 1);
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}
@keyframes showPad {
  0% {
    top: 150px;
    opacity: 0;
  }
  100% {
    top: 0px;
    opacity: 1;
  }
}

p {
  position: fixed;
  bottom: 0px;
  left: 15px;
  color: white;
  font-family: Lato;
  font-weight: 300;
  overflow: hidden;

  a:link,
  a:visited {
    color: white;
  }
  a:hover {
    opacity: 0.5;
  }
  img {
    width: 20px;
    height: 20px;
    position: relative;
    top: 6px;
  }
}
</style>
