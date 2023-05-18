<template>
  <teleport to="body">
    <div
      ref="modal-backdrop"
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <transition
          enter-active-class="transition ease-out duration-300 transform "
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
        >
          <div
            class="relative bg-white rounded-sm text-left overflow-hidden shadow-xl p-8"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            <div class="border-b">
              <div class="p-3">
                <h2 class="font-medium text-blue-400">
                  {{ state }} Social Media Account
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="mt-5">
                <div v-if="state == 'Create'">
                  <Dropdown
                    :options="selectsupportedChannelBox"
                    label="Select the Social Media Platform"
                    select="Select Platform"
                    v-model="platform"
                  />
                </div>

                <div v-if="platform == 1 || channelAccount == 'whatsapp'">
                  <TextBox
                    type="text"
                    placeholder="Enter Account Name"
                    label="Account Name"
                    v-model="whatsapp_name"
                  />
                  <TextBox
                    type="text"
                    placeholder="Give a Description of the Account"
                    label="Account Description"
                    v-model="whatsapp_description"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter phone number"
                    label="Phone number"
                    v-model="whatsapp_phone_number"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter phone number ID"
                    label="Phone number ID"
                    v-model="whatsapp_phone_number_id"
                  />
                </div>
                <div v-if="platform == 2 || channelAccount == 'facebook'">
                  <TextBox
                    type="text"
                    placeholder="Enter Page ID"
                    label="Page ID"
                    v-model="facebook_page_id"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Page Name"
                    label="Page Name"
                    v-model="facebook_page_name"
                  />
                  <TextBox
                    type="text"
                    placeholder="Give a Description of the Page"
                    label="Page Description"
                    v-model="facebook_page_description"
                  />
                  <TextBox
                    type="text"
                    placeholder="Access token"
                    label="Access token"
                    v-model="facebook_page_access_token"
                  />
                </div>
                <div v-if="platform == 3 || channelAccount == 'instagram'">
                  <TextBox
                    type="text"
                    placeholder="Enter Facebook Page ID"
                    label="Facebook Page ID"
                    v-model="instagram_facebook_page_id"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Instagram Account ID"
                    label="Instagram Account ID"
                    v-model="instagram_account_id"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Instagram Name"
                    label="Instagram Name"
                    v-model="instagram_name"
                  />
                  <TextBox
                    type="text"
                    placeholder="Give a Description"
                    label="Instagram Description"
                    v-model="instagram_description"
                  />
                </div>
                <div v-if="platform == 4 || channelAccount == 'twitter'">
                  <TextBox
                    type="text"
                    placeholder="Enter Twitter Account ID"
                    label="Twitter Account ID"
                    v-model="twitter_account_id"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Twitter Account Name"
                    label="Twitter Account Name"
                    v-model="twitter_account_name"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Twitter Description"
                    label="Twitter Description"
                    v-model="twitter_description"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Consumer Key"
                    label="Consumer Key"
                    v-model="twitter_consumer_key"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Consumer Secret"
                    label="Consumer Secret"
                    v-model="twitter_consumer_secret"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Access Token"
                    label="Access Token"
                    v-model="twitter_access_token"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Access Token Secret"
                    label="Access Token Secret"
                    v-model="twitter_access_token_secret"
                  />
                </div>
                <div v-if="platform == 5 || channelAccount == 'email'">
                  <TextBox
                    type="text"
                    placeholder="Enter Email Name"
                    label="Email Name"
                    v-model="email_name"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Email"
                    label="Email"
                    v-model="email_email"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Protocol"
                    label="Protocol"
                    v-model="email_protocol"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter Port"
                    label="Port"
                    v-model="email_port"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter your Mail Server"
                    label="Mail Server"
                    v-model="mail_server"
                  />
                  <TextBox
                    type="password"
                    placeholder="Enter your Password"
                    label="Password"
                    v-model="email_password"
                  />
                </div>
                <div v-if="platform == 6 || channelAccount == 'sms'">
                  <TextBox
                    type="text"
                    placeholder="Enter SMS Username"
                    label="SMS Username"
                    v-model="sms_username"
                  />
                  <TextBox
                    type="text"
                    placeholder="Enter API Key"
                    label="API Key"
                    v-model="sms_api_key"
                  />
                </div>

                <ActionButton
                  v-if="state == 'Edit'"
                  @click="handleEditAccount"
                  text="'Edit Social Media Account"
                  class="mt-5"
                />
                <ActionButton
                  v-else
                  @click="handleCreateAccount"
                  text="Create Social Media Account"
                  class="mt-5"
                />
              </div>
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import Dropdown from "@/components/Dropdown.vue";
import TextBox from "@/components/TextBox.vue";
import { ref, watch } from "vue";
import { mapActions, mapGetters } from "vuex";

