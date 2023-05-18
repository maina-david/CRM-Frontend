<template>
  <div class="tab-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tabs",
  props: {
    title: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
.tab-content {
  min-height: 400px;
  padding: auto;
  box-shadow: 0 3px 5px 5px rgba(0, 0, 0, 0.5 green, blue, alpha);
}
</style>
