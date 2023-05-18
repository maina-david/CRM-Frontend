<template>
  <teleport to="body">
    <div
      ref="modal-backdrop"
      v-if="showModal"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
    >
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <transition
          enter-active-class="transition ease-out duration-300 transform "
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
        >
          <div
            class="relative bg-white rounded-sm text-left overflow-hidden shadow-xl p-8"
            role="dialog"
            ref="modal"
            aria-modal="true"
            v-show="showModal"
            aria-labelledby="modal-headline"
          >
            <div class="border-b">
              <div class="p-3">
                <h2 class="font-medium text-blue-400">
                  {{ currentHelpDesk.name }} Users
                </h2>
                <button class="absolute top-4 right-4">
                  <span class="material-icons" @click="closeModal">close</span>
                </button>
              </div>
            </div>

            <slot>
              <div class="flex flex-row">
                <div class="mx-6 pr-6 border-r-2">
                  <Radio
                    :label="'Add Users to ' + currentHelpDesk.name"
                    :options="selectUsers"
                    v-model="newHelpDeskUser"
                  />
                  <ActionButton
                    v-if="newHelpDeskUser"
                    @click="handleAddHelpDeskTeamUser"
                    text="Add User to Help Desk Team"
                    class="mt-5"
                  />
                </div>
                <div class="mx-6">
                  <div class="border-b p-3">
                    <label
                      for="helpDesk"
                      class="form-label text-sm font-semibold inline-block mt-4 text-gray-700"
                      >{{ currentHelpDesk.name }} Users</label
                    >
                  </div>
                  <ViewHelpDeskTeamUsers
                    @updatedModal="handleUpdatedModal"
                    :tableHead="helpDeskUsersTableHead"
                    :tableData="currentHelpDesk.users"
                    :helpDeskTeamId="currentHelpDesk.id"
                  />
                </div>
              </div>
            </slot>
          </div>
        </transition>
      </div>
    </div>
  </teleport>
</template>

<script>
import { ref, watch } from "vue";
import { mapActions, mapGetters } from "vuex";
import ViewHelpDeskTeamUsers from "@/components/tables/CRMTables/ViewHelpDeskTeamUsers.vue";
import Radio from "@/components/Radio.vue";
import ActionButton from "@/components/ActionButton.vue";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
  currentHelpDesk: {
    type: Object,
    required: false,
    default: {},
  },
};
export default {
  name: "CreateForm",
  props,
  components: {
    ViewHelpDeskTeamUsers,
    Radio,
    ActionButton,
  },
  data() {
    return {
      newHelpDeskUser: "",
      helpDeskUsersTableHead: ["name", "email", "phone number", "actions"],
    };
  },
  setup(props) {
    const showModal = ref(false);

    function closeModal() {
      showModal.value = false;
    }

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      }
    );

    return {
      closeModal,
      showModal,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    ...mapActions(["getUsers", "addUserToHelpDeskTeam"]),
    handleAddHelpDeskTeamUser() {
      this.addUserToHelpDeskTeam({
        user_id: this.newHelpDeskUser,
        help_desk_team_id: this.currentHelpDesk.id,
      });
      this.closeModal();
    },
    handleUpdatedModal() {
      this.closeModal();
    },
  },
  computed: {
    ...mapGetters(["selectUsers"]),
  },
};
</script>

<style></style>
