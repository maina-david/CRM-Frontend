<template>
  <div class="bg-white shadow-sm relative">
    <AgentStatusTable
      :tableHead="agentStatusTableHead"
      :tableData="activeAgents"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AgentStatusTable from "@/components/tables/ContactCenterTables/AgentStatusTable.vue";
export default {
  props: {
    agents: { type: Array },
  },
  data() {
    return {
      agentStatusTableHead: [
        "Agent Name",
        "Queues",
        "Agent Status",
        "Sip Status",
        "Penalties",

        "Actions",
      ],
    };
  },
  components: { AgentStatusTable },
  computed: {
    ...mapGetters(["activeAgents"]),
  },
  created() {
    this.getActiveAgents();
  },
  methods: {
    ...mapActions(["getActiveAgents"]),
  },
};
</script>

<style></style>
