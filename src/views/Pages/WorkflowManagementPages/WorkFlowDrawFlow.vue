<template>
  <main>
    <div>
      <DrawFlow />
    </div>
  </main>
</template>

<script>
import DrawFlow from "@/components/drawFlows/WorkflowDrawFlow.vue";

export default {
  name: "WorkflowFlow",
  components: { DrawFlow },
};
</script>

<style scoped>
*,
:after,
:before {
  margin: 0;
}
body {
  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
  margin: 10px;
  padding: 0;
}

#app {
  margin: 0px;
  border-radius: 8px;
}
.el-main {
  padding: 0;
}
</style>
