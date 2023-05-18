<template>
  <div>
    <div class="border-b">
      <h5 class="mt-5 font-bold text-sm p-3">
        Jane Doe's(Reviewer's Name) Report Per Question
      </h5>
    </div>
    <div class="mt-5">
      <div v-for="detail in reportDetails" :key="detail">
        <div class="">
          <div
            class="p-3 bg-slate-50 flex"
            v-for="(value, key) in detail"
            :key="key"
          >
            <h3 class="text-sm font-semibold">{{ key }} :</h3>
            <h4 class="text-sm font-medium">
              {{ value }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {
      reportDetails: [
        { "Did the agent start with greeting?": "45" },
        { "Fluency of the Agent": "35" },
        { "Did the Call take too long?": "26" },
        { "The agent clearly explained the solution to the customer": "73" },
        { "The agent thanked the customer for calling": "13" },
      ],
    };
  },
};
</script>

<style></style>
