<template>
  <div>
    <div
      v-if="typeOfAlert == 'Info'"
      class="flex flex-col p-4 mb-4 border-t-4 border-blue-700 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
      role="alert"
    >
      <div>
        <h3 class="font-semibold">{{ head }}!</h3>
      </div>
      <div v-if="message">
        <div class="flex gap-5">
          <div>
            <svg
              class="flex-shrink-0 w-5 h-5 text-blue-700"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <span class="font-medium">{{ message.message }}</span>
          </div>
        </div>
        <div v-if="message.errors">
          <div
            v-for="(value, key) in message.errors"
            :key="key"
            class="flex flex-col"
          >
            <span class="font-medium mt-2 mx-4">
              <span v-for="item in value" :key="item">- {{ item }}</span></span
            >
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="typeOfAlert == 'Danger'"
      class="flex flex-col p-4 mb-4 border-t-4 border-red-700 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <div class="flex gap-5">
        <div>
          <svg
            class="flex-shrink-0 w-5 h-5 text-red-700"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <div>
          <h3 class="font-semibold">{{ head }}!</h3>
        </div>
      </div>
      <div v-if="message">
        <div>
          <span class="font-medium">{{ message.message }}</span>
        </div>
        <div v-if="message.errors">
          <div
            v-for="(value, key) in message.errors"
            :key="key"
            class="flex flex-col"
          >
            <span class="font-medium mt-2 mx-4">
              <span v-for="item in value" :key="item">- {{ item }}</span></span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="typeOfAlert == 'Success'"
      class="flex flex-col p-4 mb-4 text-sm border-t-4 border-green-700 text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
      role="alert"
    >
      <div class="flex gap-5">
        <div>
          <svg
            class="flex-shrink-0 w-5 h-5 text-green-700"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>

        <div>
          <h3 class="font-semibold">{{ head }}!</h3>
        </div>
      </div>
      <div v-if="message">
        <div>
          <span class="font-medium">{{ message.message }}</span>
        </div>

        <div v-if="message.errors">
          <div
            v-for="(value, key) in message.errors"
            :key="key"
            class="flex flex-col"
          >
            <span class="font-medium mt-2 mx-4">
              <span v-for="item in value" :key="item">- {{ item }}</span></span
            >
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="typeOfAlert == 'Warning'"
      class="flex flex-col p-4 mb-4 text-sm border-t-4 border-yellow-700 text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
      role="alert"
    >
      <div>
        <h3 class="font-semibold">{{ head }}!</h3>
      </div>
      <div v-if="message">
        <div class="flex gap-5">
          <div>
            <svg
              class="flex-shrink-0 w-5 h-5 text-yellow-700"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <span class="font-medium">{{ message.message }}</span>
          </div>
        </div>
        <div v-if="message.errors">
          <div
            v-for="(value, key) in message.errors"
            :key="key"
            class="flex flex-col"
          >
            <span class="font-medium mt-2 mx-4">
              <span v-for="item in value" :key="item">- {{ item }}</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Alert",
  props: ["head", "message", "bulkMessage", "typeOfAlert"],
};
</script>

<style scoped>
.alert-wrapper {
  position: fixed;
  width: 100%;
  top: 120;
}
</style>
