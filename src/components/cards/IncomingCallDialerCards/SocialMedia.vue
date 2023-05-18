<template>
  <div class="bg-slate-50 p-3">
    <div>
      <h3 class="text-sm font-semibold text-gray-700 my-3 text-left">
        Social Media Account
      </h3>
    </div>
    <div v-for="channel in socialAccounts" :key="channel">
      <div class="flex justify-between m-2 p-1">
        <div class="flex p-1">
          <!-- <div>
            <img
              class="w-10 h-10 rounded-full order-1"
              :src="channel.profilePic"
            />
          </div> -->
          <p class="m-2 font-normal text-xs text-gray-700 dark:text-gray-400">
            {{ channel.account_name }}
          </p>
        </div>

        <div v-if="channel.account_type == 'WhatsApp'">
          <img class="w-6 h-6 rounded-full order-1" :src="WhatsAppIcon" />
        </div>
        <div v-if="channel.account_type == 'Instagram'">
          <img class="w-6 h-6 rounded-full order-1" :src="InstagramIcon" />
        </div>
        <div v-if="channel.account_type == 'Facebook'">
          <img class="w-6 h-6 rounded-full order-1" :src="FacebookIcon" />
        </div>
        <div v-if="channel.account_type == 'Twitter'">
          <img class="w-6 h-6 rounded-full order-1" :src="TwitterIcon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";

export default {
  props: {
    socialAccounts: {
      type: Array,

      required: false,
    },
  },
  data() {
    return {
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
      socialMediaAccounts: [
        {
          name: "Linda Doe",
          profilePic: "https://placekitten.com/250/250",
          channel: "Whatsapp",
        },
        {
          name: "Whe__You",
          profilePic:
            "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg",
          channel: "Instagram",
        },
        {
          name: "tonui_2345",
          profilePic: "https://joeschmoe.io/api/v1/mail@ashallendesign.co.uk",
          channel: "Twitter",
        },
        {
          name: "Linda Doe",
          profilePic: "https://robohash.org/mail@ashallendesign.co.uk",
          channel: "Facebook",
        },
      ],
    };
  },
};
</script>

<style></style>
