<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Company Music Files</h2>
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-5 mt-10">
        <div class="col-span-1 w-full">
          <CreateCompanyMusic />
        </div>
        <div class="col-span-2 w-full">
          <div class="bg-white rounded-sm shadow-sm p-4">
            <CompanyMusicFilesTable
              :tableHead="tableHead"
              :tableData="settingAudio"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CreateCompanyMusic from "@/components/cards/ContactCenterCards/CreateCompanyMusic.vue";
import CompanyMusicFilesTable from "@/components/tables/ContactCenterTables/CompanyMusicFilesTable.vue";

export default {
  name: "MusicFilesPages",
  components: { CreateCompanyMusic, CompanyMusicFilesTable },
  data() {
    return {
      tableHead: ["name of music file", "Play Audio", "Actions"],
    };
  },
  created() {
    this.getSettingAudios();
  },
  computed: {
    ...mapGetters(["settingAudio"]),
  },
  methods: {
    ...mapActions(["getSettingAudios"]),
  },
};
</script>

<style></style>
