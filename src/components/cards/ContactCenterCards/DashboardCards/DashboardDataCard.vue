<template>
  <div>
    <div>
      <div class="flex justify-between">
        <div class="p-2">
          <h2 class="text-sm font-normal">{{ nameOfData }}</h2>
        </div>
        <div class="align-middle">
          <span
            class="material-icons bg-slate-100 text-slate-700 p-2 m-2 rounded-full text-md"
            >{{ icon }}</span
          >
        </div>
      </div>
      <div class="flex justify-between">
        <div class="p-1">
          <h2 class="font-semibold text-lg m-2 text-slate-700 align-center">
            {{ numberOfData }}
          </h2>
        </div>
        <div>
          <h2
            v-if="percentageIncrease > 0"
            class="font-semibold p-1 text-xs m-2 text-green-600 bg-green-100 align-center"
          >
            <span class="material-icons text-xs">trending_up</span>
            {{ percentageIncrease }} %
          </h2>
          <h2
            v-else
            class="font-semibold p-1 text-xs m-2 text-red-600 bg-red-100 align-center"
          >
            <span class="material-icons text-xs">trending_down</span>
            {{ percentageIncrease }} %
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardDataCard",
  props: {
    numberOfData: { type: Number, required: true },
    nameOfData: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true, default: "bg-red-100" },
    percentageIncrease: { type: Number, required: true, default: 0 },
  },
  data() {
    return {
      name: "",
    };
  },
};
</script>

<style></style>
