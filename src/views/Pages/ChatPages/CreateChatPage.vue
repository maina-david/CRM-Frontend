<template>
  <main>
    <div>
      <ChatDrawFlow />
    </div>
  </main>
</template>

<script>
import ChatDrawFlow from "@/components/drawFlows/ChatDrawFlow.vue";
/*import Channel from "@/componentGuard.js";
import groupManagement from "@/componentGuard.js";
import ClickToCall from "@/componentGuard.js";
import Inbound from "@/componentGuard.js";
import Outbound from "@/componentGuard.js";
import Company from "@/componentGuard.js";*/
/*import RoleProfile from "@/componentGuard.js";*/
//import UserManagement from "@/componentGuard.js";

export default {
  name: "CreateChat",
  components: { ChatDrawFlow },
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
