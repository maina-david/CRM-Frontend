<template>
  <div class="m-3">
    <div class="border-b flex p-3 justify-between">
      <div class="">
        <h2 class="font-semibold">Contact Center Configurations</h2>
      </div>

      <div>
        <ToggleButton
          v-model="toggleValue"
          toggleText="Switch Contact Center"
          @click="handleCompanyOff"
          :toggle="callCenterSettings?.status == 'ACTIVE'"
        />
      </div>
    </div>
    <div
      class="m-5 bg-white rounded-sm text-left overflow-hidden shadow-sm p-4"
    >
      <div class="flex justify-between border-b my-5">
        <div class="">
          <h2 class="font-semibold m-2">Company Configurations</h2>
        </div>
        <div class="mb-5">
          <audio id="player" class="" controls="controls">
            <source id="mp3_src" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
      <div class="text-xs m-3 border-b">
        <div class="bg-slate-100 shadow-sm rounded-sm my-5 p-3">
          <div v-if="editMode" class="align-center">
            <div class="justify-between flex">
              <div>
                <h3 class="py-2">
                  <span class="font-semibold"> Current Call Center Setup </span>
                </h3>
              </div>
              <div @click="editMode = !editMode">
                <span class="material-icons text-sm text-gray-700 ml-3"
                  >close</span
                >
              </div>
            </div>
            <TextBox
              v-model="penality"
              type="number"
              label="Maximum number of abandoned calls per day per agent"
              placeholder="Penalty Limit"
            />
            <TextBox
              v-model="service_level"
              type="number"
              label="Acceptable time for a call to get to an agent in seconds"
              placeholder="Service Limit"
            />
            <ActionButton
              class="my-5"
              @click="handleConfigureCallCenter"
              text="Configure Call Center"
            />
          </div>
          <div v-else>
            <div class="flex justify-between">
              <div>
                <div class="border-b">
                  <h3 class="p-2">
                    <span class="font-semibold">
                      Current Call Center Setup
                    </span>
                  </h3>
                </div>
                <h3 class="p-2">
                  Service Level:
                  <span> {{ callCenterSettings.service_level }} </span>
                </h3>
              </div>
              <div @click="handleEditMode">
                <span class="material-icons text-sm text-gray-700">edit</span>
              </div>
            </div>

            <div class="flex justify-between">
              <div>
                <h3 class="p-2">
                  Penalties: {{ callCenterSettings.max_penality }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Working Hours-->
      <div>
        <div class="mt-4">
          <div class="flex justify-between mb-4 border-b p-3">
            <div>
              <h3 class="text-sm font-semibold">Working Hours</h3>
            </div>
            <div class="flex gap-4">
              <div>
                <router-link :to="{ name: 'CompanyMusicFiles' }">
                  <ActionButton text="View Music Files" class="mr-3" />
                </router-link>
              </div>
              <div>
                <ActionButton
                  text="Manage Working Hours"
                  @click="showWorkingHourModal = !showWorkingHourModal"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <ViewWorkingHours
            :workingDays="workingHours"
            :time="time"
            :audiUrl="audioUrl"
          />
        </div>
      </div>
      <!--SMS Settings-->
      <div>
        <div class="mt-4">
          <div class="flex justify-between mb-4 border-b p-3">
            <div>
              <h3 class="text-sm font-semibold">SMS Template Settings</h3>
            </div>
            <div class="flex gap-4">
              <div>
                <ActionButton
                  text="Create Template"
                  @click="showSMSTemplateModal = !showSMSTemplateModal"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <SMSTemplates :textTemplates="smsTemplates" v-if="showTemplateData" />
        </div>
      </div>
      <!--Holidays-->
      <div>
        <div class="mt-4">
          <div class="flex justify-between mb-4 border-b p-3">
            <div>
              <h3 class="text-sm font-semibold">Holidays</h3>
            </div>
            <div class="">
              <ActionButton
                text="Add Holidays"
                @click="handleCreateHoliday('Create', {})"
              />
            </div>
          </div>
        </div>
        <div>
          <ViewHolidays :holidays="holidays" />
        </div>
      </div>

      <!--On Off Music-->

      <div>
        <div class="mt-4">
          <div class="flex justify-between mb-4 border-b p-3">
            <div>
              <h3 class="text-sm font-semibold">Company Off Music</h3>
            </div>
            <div class="">
              <ActionButton
                :text="callCenterOffMusic ? 'Manage Track' : 'Add Track'"
                @click="showCompanyOffModal = !showCompanyOffModal"
              />
            </div>
          </div>
        </div>
        <div>
          <ViewCompanyOffMusic
            :name="callCenterOffMusic?.name"
            :audioUrl="callCenterOffMusic?.url"
          />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2">
      <div
        class="m-5 col-span-2 bg-white rounded-sm text-left overflow-hidden shadow-sm p-4"
      >
        <BreaksTable :tableData="breaks" :tableHead="breaksTableHead" />
      </div>
      <div
        class="m-5 col-span-2 bg-white rounded-sm text-left overflow-hidden shadow-sm p-4"
      >
        <BlacklistTable
          :tableData="blacklisted"
          :tableHead="blackListTableHead"
        />
      </div>
    </div>
  </div>
  <WorkingHoursModal :show="showWorkingHourModal" />
  <HolidayModal
    :show="showHolidayModal"
    :holidayState="holidayState"
    :currentHoliday="currentHoliday"
  />
  <SMSTemplateModal :show="showSMSTemplateModal" :state="'Create'" />
  <div>
    <CompanyToggleModal :show="showCompanyOffModal" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TextBox from "@/components/TextBox.vue";
import ActionButton from "../ActionButton.vue";
import { ref } from "vue";
import WorkingHoursModal from "../modals/ContactCenterModals/WorkingHoursModal.vue";
import SMSTemplateModal from "../modals/ContactCenterModals/SMSTemplateModal.vue";
import ViewWorkingHours from "./ViewWorkingHours.vue";
import SMSTemplates from "./SMSTemplates.vue";
import ToggleButton from "../ToggleButton.vue";
import BlacklistTable from "../tables/ContactCenterTables/BlacklistTable.vue";
import ViewHolidays from "./ViewHolidays.vue";
import HolidayModal from "../modals/ContactCenterModals/HolidayModal.vue";
import BreaksTable from "../tables/ContactCenterTables/BreaksTable.vue";
import CompanyToggleModal from "../modals/ContactCenterModals/CompanyToggleModal.vue";
import ViewCompanyOffMusic from "./ViewCompanyOffMusic.vue";

export default {
  components: {
    TextBox,
    ActionButton,
    WorkingHoursModal,
    ViewWorkingHours,
    ToggleButton,
    BlacklistTable,
    ViewHolidays,
    HolidayModal,
    BreaksTable,
    CompanyToggleModal,
    ViewCompanyOffMusic,
    SMSTemplates,
    SMSTemplateModal,
  },
  data() {
    return {
      currentHoliday: "",
      holidayState: "",
      toggleValue: false,
      showTemplateData: false,
      editMode: false,
      penality: 0,
      service_level: 0,
      workingDays: ["Monday"],
      textTemplates: [
        {
          name: "Sample Text Template",
          template:
            "This is a sample text template to be used just for test purposes",
        },
      ],
      audiUrl:
        "https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1661320915_04-Forward.mp3",
      time: "5:00am to 5:00pm",
      blackListTableHead: ["Call Id", "Actions"],
      breaksTableHead: [
        "Name",
        "Description",
        "Break Length",
        "Breaks Taken Per Day",
        "Status",
        "Actions",
      ],
    };
  },
  setup() {
    const showWorkingHourModal = ref(false);
    const showHolidayModal = ref(false);
    const showCompanyOffModal = ref(false);
    const showSMSTemplateModal = ref(false);

    return {
      showWorkingHourModal,
      showHolidayModal,
      showCompanyOffModal,
      showSMSTemplateModal,
    };
  },
  created() {
    this.getBreaks();
    this.getCallCenterSettings();
    this.getBlacklist();
    this.getWorkingHours();
    this.getHolidays();
    this.getCallCenterOffMusic();
    this.fetchSmsTemplates();
    if (this.callCenterSettings) {
      this.editMode = false;
      this.penality = this.callCenterSettings.max_penality;
      this.service_level = this.callCenterSettings.service_level;
    } else {
      this.editMode = true;
    }
  },
  watch: {
    callCenterSettings: function (val) {
      if (val) {
        this.editMode = false;
        this.penality = this.val?.max_penality;
        this.service_level = this.val?.service_level;
      }
    },
    smsTemplates: function (val) {
      this.showTemplateData = true;
      console.log("changing SMS templates", val);
    },
  },
  methods: {
    ...mapActions([
      "getBreaks",
      "getCallCenterSettings",
      "setupPenaltyAndServiceLevel",
      "switchOffCallCenter",
      "getBlacklist",
      "getWorkingHours",
      "getHolidays",
      "getCallCenterOffMusic",
      "fetchSmsTemplates",
      "deleteSmsTemplate",
    ]),
    handleEditMode() {
      this.penality = this.callCenterSettings.max_penality;
      this.service_level = this.callCenterSettings.service_level;
      this.editMode = !this.editMode;
    },
    handleConfigureCallCenter() {
      this.setupPenaltyAndServiceLevel({
        penality: this.penality,
        service_level: this.service_level,
      });
      this.editMode = false;
    },
    handleCompanyOff() {
      var state = "";
      if (this.callCenterSettings?.status == "ACTIVE") {
        state = "OFF";
      } else {
        state = "ON";
      }
      if (confirm("Confirm Switch " + state + " Call Center?") == true) {
        console.log("change company off");
        this.switchOffCallCenter();
      } else {
        console.log("change company off cancelled");
      }
    },
    handleCreateHoliday(state, data) {
      data.name = "";
      data.description = "";
      data.date = "";
      data.file_id = "";
      this.currentHoliday = data;
      this.holidayState = state;
      this.showHolidayModal = !this.showHolidayModal;
    },
  },
  computed: {
    ...mapGetters([
      "breaks",
      "callCenterSettings",
      "blacklisted",
      "workingHours",
      "holidays",
      "callCenterOffMusic",
      "smsTemplates",
    ]),
  },
};
</script>

<style></style>
