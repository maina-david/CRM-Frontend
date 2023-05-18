<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3">
    <div class="flex">
      <div>
        <h3 class="font-semibold">SEND SOME TEXT</h3>
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
          Drag this node when you want to play a track for a user
        </div>
      </div>
    </div>
    <div class="mb-2 border-t my-2 text-xs">
      <DisabledTextBox type="text" placeholder="Enter a name" label="Name" />
    </div>
    <div class="mb-2 border-t my-2 text-xs">
      <DisabledTextBox
        type="textarea"
        placeholder="Enter some text"
        label="Some Text"
      />
    </div>
    <!-- <div>
      <label for="selection" class="text-xs">Select track</label>
      <select
        id="selection"
        disabled
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">- Select track -</option>
        <option value="http://www.culturedub.com/assets/04-Forward.mp3">
          Music 1
        </option>
        <option
          value="http://www.culturedub.com/assets/04-Moringa-JahYu-Remix-feat-BaNdula-1.mp3"
        >
          Music 2
        </option>
      </select>
    </div> -->
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
import DisabledTextBox from "../DisabledTextBox.vue";
export default {
  components: { DisabledTextBox },
  setup() {
    // eslint-disable-next-line no-unused-vars
    function change(sourceUrl) {
      var audio = document.getElementById("player");
      var source = document.getElementById("mp3_src");

      audio.pause();

      if (sourceUrl) {
        source.src = sourceUrl;
        console.log("playing" + sourceUrl);
        audio.load();
        audio.play();
      }
    }
  },
};
</script>

<style>
.t-tooltip:hover .t-box {
  display: inline;
}
</style>
