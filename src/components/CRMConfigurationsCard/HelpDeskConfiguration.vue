<template>
  <div>
    <div class="text-xs m-3">
      <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
        <div class="border-b p-2">
          <h2 class="text-lg font-semibold">Help Desk Configuration</h2>
        </div>

        <div class="flex justify-between mt-5 p-2">
          <div class="">
            <h2 class="font-semibold text-base">Assigning of Tickets</h2>
          </div>
          <div>
            <ToggleButton
              v-model="toggleValue"
              toggleText="Assign Tickets Manually"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleButton from "@/components/ToggleButton.vue";
export default {
  props: {
    priority: { type: Object, required: true },
  },
  components: { ToggleButton },
  data() {
    return {
      toggleValue: true,
    };
  },
};
</script>

<style></style>
