<template>
  <div>
    <div class="bg-slate-100 shadow-sm rounded-sm p-3 text-xs m-3">
      <div class="flex justify-between">
        <div>
          <h3 class="p-2">
            <span class="font-semibold"> {{ name }} </span>
          </h3>
        </div>
        <div>
          <MusicPlayer :modelValue="audioUrl" @click="toggleAudio(audioUrl)" />
        </div>
      </div>

      <div class="flex justify-between"></div>
    </div>
  </div>
</template>

<script>
import MusicPlayer from "@/components/MusicPlayer.vue";

export default {
  components: { MusicPlayer },
  props: {
    name: { type: String },
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
};
</script>

<style></style>
