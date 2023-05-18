<template>
  <div
    class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
  >
    <ul class="flex h-full p-0 m-2 list-none">
      <li
        v-for="menuItem in menuItems"
        :key="menuItem"
        class="h-full ml-9 first:ml-0 w-full"
        data-test="main-nav-list-item"
      >
        <a
          href=""
          class="block p-2 border-b-2 border-transparent border-blue-600 max-w-sm rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >{{ menuItem }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SubMenuTabs",
  props: ["menuItems"],
  data() {
    return {};
  },
};
</script>

<style></style>
