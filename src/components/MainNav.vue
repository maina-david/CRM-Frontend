<template>
  <header class="w-full text-sm">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <router-link :to="{ name: 'Home' }">
          <div class="flex items-center h-full text-xl">{{ company }}</div>
        </router-link>
        <nav class="h=full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem"
              class="h-full ml-9 first:ml-0"
              data-test="main-nav-list-item"
            >
              <a href="" class="flex items-center h-full py-2.5">{{
                menuItem
              }}</a>
            </li>
          </ul>
        </nav>
        <div class="flex items-center h-full ml-auto">
          <profile-image v-if="isLoggedIn" data-test="profile-image" />
          <action-button
            v-else
            text="Sign In"
            :is-primary="true"
            data-test="login-button"
            @click="loginUser"
          />
        </div>
        <div>
          <router-link to="/adminDashboard">Go toDashboard</router-link>
          <router-link to="/login">Go to Login</router-link>
          <router-link to="/signup">Go to Signup</router-link>
          <router-link to="/forgot_password">Go to ForgotPassword</router-link>
          <router-link to="/reset_password">Go to ResetPassword</router-link>
        </div>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import ProfileImage from "@/components/ProfileImage.vue";

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
  },
  data() {
    return {
      company: "GoIP SaaS",
      menuItems: [
        "Teams",
        "Locations",
        "Life at GoIP",
        "How we hire",
        "students",
        "Jobs",
      ],
      isLoggedIn: false,
    };
  },
  methods: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
};
</script>
