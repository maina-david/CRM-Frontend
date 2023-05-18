<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3">
    <div class="flex">
      <div>
        <h3 class="font-semibold">SEND SMS</h3>
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
          Drag this node when you want to send the user an SMS
        </div>
      </div>
    </div>
    <div class="mb-2 border-t my-2 text-xs">
      <DisabledTextBox type="text" placeholder="Enter a name" label="Name" />
    </div>
    <div class="mb-2 my-2 text-xs">
      <DisabledTextArea
        class="text-xs"
        type="text"
        placeholder="Enter a message"
        label="Message"
      />
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
import DisabledTextBox from "@/components/DisabledTextBox.vue";
import DisabledTextArea from "@/components/DisabledTextArea.vue";

export default {
  components: { DisabledTextBox, DisabledTextArea },
};
</script>

<style>
.t-tooltip:hover .t-box {
  display: inline;
}
</style>
