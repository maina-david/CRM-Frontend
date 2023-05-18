<template>
  <div
    class="flex justify-start bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3"
  >
    <div>
      <h3 class="font-semibold">HANG UP</h3>
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
        Drag Hang up to the play ground to signify the end of your flow
      </div>
    </div>
  </div>
</template>

<script>
export default { components: {} };
</script>

<style>
.t-tooltip:hover .t-box {
  display: inline;
}
</style>
