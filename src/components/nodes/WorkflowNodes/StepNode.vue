<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3">
    <div class="flex">
      <div>
        <h3 class="font-semibold">STEP NODE</h3>
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
          Drag this node ro displaye your steps
        </div>
      </div>
    </div>
    <div class="mb-2 border-t my-2 text-xs">
      <DisabledTextBox type="text" placeholder="Enter a name" label="Name" />
    </div>
    <div class="mb-2 border-t my-2 text-xs">
      <DisabledTextBox
        type="text"
        placeholder="Enter a description"
        label="Description"
      />
    </div>
    <div>
      <label for="selection" class="text-xs">Select a team</label>
      <select
        id="selection"
        disabled
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">- Select Team -</option>
        <option value="">Team 1</option>
        <option value="">Team 2</option>
        <option value="">Team 3</option>
      </select>
    </div>
    <div>
      <label for="selection" class="text-xs">Select a form</label>
      <select
        id="selection"
        disabled
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">- Select Form -</option>
        <option value="">Form 1</option>
        <option value="">Form 2</option>
        <option value="">Form 3</option>
      </select>
    </div>
  </div>
</template>

<script>
import DisabledTextBox from "@/components/DisabledTextBox.vue";
export default {
  components: { DisabledTextBox },
  setup() {},
};
</script>

<style>
.t-tooltip:hover .t-box {
  display: inline;
}
</style>
