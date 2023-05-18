<template>
  <div class="">
    <div
      class="bg-white rounded-sm shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex justify-between items-center mb-4 border-b p-2">
        <div>
          <h5
            class="font-bold text-lg leading-none text-gray-900 dark:text-white"
          >
            {{ viewAll ? "All" : "Unread" }} Notifications
          </h5>
        </div>
        <div class="flex gap-3">
          <ActionButton
            v-if="viewAll"
            @click="handleViewUnreadNotifications"
            text="View Unread"
          />
          <ActionButton
            v-else
            @click="handleViewAllNotifications"
            text="View All"
          />

          <ActionButton
            @click="handleClearAllNotifications"
            text="Clear All Notifications"
            class="bg-red-500"
          />
        </div>
      </div>
      <dl
        class="text-gray-900 divide-y divide-gray-200 text-xs dark:text-white dark:divide-gray-700"
      >
        <div
          class="flex flex-col pb-3 text-xs p-2"
          v-for="notification in notifications"
          :key="notification.id"
        >
          <div class="flex justify-between">
            <div>
              <dd class="text-sm my-1 font-semibold">
                {{ notification.data.title }}
              </dd>
            </div>
            <div class="mt-2">
              <span class="bg-slate-100 font-medium p-1 rounded-sm text-xs">{{
                formatDate(notification.created_at)
              }}</span>
            </div>
          </div>
          <div>
            <dt class="text-gray-500 my-2 md:text-xs dark:text-gray-400">
              {{ notification.data.message }}
            </dt>
          </div>
          <div>
            <dt
              class="text-gray-500 my-2 md:text-xs dark:text-gray-400"
              v-if="notification.read_at != null"
            >
              Read at :
              <span class="bg-slate-100 font-medium p-1 rounded-sm text-xs">
                {{ formatDate(notification.read_at) }}
              </span>
            </dt>
            <div v-else class="my-2">
              <span
                v-if="notification.read_at == null"
                @click="handleMarkAsRead(notification)"
                class="bg-red-100 text-red-500 font-medium p-1 rounded-sm text-xs cursor-pointer"
              >
                Mark as Read
              </span>
            </div>
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import ActionButton from "@/components/ActionButton.vue";

export default {
  name: "NotificationsCard",
  data() {
    return {
      viewAll: false,
    };
  },
  components: { ActionButton },
  created() {
    this.getUnreadNotifications();
  },
  computed: {
    ...mapGetters(["notifications"]),
  },
  methods: {
    ...mapActions([
      "getAllNotifications",
      "getUnreadNotifications",
      "markAsRead",
      "clearNotifications",
    ]),
    formatDate(date) {
      return moment(date).fromNow();
    },
    handleMarkAsRead(notification) {
      console.log("marked as read", notification.id);
      this.markAsRead({
        notification_id: notification.id,
      });
    },
    handleViewUnreadNotifications() {
      this.viewAll = false;
      this.getUnreadNotifications();
    },
    handleViewAllNotifications() {
      this.viewAll = true;
      this.getAllNotifications();
    },
    handleClearAllNotifications() {
      if (confirm("Confirm Clear ALL NOTIFICATIOANS?") == true) {
        console.log("clear all notifications");
        this.clearNotifications();
      } else {
        console.log("clear all notifications cancelled");
      }
    },
  },
};
</script>

<style></style>
