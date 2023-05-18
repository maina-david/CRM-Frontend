<template>
  <div v-for="campaignDay in campaignDays" :key="campaignDay.date">
    <div class="bg-slate-100 shadow-sm rounded-sm p-3 text-xs m-3">
      <div class="flex justify-between">
        <div>
          <h3 class="p-2">
            Working Day:
            <span> {{ campaignDay.date }} </span>
          </h3>
        </div>
      </div>

      <div class="flex justify-between">
        <div>
          <h3 class="p-2">
            Time: {{ campaignDay.starting_time }} to {{ campaignDay.end_time }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    campaignDays: { type: Array },
    time: { type: String },
  },
  methods: {},
};
</script>

<style></style>
