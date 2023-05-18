<template>
  <div class="bg-white shadow-sm relative">
    <div>
      <AllAgentsTables :tableHead="agentsTableHead" :tableData="allSIP" />
    </div>
  </div>
</template>

<script>
import AllAgentsTables from "@/components/tables/ContactCenterTables/AllAgentsTables.vue";
import { mapGetters } from "vuex";

export default {
  methods: {},
  computed: {
    ...mapGetters(["allSIP"]),
  },
  components: { AllAgentsTables },
  data() {
    return {
      agentsTableHead: [
        "Name",
        "Extension Number",
        "Extension status",
        "Call Status",
        "Action",
      ],
      agentsTableData: [
        { name: "Jane Doe", extensionNumber: "1155" },
        { name: "Winter Weatger", extensionNumber: "1624" },
        { name: "Willy Wonker", extensionNumber: "9632" },
        { name: "Emmaculate Teeth", extensionNumber: "2356" },
      ],
    };
  },
};
</script>

<style></style>
