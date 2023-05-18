<template>
  <div class="flex justify-between mt-5 mb-3 border-b">
    <div>
      <h3></h3>
    </div>
    <div>
      <ActionButton
        text="Create MOH"
        class="mb-3"
        @click="handleMoh('Create', {})"
        v-if="handleGuard(moh)"
      />
    </div>
  </div>
  <div class="flex flex-col">
    <div class="grid grid-cols-4">
      <div class="flex m-4" v-for="i in moh" :key="i.id">
        <div
          class="p-5 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div @click="handleViewMoh(i)">
            <h5 class="text-gray-900 text-sm leading-tight font-semibold mb-2">
              {{ i.name }}
            </h5>
            <p class="text-gray-600 text-xs mb-4">
              {{ i.description }}
            </p>
          </div>
          <div class="grid grid-flow-col mt-5 justify-between">
            <div>
              <ActionButton
                text="Update MOH"
                @click="handleMoh('Edit', i)"
                v-if="handleGuard(moh)"
              ></ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <MOHModal
    :show="showMOHModal"
    :currentState="currentState"
    :currentMoh="currentMoh"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import router from "@/router";
import ActionButton from "../../ActionButton.vue";
import MOHModal from "../../modals/ContactCenterModals/MOHModal.vue";
import Guard from "@/componentGuard.js";

export default {
  name: "MOH Card",
  data() {
    return {
      currentState: "",
      currentMoh: {},
      moh: "MOH Manager",
      mohQueue: "MOH Queue Manager",
      queue: "Queue Management",
      queueAgent: "Queue Agent Management",
      myState: false,
    };
  },
  components: { ActionButton, MOHModal },
  setup() {
    const showMOHModal = ref(false);
    return {
      showMOHModal,
    };
  },
  created() {
    this.getMohs();
  },
  computed: {
    ...mapGetters(["moh"]),
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },

    ...mapActions(["getMohs"]),
    handleMoh(status, data) {
      this.currentState = status;
      this.currentMoh = data;
      console.log(data);
      this.showMOHModal = !this.showMOHModal;
    },
    handleViewMoh(data) {
      console.log(data);
      localStorage.setItem("current_moh", JSON.stringify(data));
      router.push({ name: "MOHFiles" });
    },
  },
};
</script>

<style></style>
