<template>
  <main>
    <div class="ml-12">
      <div class="flex justify-between mt-10 border-b">
        <div class="">
          <h2 class="font-bold text-xl p-3">{{ currentMOH.name }}</h2>
        </div>
        <div>
          <audio id="player" class="mb-3" controls="controls">
            <source id="mp3_src" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-4 mt-10">
        <div class="col-span-1">
          <CreateMOHFIleCard />
        </div>
        <div class="col-span-2 w-full">
          <div>
            <Draggable
              v-model="currentMOHAudioFiles"
              group="currentMOHAudioFiles"
              @start="drag = true"
              @end="drag = false"
              sort="element.sequence"
              item-key="element.sequence"
            >
              <template #item="{ element }">
                <div
                  class="bg-white flex rounded-sm justify-between shadow-sm p-5 m-3"
                >
                  <div>
                    <div>{{ element.name }}</div>
                    <div class="mt-5">
                      <MusicPlayer
                        :modelValue="audioUrl"
                        @click="toggleAudio(element.file_url)"
                      />
                    </div>
                  </div>
                  <div>
                    <ActionButton
                      @click="handleDeleteMohFile(element)"
                      text="Delete"
                      class="bg-red-400"
                    />
                  </div>
                </div>
              </template>
            </Draggable>
          </div>
          <div v-if="reorderButton" class="m-3">
            <ActionButton
              @click="handleReorderMohFile"
              text="Reorder Files"
              class="bg-lime-500"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CreateMOHFIleCard from "@/components/cards/ContactCenterCards/createMOHFIleCard.vue";
import Draggable from "vuedraggable";
import ActionButton from "@/components/ActionButton.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";

export default {
  components: { CreateMOHFIleCard, Draggable, ActionButton, MusicPlayer },
  data() {
    return {
      currentMOH: {},
      audioUrl: "",
      currentMOHAudioFiles: [],
      orderedMOHAudioFiles: [],
      reorderButton: false,
    };
  },
  created() {
    this.getMohs();
    this.currentMOH = JSON.parse(localStorage.getItem("current_moh"));
    this.currentMOHAudioFiles = this.currentMOH.moh_files;
    this.currentMOHAudioFiles = this.currentMOHAudioFiles.sort(
      (a, b) => a.sequence - b.sequence
    );
  },
  watch: {
    currentMOHAudioFiles: function (val) {
      this.reorderButton = true;
      for (const [i, value] of val.entries()) {
        value.sequence = i + 1;
        console.log("%d: %s", i + 1, value.name);
      }
      this.orderedMOHAudioFiles = val.map((file) => {
        return { file_id: file.id, sequence: file.sequence };
      });
    },
    moh: function () {
      this.currentMOH = JSON.parse(localStorage.getItem("current_moh"));
      this.currentMOHAudioFiles = this.currentMOH.moh_files;
      this.currentMOHAudioFiles = this.currentMOHAudioFiles.sort(
        (a, b) => a.sequence - b.sequence
      );
    },
  },
  computed: {
    ...mapGetters(["moh"]),
  },
  methods: {
    ...mapActions(["getMohs", "deleteMohFile", "reorderMohFile"]),
    handleDeleteMohFile(moh_file) {
      console.log("moh file", moh_file);
      if (confirm("Confirm Delete " + moh_file.name + "?") == true) {
        this.deleteMohFile({
          moh_file_id: moh_file.id,
        });
      } else {
        console.log("deleting cancelled");
      }
    },
    handleReorderMohFile() {
      this.reorderMohFile({
        moh_id: this.currentMOH.id,
        moh_files: this.orderedMOHAudioFiles,
      });
      this.reorderButton = false;
    },
    toggleAudio(sourceUrl) {
      var audio = document.getElementById("player");
      var source = document.getElementById("mp3_src");
      source.src = sourceUrl;
      audio.pause();
      // audio = audioUrl;
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
