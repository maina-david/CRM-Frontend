<template>
  <div>
    <DialPad @add-to-history="addToHistory" />
    <CallHistory :call-history="callHistory" />
  </div>
</template>
<script>
import DialPad from "./DialPad.vue";
import CallHistory from "./CallHistory.vue";

export default {
  components: {
    DialPad,
    CallHistory,
  },
  data() {
    return {
      callHistory: [],
    };
  },
  methods: {
    addToHistory(call) {
      this.callHistory.push(call);
    },
  },
};
</script>
