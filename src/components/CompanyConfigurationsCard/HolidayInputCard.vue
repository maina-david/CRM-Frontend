<template>
  <div>
    <div class="mt-5 m-3">
      <TextBox
        v-model="date"
        type="date"
        label="Pick the holiday date"
        placeholder=""
      />
      <TextBox
        v-model="name"
        type="text"
        label="Name of the holiday"
        placeholder=""
      />
      <TextBox
        v-model="description"
        type="text"
        label="Description of the holiday"
        placeholder=""
      />

      <div>
        <label for="selection" class="text-xs">Select track</label>

        <select
          id="selection"
          class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="">- Select track -</option>
          <option
            value="https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1661320915_04-Forward.mp3"
          >
            Music 1
          </option>
          <option
            value="http://www.culturedub.com/assets/04-Moringa-JahYu-Remix-feat-BaNdula-1.mp3"
          >
            Music 2
          </option>
        </select>
      </div>
      <ActionButton text="Submit" />
    </div>
  </div>
</template>

<script>
import TextBox from "@/components/TextBox.vue";
import ActionButton from "@/components/ActionButton.vue";

export default {
  components: { TextBox, ActionButton },
  data() {
    return {};
  },
};
</script>

<style></style>
