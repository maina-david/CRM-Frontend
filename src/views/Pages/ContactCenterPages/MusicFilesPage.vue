<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Music Files</h2>
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-5 mt-10">
        <div class="col-span-1 w-full">
          <CreateMusicFileCard />
        </div>
        <div class="col-span-2 w-full">
          <div class="bg-white rounded-sm shadow-sm p-4">
            <MusicFileTable :tableHead="tableHead" :tableData="musicFiles" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import MusicFileTable from "@/components/tables/ContactCenterTables/MusicFileTable.vue";
import CreateMusicFileCard from "@/components/cards/ContactCenterCards/CreateMusicFileCard.vue";

export default {
  name: "MusicFilesPages",
  components: { MusicFileTable, CreateMusicFileCard },
  data() {
    return {
      tableHead: ["id", "name of music file", "Play Audio", "Actions"],
      musicFiles: [
        {
          id: 1,
          musicFileName: "Music File 1",
          audio_url: "johndoe@gmail.com",
        },
        {
          id: 2,
          musicFileName: "Music File 2",
          audio_url: "johndoe@gmail.com",
        },
        {
          id: 3,
          musicFileName: "Music File 3",
          audio_url: "johndoe@gmail.com",
        },
        {
          id: 4,
          musicFileName: "Music File 4",
          audio_url: "johndoe@gmail.com",
        },
        {
          id: 5,
          musicFileName: "Music File 5",
          audio_url: "johndoe@gmail.com",
        },
        {
          id: 6,
          musicFileName: "Music File 6",
          email: "johndoe@gmail.com",
        },
      ],
    };
  },
};
</script>

<style></style>
