<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3">
    <div class="flex">
      <div>
        <h3 class="font-semibold">GO TO QUEUE</h3>
      </div>
      <div class="t-tooltip">
        <span
          class="material-icons text-sm text-gray-400 inline-block align-middle m-2 hover:text-gray-700"
        >
          info
        </span>
        <div
          class="bg-blue-50 hidden t-box shadow-sm rounded-md text-xs p-3 m-3 absolute overflow-hidden"
        >
          Drag this node when you want to send a user to a queue
        </div>
      </div>
    </div>
    <div class="mb-2 border-t my-2 text-xs">
      <DisabledTextBox
        type="text"
        placeholder="Enter a name"
        label="Name"
        disabled
      />
    </div>
    <div class="mt-4">
      <label for="selection" class="text-xs">Select a queue</label>
      <select
        id="selection"
        disabled
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">- Select queue -</option>
      </select>
    </div>

    <div class="mt-4">
      <label for="selection" class="text-xs">Select configuration prompt</label>
      <select
        id="selection"
        disabled
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">- Select prompt -</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DisabledTextBox from "../DisabledTextBox.vue";

export default {
  name: "QueueNode",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    testQueue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      queues: ["Queue 1", "Queue 2", "Queue 3"],
      select: "Select Queue",
      queueName: "df-data-queueName",
    };
  },
  components: { DisabledTextBox },
  created() {
    this.getQueues();
  },
  computed: {
    ...mapGetters(["queues", "selectQueues"]),
  },
  methods: {
    ...mapActions(["getQueues"]),
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style>
.t-tooltip:hover .t-box {
  display: inline;
}
</style>
