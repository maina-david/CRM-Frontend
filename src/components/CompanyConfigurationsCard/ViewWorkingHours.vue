<template>
  <div class="grid grid-cols-3 gap-3">
    <div v-for="work in workingDays" :key="work.id">
      <div class="bg-slate-100 shadow-sm rounded-sm p-3 text-xs m-3">
        <div class="flex justify-between">
          <div>
            <h3 class="p-2">
              Working Day:
              <span> {{ work.date }} </span>
            </h3>
          </div>
        </div>

        <div class="flex justify-between">
          <div>
            <h3 class="p-2">
              Time: {{ work.start_time }} to {{ work.end_time }}
            </h3>
          </div>
          <MusicPlayer
            :modelValue="audioUrl"
            @click="toggleAudio(work.file.url)"
          />
        </div>
      </div>
      <WorkingHoursModal :show="showWorkingHourModal" />
    </div>
  </div>
</template>

<script>
import MusicPlayer from "../MusicPlayer.vue";
import WorkingHoursModal from "../modals/ContactCenterModals/WorkingHoursModal.vue";
import { ref } from "vue";

export default {
  components: { MusicPlayer, WorkingHoursModal },
  props: {
    workingDays: { type: Array },
    time: { type: String },
    audioUrl: {
      type: String,
      default: "",
    },
  },
  methods: {
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
