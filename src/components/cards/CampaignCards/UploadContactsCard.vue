<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="border-b">
      <div class="p-3">
        <h2 class="font-semibold">Upload Contacts</h2>
        <!-- <p>uploadContacts: {{ uploadContacts }}</p> -->
      </div>
    </div>
    <slot>
      <div class="mt-5">
        <p @click="downloadTemplate">
          <!-- <download-excel
            class="btn col text-left text-sm"
            style="color: blue"
            :data="json_data"
            :fields="json_fields"
            worksheet="Groups"
            name="groups.xlsx"
          >
            Download Excel Format to Upload
          </download-excel> -->
          Download Excel Format to Upload
        </p>
        <!-- <FileInput /> -->
        <section class="my-4">
          <input
            @change="onChange"
            class="block w-full text-sm text-gray-900 bg-white rounded-sm border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
          />

          <xlsx-read :file="file">
            <xlsx-json @parsed="jsondata"> </xlsx-json>
          </xlsx-read>
        </section>
        <ActionButton @click="addContacts" text="Add Contacts" class="mt-5" />
      </div>
    </slot>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import * as XLSX from "xlsx";
import readXlsxFile from "read-excel-file";
import ActionButton from "@/components/ActionButton.vue";

export default {
  name: "UploadContactsCard",
  data() {
    return {
      contacts: [
        { name: "", phone: "" },
        { name: "", phone: "" },
      ],
      uploadContacts: [],
      currentCampaign: {},
      file: {},
    };
  },
  created() {
    this.currentCampaign = JSON.parse(localStorage.getItem("current_campaign"));
  },
  methods: {
    ...mapActions(["uploadContactCampaign"]),
    addContacts() {
      this.uploadContactCampaign({
        campaign_id: this.currentCampaign.id,
        contacts: this.uploadContacts,
      });
    },
    downloadTemplate() {
      console.log("XLSX", XLSX);
      const data = XLSX.utils.json_to_sheet(this.contacts);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "contactsTemplate.xlsx");
    },
    // jsondata(data) {
    //   console.log("json data", data);
    //   var newData = [];
    //   for (let i = 0; i < data.length; i++) {
    //     newData.push(data[i].Email);
    //   }
    //   this.uploadContacts = newData;
    // },
    onChange(e) {
      // this.file = event.target.files ? event.target.files[0] : null;
      var file = e.target.files ? e.target.files[0] : null;
      readXlsxFile(file).then((data) => {
        var excelData = data.map((contact) => {
          return { name: contact[0], phone_number: contact[1] };
        });
        excelData.shift();
        this.uploadContacts = excelData;
      });
    },
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
    };
  },
  components: { ActionButton },
  computed: {},
};
</script>

<style></style>
