<template>
  <div
    class="grid grid-cols-4 grid-flow-col gap-6 mt-10"
    v-if="handleGuard(invite)"
  >
    <div class="col-span-1">
      <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
        <div class="border-b">
          <div class="p-3">
            <h2 class="font-semibold">Add Users in Bulk</h2>
          </div>
        </div>
        <slot>
          <div class="mt-5">
            <p>
              <download-excel
                class="btn col text-left text-sm"
                style="color: blue"
                :data="json_data"
                :fields="json_fields"
                worksheet="Groups"
                name="groups.xlsx"
              >
                Download Excel Format to Upload
              </download-excel>
            </p>
            <section>
              <input type="file" @change="onChange" />
              <xlsx-read :file="file">
                <xlsx-json @parsed="jsondata"> </xlsx-json>
              </xlsx-read>
            </section>
            <Dropdown
              select="Select Group"
              label="Select Group"
              :options="selectGroups"
              v-model="bulkGroupId"
            />
            <Dropdown
              select="Select Role Profile"
              label="Select Role Profile"
              :options="selectRoleProfiles"
              v-model="bulkRoleProfileId"
            />
            <ActionButton
              text="Submit Invite"
              class="mt-5"
              @click.prevent="handleCreateBulkInvite"
            />
          </div>
        </slot>
      </div>
      <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
        <div class="border-b">
          <div class="p-3">
            <h2 class="font-semibold">Add Users Using Emails</h2>
          </div>
        </div>
        <slot>
          <div class="mt-5">
            <TextBox
              type="email"
              placeholder="Enter Email"
              label="Email"
              v-model="email"
            />
            <Dropdown
              select="Select Group"
              label="Select Group"
              :options="selectGroups"
              v-model="groupId"
            />
            <Dropdown
              select="Select Role Profile"
              label="Select Role Profile"
              :options="selectRoleProfiles"
              v-model="roleProfileId"
            />
            <ActionButton
              text="Submit Invite"
              class="mt-5"
              @click.prevent="handleCreateInvite"
            />
          </div>
        </slot>
      </div>
    </div>
    <div class="col-span-3 w-full">
      <div class="bg-white rounded-sm shadow-sm p-4">
        <InviteTables :tableHead="tableHead" :tableData="invites" />
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center">
    <div class="bg-white mt-24">
      <div class="m-5 p-5 text-center">
        <h2 class="font-semibold text-lg p-2">
          Sorry! You don't have access to this page.
        </h2>
        <h4 class="font-normal text-sm p-1">
          Please contact Administration for help!
        </h4>
      </div>
      <div class="m-5 p-5">
        <img :src="secured" class="p-2 h-96 w-96" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { XlsxRead, XlsxJson } from "vue3-xlsx";
/*import Channel from "@/componentGuard.js";
import groupManagement from "@/componentGuard.js";
import ClickToCall from "@/componentGuard.js";
import Inbound from "@/componentGuard.js";
import Outbound from "@/componentGuard.js";
import Company from "@/componentGuard.js";*/
/*import RoleProfile from "@/componentGuard.js";*/
//import UserManagement from "@/componentGuard.js";
import Guard from "@/componentGuard.js";
import InviteTables from "@/components/tables/ContactCenterTables/InviteTables.vue";
import ActionButton from "@/components/ActionButton.vue";
import TextBox from "@/components/TextBox2.vue";
import Dropdown from "@/components/Dropdown.vue";
import secured from "@/assets/secured.svg";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Invites",
  props: {
    selectGroups: {
      type: Array,
      required: true,
    },
    selectRoleProfiles: {
      type: Array,
      required: true,
    },
  },
  components: {
    InviteTables,
    ActionButton,
    TextBox,
    Dropdown,
    XlsxRead,
    XlsxJson,
  },
  data() {
    return {
      newCollection: [],
      file: null,
      email: "",
      groupId: "",
      bulkGroupId: "",
      roleProfileId: "",
      bulkRoleProfileId: "",
      secured: secured,
      tableHead: [
        "Email Address",
        "Group",
        "Role Profile",
        "Invited By",
        "Status",
        "Actions",
      ],
      json_fields: {
        Email: "email",
      },
      json_data: [
        {
          Email: "example@example.com",
        },
      ],
      myState: false,
      invite: "Invitation Management",
    };
  },
  created() {
    this.getInvites();
  },
  computed: {
    ...mapGetters(["invites", "loadingInvites", "errorInvites"]),
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
    ...mapActions(["createInvites", "getInvites"]),
    handleCreateBulkInvite() {
      this.createInvites({
        emails: this.newCollection,
        group_id: this.bulkGroupId,
        role_profile_id: this.bulkRoleProfileId,
      });
      this.newCollection = "";
      this.bulkGroupId = "";
      this.bulkRoleProfileId = "";
    },
    handleCreateInvite() {
      this.createInvites({
        emails: [this.email],
        group_id: this.groupId,
        role_profile_id: this.roleProfileId,
      });
      this.email = "";
      this.groupId = "";
      this.roleProfileId = "";
    },

    jsondata(data) {
      var newData = [];
      for (let i = 0; i < data.length; i++) {
        newData.push(data[i].Email);
      }
      this.newCollection = newData;
    },
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
  },
};
</script>

<style></style>
