<template>
  <div class="flex flex-col">
    <div class="grid grid-cols-4">
      <div class="flex m-4" v-for="i in ivr" :key="i.id">
        <div
          class="p-5 max-w-sm bg-white rounded-sm border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
            {{ i.name }}
          </h5>
          <p class="text-gray-700 text-sm mb-4">
            {{ i.description }}
          </p>

          <span class="grid grid-cols-2 grid-flow-col" v-if="i.dids.length > 0">
            <span
              v-for="(did, index) in i.dids"
              :key="index"
              class="w-200 rounded-sm m-1 p-1 text-green-700 bg-green-100 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              {{ did.did }}
              <span
                @click="handleRemoveDid(did, i)"
                class="material-icons text-xs ml-3"
                >close</span
              >
            </span>
          </span>

          <div class="grid grid-flow-col gap-4 mt-3 justify-between">
            <div>
              <router-link :to="{ name: 'CreateIVR' }">
                <ActionButton
                  @click="handleCreateIvr(i.id)"
                  text="Manage IVR Flow"
                  class="bg-lime-500"
                ></ActionButton>
              </router-link>
            </div>
            <div v-if="i.dids.length == 0">
              <button
                @click="handleMapIvrToDid(i)"
                class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              >
                Add DID
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DidModal :show="showDidModal" :currentIvr="currentIvr" />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import ActionButton from "../../ActionButton.vue";
import DidModal from "../../modals/ContactCenterModals/DidModal.vue";

export default {
  name: "IVR Card",
  data() {
    return {
      currentIvr: "",
    };
  },
  components: { ActionButton, DidModal },
  setup() {
    const showDidModal = ref(false);
    const showModal = ref(false);
    return {
      showDidModal,
      showModal,
    };
  },
  created() {
    this.getAudioIvr();
  },
  computed: {
    ...mapGetters(["ivr", "ivrAudios"]),
  },
  methods: {
    ...mapActions(["getAudioIvr", "delinkIvrFromDid"]),
    handleCreateIvr(id) {
      console.log("create ivr id", id);
      localStorage.setItem("ivr_id", id);
    },
    handleMapIvrToDid(ivr) {
      this.currentIvr = ivr;
      this.showDidModal = !this.showDidModal;
    },
    handleRemoveDid(did, ivr) {
      if (
        confirm("Confirm Remove " + did.did + " from " + ivr.name + "?") == true
      ) {
        this.delinkIvrFromDid({
          did_id: did.id,
        });
      } else {
        console.log("removing cancelled");
      }
    },
  },
};
</script>

<style></style>
