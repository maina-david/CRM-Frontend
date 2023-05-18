<template>
  <div
    class="justify-start bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3"
  >
    <div>
      <h3 class="font-semibold">TEXT FIELD</h3>
    </div>

    <div class="">
      <label
        for="textBox"
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Label</label
      >
      <input
        type="text"
        placeholder="Enter the label"
        class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        v-model="myLabel"
        df-label
      />
    </div>
    <div class="">
      <label
        for="textBox"
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Placeholder</label
      >
      <input
        type="text"
        placeholder="Enter the placeholder"
        class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        v-model="myPlaceholder"
        df-placeholder
      />
    </div>
    <div class="mt-1">
      <label
        for="dropDown"
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Select the parent to this node</label
      >
      <select
        df-selectedNode
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="" disabled>Select Parent</option>
        <option
          :disabled="disabled"
          v-for="option in options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: { options: { type: Array } },
  data() {
    return {
      myLabel: "",
      myPlaceholder: "",
    };
  },

  mounted() {
    this.$nextTick(() => {
      const id = this.$el.parentElement.parentElement.id;
      console.log("My Node " + id);
    });
  },
};
</script>

<style></style>
