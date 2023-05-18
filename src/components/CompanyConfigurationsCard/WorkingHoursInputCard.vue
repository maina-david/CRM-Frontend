<template>
  <div>
    <div class="mt-5 m-3">
      <div class="my-5">
        <label class="form-label text-xs my-5 inline-block text-gray-700"
          >Select the working days and their hours</label
        >
        <CheckBoxList
          class="my-3"
          :options="selectDays"
          v-model:value="selectedDays"
        />
      </div>
      <TextBox
        v-model="startWorkingHour"
        type="time"
        label="At what time does the work day start?"
        placeholder="Start Time"
      />
      <TextBox
        v-model="stopWorkingHour"
        type="time"
        label="At what time does the work day end"
        placeholder="End Time"
      />
      <Dropdown
        class="my-3"
        select="Select Track"
        label="Select Track"
        :options="selectSettingAudio"
        v-model="file_url"
      />
      <ActionButton
        @click="handleCreateWorkingHours"
        text="Submit Working Hours"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TextBox from "@/components/TextBox.vue";
import Dropdown from "@/components/Dropdown.vue";
import ActionButton from "../ActionButton.vue";
import CheckBoxList from "../CheckBoxList.vue";

export default {
  components: { TextBox, ActionButton, CheckBoxList, Dropdown },
  data() {
    return {
      file_url: "",
      startWorkingHour: "",
      stopWorkingHour: "",
      selectDays: [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],
      selectedDays: [],
    };
  },
  created() {
    this.getSettingAudios();
  },
  methods: {
    ...mapActions(["getSettingAudios", "updateWorkingHours"]),
    handleCreateWorkingHours() {
      this.updateWorkingHours({
        dates: this.selectedDays,
        from: this.startWorkingHour,
        to: this.stopWorkingHour,
        file_url: this.file_url,
      });
      this.selectedDays = [];
      this.startWorkingHour = "";
      this.stopWorkingHour = "";
      this.file_url = "";
    },
  },
  computed: {
    ...mapGetters(["selectSettingAudio"]),
  },
};
</script>

<style></style>
