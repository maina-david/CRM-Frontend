<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Company Management</h2>
      </div>
      <div class="grid grid-cols-4 grid-flow-col gap-6 mt-10">
        <div class="col-span-1 w-full">
          <div v-if="handleGuard(company)" class="">
            <div
              class="bg-white max-w-xs w-full block rounded-sm shadow-sm p-4"
            >
              <div class="flex justify-between items-center pt-2">
                <div>
                  <h1 class="text-lg font-semibold">Groups</h1>
                </div>

                <div>
                  <ActionButton
                    @click="handleCreateGroup"
                    text="Create Group"
                  />
                </div>
              </div>
              <hr
                class="border-1 mt-5 border-gray-300 cursor-pointer hover:border-red-500 duration-500"
              />
              <div v-for="group in groups" :key="group.id">
                <h2 id="accordion-collapse-heading-1">
                  <div class="justify-center mr-4">
                    <button
                      type="button"
                      class="flex w-full m-3 p-3 font-medium border border-b-0 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 hover:bg-slate-200 bg-slate-100"
                      data-accordion-target="#accordion-collapse-body-1"
                      aria-expanded="true"
                      aria-controls="accordion-collapse-body-1"
                      @click.prevent="handleGetGroupUsers(group)"
                    >
                      <span class="text-sm text-left p-2">{{
                        group.name
                      }}</span>

                      <span
                        @click.prevent="handleEditGroup(group)"
                        class="material-icons text-sm text-right p-2"
                        >edit</span
                      >
                    </button>
                  </div>
                </h2>
              </div>
            </div>
            <CreateGroup
              :show="showModal"
              :state="state"
              :currentGroup="currentGroup"
            />
          </div>
          <div v-else>No Access</div>
        </div>
        <div class="col-span-3 w-full">
          <div v-if="currentGroup.id" class="bg-white rounded-sm shadow-sm p-4">
            <UserGroups
              :tableHead="tableHead"
              :tableData="groupUsers"
              :groupQueues="groupQueues"
              :currentGroup="currentGroup"
              @closeCard="handleCloseCard"
            />
          </div>
          <div v-else class="justify-center flex">
            <p class="text-2xl text-gray-400 text-center mt-24">
              Select Group to view details
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import Guard from "@/componentGuard.js";
import ActionButton from "@/components/ActionButton.vue";
import UserGroups from "@/components/tables/ContactCenterTables/UserGroups.vue";
import CreateGroup from "@/components/modals/ContactCenterModals/CreateGroup.vue";

export default {
  name: "CompanyManagement",
  components: { ActionButton, CreateGroup, UserGroups },
  data() {
    return {
      state: "",
      currentGroup: {},
      groupUsers: [],
      groupQueues: [],
      tableHead: ["Name", "Email", "Phone", "Status", "Actions"],
      company: "Company Management",
      myState: false,
    };
  },
  setup() {
    const showDialerModal = ref(false);
    return {
      showDialerModal,
    };
  },
  created() {
    this.getGroups();
  },
  computed: {
    ...mapGetters(["groups"]),
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
    ...mapActions(["getGroups"]),
    handleCreateGroup() {
      this.state = "create";
      this.currentGroup = {};
      this.showModal = !this.showModal;
    },
    handleEditGroup(group) {
      this.state = "edit";
      this.currentGroup = group;
      this.showModal = !this.showModal;
    },
    handleGetGroupUsers(group) {
      this.currentGroup = group;
      this.groupUsers = group.users;
      this.groupQueues = group.queues;
    },
    handleCloseCard(e) {
      console.log("handle close card", e);
      this.currentGroup = {};
      this.groupUsers = [];
      this.groupQueues = [];
    },
  },
};
</script>

<style></style>
