<template>
  <div
    class="p-5 max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <a href="#">
      <h5 class="mb-4 text-md font-semibold text-gray-900 dark:text-white">
        {{ name }}
      </h5>
    </a>
    <p class="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">
      {{ description }}
    </p>
    <div class="flex justify-between my-5">
      <div class="flex" v-if="groups.length > 0">
        <span
          class="bg-slate-50 text-xs text-slate-700 px-2 py-1"
          v-for="group in groups"
          :key="group"
          >{{ group }}
          <span class="material-icons text-xs mt-1 p-1 text-slate-700"
            >close</span
          ></span
        >
      </div>
    </div>
    <div>
      <ActionButton class="w-4/12 justify-end" text="Attach Group" />
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
export default {
  props: {
    name: { type: String, required: true },
    description: { type: String },
    groups: { type: Array },
  },

  components: { ActionButton },
};
</script>

<style></style>
