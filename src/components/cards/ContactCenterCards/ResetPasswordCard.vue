<template>
  <div class="">
    <div
      class="p-3 max-w-md bg-white rounded-sm shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex justify-between items-center mb-4">
        <h5 class="font-bold leading-none text-gray-900 dark:text-white">
          Reset Password
        </h5>
      </div>
      <div class="flow-root">
        <div class="mb-2">
          <TextBox
            v-model="current_password"
            type="password"
            placeholder="Enter Current Password"
            label="Current Password"
          />
        </div>
        <div class="mb-2">
          <TextBox
            v-model="password"
            type="password"
            placeholder="Enter New Password"
            label="Enter New Password"
          />
        </div>
        <div class="mb-2">
          <TextBox
            v-model="password_confirmation"
            type="password"
            placeholder="Confirm New Password"
            label="Confirm New Password"
          />
        </div>
        <div>
          <ActionButton
            class="mt-10"
            text="Change Password"
            @click="handleChangePassword"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ActionButton from "@/components/ActionButton.vue";
import TextBox from "@/components/TextBox.vue";

export default {
  name: "ResetPasswordCard",
  data() {
    return {
      current_password: "",
      password: "",
      password_confirmation: "",
    };
  },
  components: { ActionButton, TextBox },
  methods: {
    ...mapActions(["changePassword"]),
    handleChangePassword() {
      if (this.password == this.password_confirmation) {
        console.log("correct passwords");
        this.changePassword({
          current_password: this.current_password,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
        this.current_password = "";
        this.password = "";
        this.password_confirmation = "";
      }
    },
  },
};
</script>

<style></style>
