<template>
  <div class="flex grid-cols-3 gap-6 overflow-hidden">
    <div class="m-5 col-span-1 mt-20">
      title here {{ title }}
      <div class="overflow-hidden">
        <ProgressCircle
          diameter="250"
          :completed-steps="completedSteps"
          :total-steps="totalSteps"
          circle-color="#f1f5f9"
          circle-width="20"
          start-color="#1e293b"
          stop-color="#64748b"
          inner-display="percent"
          percent-color="#1e293b"
        >
        </ProgressCircle>
      </div>

      <p class="mt-5 text-gray-700 font-normal text-center">Test Queue 1</p>
      <div class="text-sm text-gray-600 mt-5 text-center">
        ( Ring represents Complete : Total call ratio )
      </div>
      <div></div>
    </div>
    <div class="col-span-2 w-full mx-20">
      <div>
        <p class="mt-10 text-gray-700 border-b p-2">Call Count Details</p>
        <div class="my-10">
          <ProgressBar label="Completed Calls" percentage_progress="55%" />
        </div>
        <div class="my-10">
          <ProgressBar label="Abandoned Calls" percentage_progress="25%" />
        </div>
        <div class="my-10">
          <ProgressBar label="No Answer Calls" percentage_progress="20%" />
        </div>
      </div>
      <div>
        <p class="mt-10 mb-5 border-b text-gray-700 p-2">Call Time Details</p>
        <Timeline :timelines="timelines" />
      </div>
    </div>
  </div>
</template>

<script>
import { ProgressCircle } from "vue-progress-circle";
import ProgressBar from "@/components/progressBars/progressBar.vue";
import Timeline from "@/components/timeline/timeline.vue";

export default {
  name: "TestQueue1",
  components: { ProgressCircle, ProgressBar, Timeline },
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      totalSteps: "100",
      completedSteps: "35",
      timelines: [
        { label: "Call Time", time: "15:55:00" },
        { label: "Hold Time", time: "12:55:00" },
        { label: "Queue Time", time: "00:55:00" },
        { label: "Mute Time", time: "04:05:00" },
        { label: "Wrap Up Time", time: "01:45:00" },
      ],
    };
  },
};
</script>

<style></style>
