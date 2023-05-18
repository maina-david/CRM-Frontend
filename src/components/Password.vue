<template>
  <div class="flex mb-3 mr-5">
    <div class="w-full">
      <label
        for="textBox"
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Password</label
      >
      <div class="relative flex">
        <input
          :type="show ? 'password' : 'text'"
          placeholder="Enter your password"
          :value="modelValue"
          class="form-control block w-80 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          @input="handleInput"
        />
        <span
          @click="show = !show"
          :class="{ hidden: !show, block: show }"
          class="material-icons inline-flex absolute text-center right-0 text-sm mx-2 my-1 text-slate-700 cursor-pointer"
          >visibility</span
        >
        <span
          @click="show = !show"
          :class="{ block: !show, hidden: show }"
          class="material-icons inline-flex absolute text-center right-0 text-sm mx-2 my-1 text-slate-700 cursor-pointer"
          >visibility_off</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Password",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>

<style></style>
