<template>
  <div>
    <div>
      <div class="flex justify-between">
        <div class="p-2">
          <h2 class="text-sm font-normal">{{ nameOfData }}</h2>
        </div>
        <div class="align-middle">
          <span
            class="material-icons bg-red-100 text-red-400 p-2 m-2 rounded-full text-md"
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
        <div class="text-xs text-center">
          <h4 class="text-xs bg-red-100 p-1 text-red-500 align-middle mt-4">
            Penalties: {{ penalty }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MissedCallCard",
  props: {
    numberOfData: { type: Number, required: true },
    penalty: { type: Number },
    nameOfData: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true, default: "bg-red-100" },
  },
  data() {
    return {
      name: "",
    };
  },
};
</script>

<style></style>
