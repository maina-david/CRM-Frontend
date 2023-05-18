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

              <h4 class="text-xl font-semibold mt-1 mb-4 pb-1">Login</h4>
              <router-link :to="{ name: 'SignUp' }">
                <p class="text-sm mb-4 hover:text-base hover:text-blue-700">
                  Don't have an account? Sign up
                </p>
              </router-link>
              <router-link :to="{ name: 'AcceptInvitation' }">
                <p class="text-sm mb-12 hover:text-base hover:text-blue-700">
                  Already Invited? Accept invitation
                </p>
              </router-link>
            </div>
            <form class="grid justify-center">
              <div class="mb-4">
                <div>
                  <TextBox
                    v-model="email"
                    type="email"
                    label="Email"
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              <div class="mb-4">
                <Password v-model="password" />
              </div>
              <div class="pt-1 mb-8 pb-1">
                <ActionButton text="Login" @click.prevent="handleLogin" />
                <router-link :to="{ name: 'ForgotPassword' }">
                  <div class="text-center">
                    <p
                      class="text-xs mb-5 mt-3 underline hover:text-base hover:text-blue-700"
                    >
                      Forgot Password
                    </p>
                  </div>
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import TextBox from "@/components/TextBox.vue";
import Password from "@/components/Password.vue";
import ActionButton from "@/components/ActionButton.vue";
import logoUrl from "@/assets/logo.svg";
import Alert from "@/components/alert/Alert.vue";
import Loader from "@/components/loaders/Loader.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  components: { TextBox, ActionButton, Alert, Loader, Password },
  data() {
    return {
      email: "",
      password: "",
      logoUrl: logoUrl,
      showAlert: false,
      typeOfAlert: "Info",
      alertTitle: "Alert",
      alertMessage: "",
      alertBulkMessage: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo", "loading", "error", "success"]),
    ...mapState(["loadingLogin", "loginInfo", "loginError"]),
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
    ...mapActions(["loginUser"]),

    handleLogin() {
      this.loginUser({ email: this.email, password: this.password });
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
