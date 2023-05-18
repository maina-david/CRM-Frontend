<template>
  <section class="h-full gradient-form md:h-screen">
    <div class="-mt-16 absolute">
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
    <div
      class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
    >
      <div class="lg:w-5/12 px-4 md:px-0 justify-center">
        <div class="md:p-12 md:mx-2">
          <div
            class="block bg-white shadow-lg rounded-lg py-10 md:py-10 md:px-10 px-3"
          >
            <div class="text-center">
              <img :src="logoUrl" alt="GOIP Logo" class="mb-5 mx-auto" />

              <h4 class="text-xl font-semibold mt-1 mb-4 pb-1">
                Reset Password
              </h4>
            </div>
            <form class="grid justify-center">
              <div class="mb-4">
                <div>
                  <TextBox
                    v-model="reset_code"
                    type="text"
                    placeholder="Enter the code we sent to your email"
                    label="Reset Code"
                  />
                </div>
              </div>

              <div class="mb-4">
                <TextBox
                  v-model="password"
                  type="password"
                  placeholder="Enter Password"
                  label="Password"
                />
              </div>
              <div class="mb-4">
                <TextBox
                  v-model="password_confirmation"
                  type="password"
                  placeholder="Enter Confirm Password"
                  label="Confirm Password"
                />
              </div>
              <div class="pt-1 mb-8 pb-1">
                <ActionButton
                  text="Submit"
                  @click.prevent="handleResetPassword"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";
import logoUrl from "@/assets/logo.svg";
import Alert from "@/components/alert/Alert.vue";
import Loader from "@/components/loaders/Loader.vue";

export default {
  name: "ForgotPassword",
  components: { TextBox, ActionButton, Alert, Loader },
  data() {
    return {
      logoUrl: logoUrl,
      reset_code: "",
      password: "",
      password_confirmation: "",
      showAlert: false,
      typeOfAlert: "Info",
      alertTitle: "Alert",
      alertMessage: "",
      alertBulkMessage: "",
    };
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
    ...mapActions(["resetPassword"]),
    handleResetPassword() {
      this.resetPassword({
        token_code: this.reset_code,
        password: this.password,
        password_confirmation: this.password_confirmation,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
