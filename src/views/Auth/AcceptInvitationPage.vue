<template>
  <div>
    <div class="-mt-40 absolute">
      <Loader v-if="loadingInvites" />
    </div>
    <transition name="fade" mode="out-in">
      <div
        v-if="showAlert"
        class="relative h-0 w-9/12 mx-auto top-8 drop-shadow-xl"
      >
        <div class="sticky inset-x-0 top-0">
          <Alert
            @click="closeAlert"
            :typeOfAlert="typeOfAlert"
            :message="alertMessage"
            :bulkMessage="alertBulkMessage"
            :head="alertTitle"
          />
        </div>
      </div>
    </transition>
    <div class="w-6/12 block py-10 px-10 bg-white mx-auto my-24 shadow-lg">
      <div class="text-center">
        <img :src="logoUrl" alt="GOIP Logo" class="mb-5 mx-auto" />

        <h4 class="text-lg font-semibold mt-1 mb-4 pb-1">Accept Invitation</h4>
        <router-link :to="{ name: 'LogIn' }">
          <div class="text-center">
            <p
              class="text-xs mb-5 mt-3 underline hover:text-base hover:text-blue-700"
            >
              Back to LogIn
            </p>
          </div>
        </router-link>
        <p class="text-sm mb-12">
          Thank you for accepting the invite. Complete the form below to get
          started.
        </p>
      </div>
      <form>
        <div class="flex justify-between my-6">
          <div><label for="" class="font-normal text-sm">Enter OTP</label></div>
          <div></div>
        </div>

        <div class="flex justify-between">
          <div style="display: flex; flex-direction: row text-xs m-10">
            <OtpInput
              ref="otpInput"
              input-classes="otp-input"
              separator="-"
              :num-inputs="8"
              :should-auto-focus="true"
              :is-input-num="true"
              @on-change="handleOnChange"
              @on-complete="handleOnComplete"
            />
          </div>
        </div>

        <input type="hidden" name="otp" />

        <div class="flex justify-center mt-10">
          <div class="mb-2">
            <TextBox
              v-model="name"
              type="text"
              placeholder="Enter Full Name"
              label="Full Name"
            />
          </div>
          <div class="mb-2">
            <TextBox
              v-model="phone"
              type="tel"
              placeholder="Enter Phone"
              label="Phone"
            />
          </div>
        </div>

        <div class="flex justify-center mt-5">
          <div class="mb-2">
            <TextBox
              v-model="password"
              type="password"
              placeholder="Enter Password"
              label="Password"
            />
          </div>
          <div class="mb-2">
            <TextBox
              v-model="password_confirmation"
              type="password"
              placeholder="Enter Confirm Password"
              label="Confirm Password"
            />
          </div>
        </div>
        <ActionButton
          class="mt-5"
          text="Verify"
          @click.prevent="handleAcceptInvitation"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import OtpInput from "vue3-otp-input";
import TextBox from "@/components/TextBox.vue";
import logoUrl from "@/assets/logo.svg";
import Alert from "@/components/alert/Alert.vue";
import Loader from "@/components/loaders/Loader.vue";

export default {
  name: "OTP",
  components: { OtpInput, ActionButton, TextBox, Alert, Loader },
  data() {
    return {
      otp_code: "",
      name: "",
      phone: "",
      password: "",
      password_confirmation: "",
      logoUrl: logoUrl,
      showAlert: false,
      typeOfAlert: "Info",
      alertTitle: "Alert",
      alertMessage: "",
      alertBulkMessage: "",
    };
  },
  mounted() {
    this.email = this.$route.params.email;
  },
  computed: {
    ...mapGetters([
      "userInfo",
      "loadingInvites",
      "errorInvites",
      "successInvites",
    ]),
  },
  watch: {
    successInvites: function (val) {
      if (val) {
        this.alertTitle = "Invite Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorInvites: function (val) {
      if (val) {
        this.alertTitle = "Invites Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
  },
  methods: {
    ...mapActions(["acceptInvitation"]),
    handleAcceptInvitation() {
      this.acceptInvitation({
        otp_code: this.otp_code,
        name: this.name,
        phone: this.phone,
        password: this.password,
        password_confirmation: this.password_confirmation,
      });
    },
    handleOnComplete(value) {
      console.log("OTP completed: ", value);
      this.otp_code = value;
    },
    handleOnChange(value) {
      console.log("OTP changed: ", value);
      this.otp_code = value;
    },
  },
  setup() {
    const otpInput = null;

    const clearInput = () => {
      otpInput.value.clearInput();
    };

    return { clearInput, otpInput };
  },
};
</script>

<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(63, 63, 63, 0.3);
  text-align: center;
}
img {
  width: 6rem;
}

/* Enter Classes */
.fade-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-enter-active {
  transition: all 0.5s ease;
}

/* Leave classes */
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
