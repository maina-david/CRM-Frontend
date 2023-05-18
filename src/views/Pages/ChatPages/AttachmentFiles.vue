<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Attachment Files</h2>
      </div>
      <div class="grid grid-cols-3 grid-flow-col gap-5 mt-10">
        <div class="col-span-1 w-full">
          <CreateAttachmentCard />
        </div>
        <div class="col-span-2 w-full">
          <div class="bg-white rounded-sm shadow-sm p-4">
            <AttachmentFilesTable
              :tableHead="tableHead"
              :tableData="chatBotFiles"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AttachmentFilesTable from "@/components/tables/ChatTables/AttachmentFilesTable.vue";
import CreateAttachmentCard from "@/components/cards/ChatCards/CreateAttachmentCard.vue";

export default {
  name: "MusicFilesPages",
  components: { AttachmentFilesTable, CreateAttachmentCard },
  data() {
    return {
      tableHead: ["name of file", "File type", "link", "Actions"],
    };
  },
  created() {
    this.getChatBotFiles();
  },
  methods: {
    ...mapActions(["getChatBotFiles"]),
  },
  computed: {
    ...mapGetters(["chatBotFiles"]),
  },
};
</script>

<style></style>
