<template>
  <div class="m-5">
    <div
      @click="nodeClicked"
      :style="{ 'margin-left': `${depth * 20}px` }"
      class="node text-left flex"
    >
      <span v-if="hasChildren" class="type">{{
        expanded ? "&#9660;" : "&#9658;"
      }}</span>
      <span v-else>&#9671;</span>
      <h2>{{ node.name }}</h2>
    </div>
    <div v-if="expanded">
      <EscalationMatrix
        v-for="child in node.children"
        :key="child.name"
        :node="child"
        :depth="depth + 1"
        @onClick="(node) => $emit('onClick', node)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "EscalationMatrix",
  props: { node: Object, depth: { type: Number } },
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    hasChildren() {
      return this.node.children;
    },
  },
  methods: {
    nodeClicked() {
      this.expanded = !this.expanded;
      if (!this.hasChildren) {
        this.$emit("onClick", this.node);
      }
    },
  },
};
</script>

<style scoped></style>