import ActionButton from "@/components/ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    default: "",
  },
  currentChannelBox: {
    type: Object,
    default: {},
  },
  channelAccount: {
    type: String,
    default: "",
  },
};
export default {
  name: "CreateSocialMediaAccount",
  props,
  components: { TextBox, ActionButton, Dropdown },
  data() {
    return {
      platform: "",
      whatsapp_id: "",
      whatsapp_name: "",
      whatsapp_description: "",
      whatsapp_phone_number: "",
      whatsapp_phone_number_id: "",
      facebook_id: "",
      facebook_page_id: "",
      facebook_page_name: "",
      facebook_page_description: "",
      facebook_page_access_token: "",
      instagram_id: "",
      instagram_facebook_page_id: "",
      instagram_account_id: "",
      instagram_name: "",
      instagram_description: "",
      twitter_id: "",
      twitter_account_id: "",
      twitter_account_name: "",
      twitter_description: "",
      twitter_consumer_key: "",
      twitter_consumer_secret: "",
      twitter_access_token: "",
      twitter_access_token_secret: "",
      email_id: "",
      email_name: "",
      email_email: "",
      email_protocol: "",
      email_port: "",
      mail_server: "",
      email_password: "",
      sms_id: "",
      sms_username: "",
      sms_api_key: "",
    };
  },
  setup(props) {
    const showModal = ref(false);

    function closeModal() {
      showModal.value = false;
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      }
    );

    return {
      closeModal,
      showModal,
    };
  },
  created() {
    this.getSupportedChannelBox();
  },
  updated() {
    if (this.state == "Edit") {
      if (this.channelAccount == "whatsapp") {
        this.whatsapp_id = this.currentChannelBox.id;
        this.whatsapp_name = this.currentChannelBox.account_name;
        this.whatsapp_description = this.currentChannelBox.description;
        this.whatsapp_phone_number = this.currentChannelBox.phone_number;
        this.whatsapp_phone_number_id = this.currentChannelBox.phone_number_id;
      }
      if (this.channelAccount == "facebook") {
        this.facebook_id = this.currentChannelBox.id;
        this.facebook_page_id = this.currentChannelBox.page_id;
        this.facebook_page_name = this.currentChannelBox.page_name;
        this.facebook_page_description =
          this.currentChannelBox.page_description;
        this.facebook_page_access_token =
          this.currentChannelBox.page_access_token;
      }
      if (this.channelAccount == "instagram") {
        this.instagram_id = this.currentChannelBox.id;
        this.instagram_facebook_page_id =
          this.currentChannelBox.facebook_page_id;
        this.instagram_account_id = this.currentChannelBox.account_id;
        this.instagram_name = this.currentChannelBox.account_name;
        this.instagram_description = this.currentChannelBox.account_description;
      }
      if (this.channelAccount == "twitter") {
        this.twitter_id = this.currentChannelBox.id;
        this.twitter_account_id = this.currentChannelBox.account_id;
        this.twitter_account_name = this.currentChannelBox.account_name;
        this.twitter_description = this.currentChannelBox.account_description;
        this.twitter_consumer_key = this.currentChannelBox.consumer_key;
        this.twitter_consumer_secret = this.currentChannelBox.consumer_secret;
        this.twitter_access_token = this.currentChannelBox.access_token;
        this.twitter_access_token_secret =
          this.currentChannelBox.access_token_secret;
      }
      if (this.channelAccount == "email") {
        this.email_id = this.currentChannelBox.id;
        this.email_name = this.currentChannelBox.name;
        this.email_email = this.currentChannelBox.email;
        this.email_protocol = this.currentChannelBox.protocol;
        this.email_port = this.currentChannelBox.port;
        this.mail_server = this.currentChannelBox.mail_server;
        this.email_password = this.currentChannelBox.password;
      }
      if (this.channelAccount == "sms") {
        this.sms_id = this.currentChannelBox.id;
        this.sms_username = this.currentChannelBox.username;
        this.sms_api_key = this.currentChannelBox.apiKey;
      }
    } else {
      this.whatsapp_id = "";
      this.whatsapp_name = "";
      this.whatsapp_description = "";
      this.whatsapp_phone_number = "";
      this.whatsapp_phone_number_id = "";
      this.facebook_id = "";
      this.facebook_page_id = "";
      this.facebook_page_name = "";
      this.facebook_page_description = "";
      this.facebook_page_access_token = "";
      this.instagram_id = "";
      this.instagram_facebook_page_id = "";
      this.instagram_account_id = "";
      this.instagram_name = "";
      this.instagram_description = "";
      this.twitter_id = "";
      this.twitter_account_id = "";
      this.twitter_account_name = "";
      this.twitter_description = "";
      this.twitter_consumer_key = "";
      this.twitter_consumer_secret = "";
      this.twitter_access_token = "";
      this.twitter_access_token_secret = "";
      this.email_id = "";
      this.email_name = "";
      this.email_email = "";
      this.email_protocol = "";
      this.email_port = "";
      this.mail_server = "";
      this.email_password = "";
      this.sms_id = "";
      this.sms_username = "";
      this.sms_api_key = "";
    }
  },
  methods: {
    ...mapActions([
      "createWhatsappAccount",
      "createFacebookAccount",
      "createInstagramAccount",
      "createTwitterAccount",
      "createEmailAccount",
      "createSmsAccount",
      "updateWhatsappAccount",
      "updateFacebookAccount",
      "updateInstagramAccount",
      "updateTwitterAccount",
      "updateEmailAccount",
      "updateSmsAccount",
      "getSupportedChannelBox",
    ]),
    handleCreateAccount() {
      if (this.platform == 1) {
        this.createWhatsappAccount({
          account_name: this.whatsapp_name,
          description: this.whatsapp_description,
          phone_number: this.whatsapp_phone_number,
          phone_number_id: this.whatsapp_phone_number_id,
          active: true,
        });
      }
      if (this.platform == 2) {
        this.createFacebookAccount({
          page_id: this.facebook_page_id,
          page_name: this.facebook_page_name,
          page_description: this.facebook_page_description,
          page_access_token: this.facebook_page_access_token,
        });
      }
      if (this.platform == 3) {
        this.createInstagramAccount({
          facebook_page_id: this.instagram_facebook_page_id,
          account_id: this.instagram_account_id,
          account_name: this.instagram_name,
          account_description: this.instagram_description,
        });
      }
      if (this.platform == 4) {
        this.createTwitterAccount({
          account_id: this.twitter_account_id,
          account_name: this.twitter_account_name,
          account_description: this.twitter_description,
          consumer_key: this.twitter_consumer_key,
          consumer_secret: this.twitter_consumer_secret,
          access_token: this.twitter_access_token,
          access_token_secret: this.twitter_access_token_secret,
        });
      }
      if (this.platform == 5) {
        this.createEmailAccount({
          name: this.email_name,
          email: this.email_email,
          protocol: this.email_protocol,
          port: this.email_port,
          mail_server: this.mail_server,
          password: this.email_password,
          active: true,
        });
      }
      if (this.platform == 6) {
        this.createSmsAccount({
          username: this.sms_username,
          apiKey: this.sms_api_key,
          active: true,
        });
      }
      this.whatsapp_id = "";
      this.whatsapp_name = "";
      this.whatsapp_description = "";
      this.whatsapp_phone_number = "";
      this.whatsapp_phone_number_id = "";
      this.facebook_id = "";
      this.facebook_page_id = "";
      this.facebook_page_name = "";
      this.facebook_page_description = "";
      this.facebook_page_access_token = "";
      this.instagram_id = "";
      this.instagram_facebook_page_id = "";
      this.instagram_account_id = "";
      this.instagram_name = "";
      this.instagram_description = "";
      this.twitter_id = "";
      this.twitter_account_id = "";
      this.twitter_account_name = "";
      this.twitter_description = "";
      this.twitter_consumer_key = "";
      this.twitter_consumer_secret = "";
      this.twitter_access_token = "";
      this.twitter_access_token_secret = "";
      this.email_id = "";
      this.email_name = "";
      this.email_email = "";
      this.email_protocol = "";
      this.email_port = "";
      this.mail_server = "";
      this.email_password = "";
      this.sms_id = "";
      this.sms_username = "";
      this.sms_api_key = "";
      this.showModal = false;
    },
    handleEditAccount() {
      if (this.channelAccount == "whatsapp") {
        this.updateWhatsappAccount({
          whatsapp_id: this.whatsapp_id,
          account_name: this.whatsapp_name,
          description: this.whatsapp_description,
          phone_number: this.whatsapp_phone_number,
          phone_number_id: this.whatsapp_phone_number_id,
          active: true,
        });
      }
      if (this.channelAccount == "facebook") {
        this.updateFacebookAccount({
          facebook_id: this.facebook_id,
          page_id: this.facebook_page_id,
          page_name: this.facebook_page_name,
          page_description: this.facebook_page_description,
          page_access_token: this.facebook_page_access_token,
        });
      }
      if (this.channelAccount == "instagram") {
        this.updateInstagramAccount({
          instagram_id: this.instagram_id,
          facebook_page_id: this.instagram_facebook_page_id,
          account_id: this.instagram_account_id,
          account_name: this.instagram_name,
          account_description: this.instagram_description,
        });
      }
      if (this.channelAccount == "twitter") {
        this.updateTwitterAccount({
          twitter_id: this.twitter_id,
          account_id: this.twitter_account_id,
          account_name: this.twitter_account_name,
          account_description: this.twitter_description,
          consumer_key: this.twitter_consumer_key,
          consumer_secret: this.twitter_consumer_secret,
          access_token: this.twitter_access_token,
          access_token_secret: this.twitter_access_token_secret,
        });
      }
      if (this.channelAccount == "email") {
        this.updateEmailAccount({
          email_id: this.email_id,
          name: this.email_name,
          email: this.email_email,
          protocol: this.email_protocol,
          port: this.email_port,
          mail_server: this.mail_server,
          password: this.email_password,
          active: true,
        });
      }
      if (this.channelAccount == "sms") {
        this.updateSmsAccount({
          sms_id: this.sms_id,
          username: this.sms_username,
          apiKey: this.sms_api_key,
          active: true,
        });
      }
      this.whatsapp_id = "";
      this.whatsapp_name = "";
      this.whatsapp_description = "";
      this.whatsapp_phone_number = "";
      this.whatsapp_phone_number_id = "";
      this.facebook_id = "";
      this.facebook_page_id = "";
      this.facebook_page_name = "";
      this.facebook_page_description = "";
      this.facebook_page_access_token = "";
      this.instagram_id = "";
      this.instagram_facebook_page_id = "";
      this.instagram_account_id = "";
      this.instagram_name = "";
      this.instagram_description = "";
      this.twitter_id = "";
      this.twitter_account_id = "";
      this.twitter_account_name = "";
      this.twitter_description = "";
      this.twitter_consumer_key = "";
      this.twitter_consumer_secret = "";
      this.twitter_access_token = "";
      this.twitter_access_token_secret = "";
      this.email_id = "";
      this.email_name = "";
      this.email_email = "";
      this.email_protocol = "";
      this.email_port = "";
      this.mail_server = "";
      this.email_password = "";
      this.sms_id = "";
      this.sms_username = "";
      this.sms_api_key = "";
      this.showModal = false;
    },
  },
  computed: {
    ...mapGetters(["selectsupportedChannelBox"]),
  },
};
</script>

<style></style>
