<template>
  <div class="m-10">
    <div class="border-b flex justify-between mt-10">
      <div>
        <h2 class="font-bold text-xl p-3">Escalation Matrix</h2>
      </div>
      <div>
        <ActionButton text="Preview Form" />
      </div>
    </div>
    <EscalationMatrix :node="root" @onClick="nodeWasClicked" />
  </div>
</template>

<script>
import EscalationMatrix from "@/components/Tree/EscalationMatrix.vue";
import ActionButton from "@/components/ActionButton.vue";
export default {
  components: { EscalationMatrix, ActionButton },
  data() {
    return {
      root: {
        name: "/",
        children: [
          {
            name: "Gender",
            children: [{ name: "Male" }],
          },
          {
            name: "Gender",
            children: [{ name: "Female" }],
          },
        ],
      },
    };
  },
  methods: {
    nodeWasClicked(node) {
      alert(node.name);
    },
  },
};
</script>

<style></style>
