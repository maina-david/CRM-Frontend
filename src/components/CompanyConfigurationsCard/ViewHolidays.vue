<template>
  <div v-for="day in holidays" :key="day.id">
    <div class="bg-slate-100 shadow-sm rounded-sm p-3 text-xs m-3">
      <div class="flex justify-between">
        <div>
          <div class="border-b">
            <h3 class="p-2">
              <span class="font-semibold"> {{ day.date }} </span>
            </h3>
          </div>
          <h3 class="p-2">
            <span> {{ day.name }} </span>
          </h3>
        </div>
        <div class="flex gap-4">
          <div @click="handleHolidayDelete(day)">
            <span
              class="material-icons text-sm text-gray-700 hover:text-red-500"
              >delete</span
            >
          </div>
          <div @click="handleHolidayState('Edit', day)">
            <span
              class="material-icons text-sm text-gray-700 hover:text-green-500"
              >edit</span
            >
          </div>
        </div>
      </div>

      <div class="flex justify-between">
        <div>
          <h3 class="p-2">{{ day.description }}</h3>
        </div>
        <MusicPlayer
          :modelValue="audioUrl"
          @click="toggleAudio(day.file.url)"
        />
      </div>
    </div>
    <HolidayModal
      :show="showHolidayModal"
      :holidayState="holidayState"
      :currentHoliday="currentHoliday"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MusicPlayer from "@/components/MusicPlayer.vue";
import { ref } from "vue";
import HolidayModal from "../modals/ContactCenterModals/HolidayModal.vue";

export default {
  components: { MusicPlayer, HolidayModal },
  props: {
    holidays: { type: Array },
    audioUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentHoliday: "",
      holidayState: "",
    };
  },
  methods: {
    ...mapActions(["removeHoliday"]),
    handleHolidayState(state, data) {
      this.currentHoliday = data;
      this.holidayState = state;
      this.showHolidayModal = !this.showHolidayModal;
    },
    handleHolidayDelete(data) {
      if (confirm("Confirm Delete " + data.name + " Holiday?") == true) {
        console.log("delete holiday");
        this.removeHoliday({
          id: data.id,
        });
      } else {
        console.log("change company off cancelled");
      }
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
  setup() {
    const showWorkingHourModal = ref(false);
    const showHolidayModal = ref(false);

    return {
      showWorkingHourModal,
      showHolidayModal,
    };
  },
};
</script>

<style></style>
