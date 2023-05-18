<template>
  <ul
    class="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  >
    <h1 class="font-bold text-lg m-3 text-blue-500">Queue Management</h1>

    <li
      class="py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
      v-for="queueName in listItems"
      :key="queueName"
    >
      <!--Row Number 1-->

      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-2">
          <h5 class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
            {{ queueName }}
          </h5>
        </div>
        <div>
          <span
            class="text-sm text-blue-500 font-semibold dark:text-gray-600 m-2"
          >
            Music On Hold
          </span>
        </div>
      </div>

      <!--Row Number 2-->
      <div class="grid grid-cols-6 gap-2 mt-3">
        <div class="col-span-2">
          <span class="text-sm text-gray-500 dark:text-gray-600 m-2"
            >Assigned queue
          </span>
        </div>
        <div class="">
          <span class="text-sm text-gray-500 dark:text-gray-600 m-2"
            >Assigned music
          </span>
        </div>
        <div class="">
          <ChangeMusic />
        </div>
        <div class="">
          <MusicPlayer />
        </div>
        <div class="">
          <ActionButton :text="text" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import ActionButton from "./ActionButton.vue";
import MusicPlayer from "./MusicPlayer.vue";
import ChangeMusic from "./ChangeMusic.vue";

export default {
  name: "ListItems",
  props: [],
  components: { ActionButton, MusicPlayer, ChangeMusic },
  data() {
    return {
      listItems: ["Queue 1", "Queue2", "Queue 3", "Queue 4"],
      text: "Confirm",
    };
  },
};
</script>

<style></style>
