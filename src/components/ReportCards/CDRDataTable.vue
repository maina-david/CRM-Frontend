<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div class="flex justify-between">
      <div>
        <h1 class="font-semibold">CDR Report</h1>
      </div>
      <div>
        <audio id="player" class="" controls="controls">
          <source id="mp3_src" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
    <hr
      class="border-1 mt-5 border-gray-300 cursor-pointer hover:border-red-500 duration-500"
    />

    <table
      class="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400 p-4"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            class="py-2 px-3"
            v-for="head in tableHead"
            :key="head"
          >
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="tableData.length <= 0"
          class="bg-white border-b dark:bg-gray-800 text-center p-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div class="p-3 m-3 text-center">
            You do not have any records to show
          </div>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-else
          v-for="data in tableData"
          :key="data"
        >
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.call_id }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.phone_number }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.agent_name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              v-if="data.desposition == 'ANSWERED'"
              class="rounded-sm m-2 p-1 text-white bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Answered
            </span>
            <span
              v-if="data.desposition == 'ABANDONED'"
              class="rounded-sm m-2 p-1 text-white bg-red-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Abandoned
            </span>
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ format_time(data.call_time) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ format_time(data.hold_time) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ format_time(data.mute_time) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ format_time(data.queue_time) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ format_time(data.time_to_answer) }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ format_date(data.call_date) }}
          </td>

          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <MusicPlayer
              :modelValue="audioUrl"
              @click="toggleAudio(data.audio_url)"
            />
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              @click="handleAddToBalcklist(data)"
              class="rounded-sm m-2 p-1 text-white bg-red-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Add To Blacklist
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MusicPlayer from "@/components/MusicPlayer.vue";
/* import MusicPlayer from "@/components/MusicPlayer.vue"; */
import moment from "moment";

export default {
  name: "CDRDataTableCard",
  components: { MusicPlayer },
  props: {
    tableHead: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
  },
  data() {
    return {
      audioUrl: "",
    };
  },
  methods: {
    ...mapActions(["addToBlacklist"]),
    handleAddToBalcklist(data) {
      if (
        confirm("Confirm Add " + data.phone_number + " to Blacklist?") == true
      ) {
        console.log("add to blacklist", data.phone_number);
        this.addToBlacklist({
          phone_number: data.phone_number,
        });
      } else {
        console.log("add to blacklist cancelled");
      }
    },
    format_time(s) {
      var seconds = s; // or "2000"
      seconds = parseInt(seconds); //because moment js dont know to handle number in string format
      var format =
        Math.floor(moment.duration(seconds, "seconds").asHours()) +
        ":" +
        moment.duration(seconds, "seconds").minutes() +
        ":" +
        moment.duration(seconds, "seconds").seconds();
      return format;
    },
    format_date(date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    toggleAudio(sourceUrl) {
      var audio = document.getElementById("player");
      var source = document.getElementById("mp3_src");
      source.src = sourceUrl;
      audio.pause();
      console.log(sourceUrl);
      console.log(audio);
      if (sourceUrl) {
        audio.load();
        audio.play();
      }
    },
  },
};
</script>

<style></style>
