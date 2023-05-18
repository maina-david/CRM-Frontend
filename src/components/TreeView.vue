<template>
  <tree :config="config" :nodes="nodes"> </tree>
</template>

<script>
import treeview from "vue3-treeview";
import "vue3-treeview/dist/style.css";

export default {
  components: {
    tree: treeview,
  },
  data: function () {
    return {
      nodes: {
        id1: {
          text: "text1",
          children: ["id11", "id12"],
        },
        id11: {
          text: "text11",
          children: ["id112"],
        },
        id12: {
          text: "text12",
          children: ["id111"],
        },
        id111: {
          text: "text111",
        },
        id112: {
          text: "text111",
        },
      },
      config: {
        roots: ["id1"],
        openedIcon: {
          type: "img",
          height: 16,
          width: 16,
          src: "https://n00ts.github.io/vue3-treeview/minus.png",
        },
        closedIcon: {
          type: "img",
          height: 16,
          width: 16,
          src: "https://n00ts.github.io/vue3-treeview/add.png",
        },
      },
    };
  },
};
</script>
