<template>
  <div class="flex">
    <div class="mb-3 mt-5 xl:w-full">
      <div class="input-group flex flex-wrap items-stretch w-full">
        <input
          type="search"
          class="form-control text-xs flex-auto min-w-0 block w-full px-3 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Search Here ...."
          aria-label="Search"
          aria-describedby="button-addon2"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: ["search"],
};
</script>

<style></style>
