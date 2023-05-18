<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3">
    <div class="flex">
      <div>
        <h3 class="font-semibold">ATTACHMENT</h3>
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
          Drag attachment to attach a file
        </div>
      </div>
    </div>
    <div class="mb-2 border-t my-2 text-xs">
      <DisabledTextBox
        type="text"
        placeholder="Enter attachment name"
        label="Name"
        disabled
      />
    </div>
    <div class="mb-2 w-full">
      <div class="mb-2 w-full">
        <div>
          <label
            for="textBox"
            class="form-label text-xs inline-block text-gray-700"
            >Time in seconds</label
          >
        </div>
        <input
          type="time"
          placeholder="Attachment"
          disabled
          class="form-control w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
      </div>
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
import "vue3-timepicker/dist/VueTimepicker.css";
import DisabledTextBox from "../DisabledTextBox.vue";
export default { components: { DisabledTextBox } };
</script>

<style>
.t-tooltip:hover .t-box {
  display: inline;
}
</style>
