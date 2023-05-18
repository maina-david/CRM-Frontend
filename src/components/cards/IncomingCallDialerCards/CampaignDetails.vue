<template>
  <div class="bg-slate-50 p-3">
    <div>
      <h3 class="text-sm font-semibold text-gray-700 my-3 text-left">
        Recent Campaigns
      </h3>
    </div>
    <div v-for="(value, key) in campaignData" :key="key">
      <div class="p-2 text-xs my-2">
        <div class="flex justify-between">
          <h3 class="font-semibold">{{ value.campaign_name }}</h3>
        </div>
        <h3 class="text-left mt-2">{{ value.status }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    campaignData: {
      type: Array,

      required: false,
    },
  },

  data() {
    return {
      campaigns: [
        { name: "Campaign One", type: "Election campaign" },
        { name: "Campaign Two", type: "Election campaign" },
        { name: "Campaign Three", type: "Election campaign" },
        { name: "Campaign Four", type: "Election campaign" },
        { name: "Campaign Five", type: "Election campaign" },
      ],
    };
  },
};
</script>

<style></style>
