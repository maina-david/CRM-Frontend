<template>
  <div>
    <ul>
      <li v-for="node in data" :key="node.id">
        <label>
          <input
            :id="node.id"
            type="checkbox"
            v-model="node.checked"
            @change="hanldeInputChange"
          />
          {{ node.name }}
        </label>
        <ul v-if="node.children?.length">
          <tree-view :data="node.children"></tree-view>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";

export default {
  created() {},
  updated() {},
  methods: {
    ...mapActions(["addCheckedInputs"]),
    hanldeInputChange(event) {
      this.addCheckedInputs(event.target.id);
    },
  },

  data() {
    return {
      checkedItems: [],
    };
  },
  name: "TreeView",
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { updateChecked } = ref(props);

    const selectChild = (node) => {
      node.children.forEach((child) => {
        child.checked = node.checked;
        selectChild(child);
      });
    };

    const updateNode = (id, checked) => {
      let parentChecked = true;
      let childChecked = false;

      const updateParent = (node) => {
        if (!node.checked) {
          parentChecked = false;
        }
        if (node.children.length) {
          node.children.forEach((child) => {
            if (child.checked) {
              childChecked = true;
            }
          });
        }
        if (parentChecked) {
          node.checked = true;
        } else if (!childChecked) {
          node.checked = false;
        }
      };

      props.data.forEach((node) => {
        if (node.id === id) {
          node.checked = checked;
          selectChild(node);
          if (node.parent) {
            updateParent(node.parent);
          }
        }
      });
      updateChecked(props.data);
    };

    return { updateNode };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 20px;
}
</style>
