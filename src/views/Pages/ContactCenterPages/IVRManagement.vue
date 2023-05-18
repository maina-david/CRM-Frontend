<template>
  <main>
    <div class="ml-12">
      <div class="mt-10 border-b flex justify-between">
        <div>
          <h2 class="font-bold text-xl p-3">IVR Management</h2>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <ActionButton
              @click="showCreateIVRModal = !showCreateIVRModal"
              text="Create IVR"
            />
          </div>
          <div>
            <router-link :to="{ name: 'MusicFiles' }">
              <ActionButton text="View Music Files" />
            </router-link>
          </div>
        </div>
      </div>
      <Empty
        v-if="ivr.length <= 0"
        message="You currently have no IVR, Please create one using the button below"
      />
      <div v-else>
        <IVRCard />
      </div>
      <CreateIVRModal :show="showCreateIVRModal" />
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ref } from "vue";
import Empty from "@/components/Empty.vue";
import IVRCard from "@/components/cards/ContactCenterCards/IVRCard.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateIVRModal from "@/components/modals/ContactCenterModals/CreateIVRModal.vue";
/*import Channel from "@/componentGuard.js";
import groupManagement from "@/componentGuard.js";
import ClickToCall from "@/componentGuard.js";
import Inbound from "@/componentGuard.js";
import Outbound from "@/componentGuard.js";
import Company from "@/componentGuard.js";*/
/*import RoleProfile from "@/componentGuard.js";*/
//import UserManagement from "@/componentGuard.js";

export default {
  name: "IVRManagement",
  data() {
    return {
      message: "",
    };
  },
  setup() {
    const showDialerModal = ref(false);
    const showCreateIVRModal = ref(false);

    return {
      showDialerModal,
      showCreateIVRModal,
    };
  },

  components: { Empty, IVRCard, ActionButton, CreateIVRModal },
  created() {
    this.getIvr();
  },
  computed: {
    ...mapGetters(["ivr"]),
  },
  methods: {
    ...mapActions(["getIvr"]),
  },
};
</script>

<style></style>
