<template>
  <div
    class="max-w-xs pt-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex flex-col items-center pb-10">
      <img
        class="mb-3 w-24 h-24 rounded-full shadow-lg"
        :src="{ logoUrl }"
        alt="Profile"
      />
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        Full Name: {{ fullName }}
      </h5>
      <span class="text-sm text-gray-500 dark:text-gray-600 m-2"
        >ID Number: {{ idNo }}</span
      >
      <span class="text-sm text-gray-500 dark:text-gray-600 m-2"
        >Phone Number: {{ phoneNo }}</span
      >
      <h6 class="text-blue-900 text-lg font-semibold mt-4">Roles</h6>

      <div class="flex mt-4 space-x-3 lg:mt-3">
        <span
          v-for="role in roles"
          :key="role"
          class="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
        >
          <span class="material-icons sm:">close</span>
          {{ role }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: [],
  data() {
    return {
      logoUrl: "",
      fullName: "Linda Tonui",
      idNo: "123456",
      phoneNo: "12345678958",
      roles: ["Owner", "Admin", "Agent"],
    };
  },
};
</script>

<style></style>
