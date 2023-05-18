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
      <div
        class="xl:ml-20 xl:w-6/12 lg:w-6/12 md:w-8/12 mb-12 md:mb-0 justify-center"
      >
        <div class="md:p-12 md:mx-2">
          <div
            class="block bg-white shadow-lg rounded-lg py-10 md:py-10 md:px-10 px-3"
          >
            <div class="text-center justify-center">
              <img :src="logoUrl" alt="GOIP Logo" class="mb-5 mx-auto" />
              <h4 class="text-xl font-semibold mt-1 mb-4 pb-1">Sign Up</h4>
              <router-link :to="{ name: 'LogIn' }">
                <p class="text-sm mb-12 hover:text-base hover:text-blue-700">
                  Already have an account? Sign in
                </p>
              </router-link>
            </div>
            <form class="grid justify-center">
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
                  v-model="phone_number"
                  type="tel"
                  placeholder="Enter Phone"
                  label="Phone"
                />
              </div>

              <div class="mb-2">
                <TextBox
                  v-model="email"
                  type="email"
                  placeholder="Enter Email"
                  label="Email"
                />
              </div>
              <div class="mb-2">
                <Password v-model="password" />
              </div>
              <div class="mb-2">
                <TextBox
                  v-model="password_confirmation"
                  type="password"
                  placeholder="Enter Confirm Password"
                  label="Confirm Password"
                />
              </div>
              <CheckBox
                label="Accept terms and conditions to continue"
                :value="value"
              />
              <div class="pt-1 mb-5 mt-2 pb-1">
                <ActionButton
                  text="Create Account"
                  @click.prevent="handleSignup"
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
import { mapActions, mapState, mapGetters } from "vuex";
import TextBox from "@/components/TextBox.vue";
import Password from "@/components/Password.vue";

import CheckBox from "@/components/CheckBox.vue";
import ActionButton from "@/components/ActionButton.vue";
import logoUrl from "@/assets/logo.svg";
import Alert from "@/components/alert/Alert.vue";
import Loader from "@/components/loaders/Loader.vue";

export default {
  name: "SignUp",
  components: { TextBox, CheckBox, ActionButton, Alert, Loader, Password },
  data() {
    return {
      logoUrl: logoUrl,
      name: "",
      email: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
      value: "Yes",
      showAlert: false,
      typeOfAlert: "Info",
      alertTitle: "Alert",
      alertMessage: "",
      alertBulkMessage: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo", "loading", "error", "success"]),
    ...mapState(["loadingSignup", "signupInfo", "signupError"]),
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
    ...mapActions(["signupUser"]),
    handleSignup() {
      this.signupUser({
        name: this.name,
        email: this.email,
        phone_number: this.phone_number,
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
