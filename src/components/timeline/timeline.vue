<template>
  <div>
    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-2 ml-4 flex justify-between">
        <div class="m-5">
          <div
            class="absolute w-3 h-3 bg-slate-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
          ></div>

          <h3 class="text-sm font-normal text-gray-700 dark:text-white">
            Call Time
          </h3>
        </div>
        <div class="m-5">
          <time
            class="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500"
            >{{ timeConvert(timelines.call_time) }}</time
          >
        </div>
      </li>
    </ol>

    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-2 ml-4 flex justify-between">
        <div class="m-5">
          <div
            class="absolute w-3 h-3 bg-slate-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
          ></div>

          <h3 class="text-sm font-normal text-gray-700 dark:text-white">
            Hold Time
          </h3>
        </div>
        <div class="m-5">
          <time
            class="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500"
            >{{ timeConvert(timelines.hold_time) }}</time
          >
        </div>
      </li>
    </ol>

    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-2 ml-4 flex justify-between">
        <div class="m-5">
          <div
            class="absolute w-3 h-3 bg-slate-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
          ></div>

          <h3 class="text-sm font-normal text-gray-700 dark:text-white">
            Queue Time
          </h3>
        </div>
        <div class="m-5">
          <time
            class="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500"
            >{{ timeConvert(timelines.queue_time) }}</time
          >
        </div>
      </li>
    </ol>

    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-2 ml-4 flex justify-between">
        <div class="m-5">
          <div
            class="absolute w-3 h-3 bg-slate-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
          ></div>

          <h3 class="text-sm font-normal text-gray-700 dark:text-white">
            Mute Time
          </h3>
        </div>
        <div class="m-5">
          <time
            class="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500"
            >{{ timeConvert(timelines.mute_time) }}</time
          >
        </div>
      </li>
    </ol>

    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-2 ml-4 flex justify-between">
        <div class="m-5">
          <div
            class="absolute w-3 h-3 bg-slate-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
          ></div>

          <h3 class="text-sm font-normal text-gray-700 dark:text-white">
            Wrap Up Time
          </h3>
        </div>
        <div class="m-5">
          <time
            class="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500"
            >{{ timeConvert(timelines.wrap_up_time) }}</time
          >
        </div>
      </li>
    </ol>

    <ol class="relative border-l border-gray-200 dark:border-gray-700">
      <li class="mb-2 ml-4 flex justify-between">
        <div class="m-5">
          <div
            class="absolute w-3 h-3 bg-slate-600 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
          ></div>

          <h3 class="text-sm font-normal text-gray-700 dark:text-white">
            Time To Answer
          </h3>
        </div>
        <div class="m-5">
          <time
            class="mb-1 text-xs font-normal leading-none text-gray-400 dark:text-gray-500"
            >{{ timeConvert(timelines.time_to_answer) }}</time
          >
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "TimeLine",
  props: ["timelines"],
  methods: {
    timeConvert(n) {
      var sec_num = parseInt(n, 10); // don't forget the second param
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
  },
};
</script>

<style></style>
