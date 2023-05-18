<template>
  <div>
    <div class="-mt-40 absolute">
      <Loader v-if="loading" />
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
    <div class="py-10 px-10 bg-white w-fit mx-auto text-center my-24 shadow-lg">
      <form>
        <span v-if="email" class="mb-6"
          >Check your email at {{ email }} to get your OTP code</span
        >
        <label for="" class="font-semibold text-lg">Enter OTP</label>
        <div class="flex justify-between mt-10">
          <div style="display: flex; flex-direction: row">
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
        <button @click="clearInput()" class="mt-6">Clear Input</button>
        <ActionButton class="mt-5" text="Verify" @click.prevent="handleOtp" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import OtpInput from "vue3-otp-input";
import Alert from "@/components/alert/Alert.vue";
import Loader from "@/components/loaders/Loader.vue";

export default {
  name: "OTP",
  components: { OtpInput, ActionButton, Alert, Loader },
  data() {
    return {
      email: "",
      otp_code: "",
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
    ...mapGetters(["userInfo", "loading", "error", "success"]),
  },
  watch: {
    success: function (val) {
      if (val) {
        this.alertTitle = "Auth Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    error: function (val) {
      if (val) {
        this.alertTitle = "Authentication Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
  },
  methods: {
    ...mapActions(["otpResponse"]),
    handleOtp() {
      this.otpResponse({
        email: this.email,
        otp_code: this.otp_code,
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
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
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
