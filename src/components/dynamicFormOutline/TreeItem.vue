<template>
  <div id="tree-item ">
    <div class="card">
      <ul>
        <li v-for="(item, index) in treeData" :key="index">
          <div
            class="item"
            :class="{
              'line-left': index !== 0,
              'line-right': index != treeData.length - 1,
            }"
          >
            <div
              class="item-name bg-white"
              :class="{
                'line-bottom': item.child && item.child.length > 0,
                'line-top': !treeFirst,
              }"
            >
              <div v-if="!treeFirst" class="reduce" @click="delChild(index)">
                -
              </div>
              <NodeItem v-if="item.tree_id == '0tree0'" :nodeItem="item" />
              <NodeItem
                v-else
                @click="handleEscalationModal(item)"
                :nodeItem="item"
              />
              <div class="plus" @click="addChild(item, index)">+</div>
            </div>
          </div>
          <TreeItem
            v-if="item.child && item.child.length > 0"
            :treeData="item.child"
          >
          </TreeItem>
        </li>
      </ul>
    </div>
    <EscalationModal
      :show="showEscalationModal"
      :currentEscalation="currentNode"
      @escalations="handleEscalation"
    />
    <CreateNodeModal
      :show="showCreateNodeModal"
      state="Add"
      :currentNode="currentNode"
      :currentNodeIndex="currentNodeIndex"
      @escalations="handleEscalation"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import NodeItem from "@/components/dynamicFormOutline/NodeItem.vue";
import EscalationModal from "@/components/modals/ChatModals/EscalationModal.vue";
import CreateNodeModal from "@/components/modals/ChatModals/CreateNodeModal.vue";

export default {
  name: "TreeItem",
  props: {
    treeData: {
      type: Array,
      default: () => [],
    },
    treeFirst: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      treeDataTest: [],
      currentNode: {},
      currentNodeIndex: "",
    };
  },
  setup() {
    const showEscalationModal = ref(false);
    const showCreateNodeModal = ref(false);

    return {
      showEscalationModal,
      showCreateNodeModal,
    };
  },
  created() {},
  methods: {
    handleEscalationModal(data) {
      this.currentNode = data;
      this.showEscalationModal = !this.showEscalationModal;
    },
    handleEscalation(e) {
      this.treeDataTest = this.treeData.map((tree) => {
        if (tree.tree_id == e.tree_id) {
          tree = e;
        }
        return tree;
      });
    },
    addChild(data, index) {
      this.currentNode = data;
      this.currentNodeIndex = index;
      this.showCreateNodeModal = !this.showCreateNodeModal;
    },
    delChild(index) {
      // eslint-disable-next-line vue/no-mutating-props
      this.treeData.splice(index, 1);
    },
  },
  components: {
    EscalationModal,
    CreateNodeModal,
    NodeItem,
  },
};
</script>

<style>
.card ul {
  display: flex;
  justify-content: center;
}
.card ul li .item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.card ul li .item-name {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 10px;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.card ul li .item-name .plus {
  position: absolute;
  border: solid 1px #666;
  border-radius: 100%;
  bottom: -5px;
  width: 12px;
  height: 12px;
  line-height: 10px;
  text-align: center;
  color: #666;
  z-index: 100;
  cursor: pointer;
  margin: 0;
  padding: 0;
}
.card ul li .item-name .plus:hover {
  opacity: 100%;
}
.card ul li .item-name .reduce {
  position: absolute;
  border: solid 1px #666;
  border-radius: 100%;
  bottom: -5px;
  width: 12px;
  height: 12px;
  line-height: 10px;
  text-align: center;
  color: #666;
  z-index: 100;
  cursor: pointer;
  margin: 0;
  padding: 0;
  top: -5px;
}
.card ul li .item-name .reduce:hover {
  opacity: 100%;
}
.card .line-bottom::after {
  content: "";
  display: block;
  width: 3px;
  height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background: #66b7fd;
  bottom: -20px;
}
.card .line-top::before {
  content: "";
  display: block;
  width: 3px;
  height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background: #66b7fd;
  top: -20px;
}
.card .line-left::after {
  content: "";
  display: block;
  width: 3px;
  height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background: #66b7fd;
  width: calc(50% + 20px);
  height: 3px;
  left: calc(-50% - calc(20px+2px));
  top: 0;
}
.card .line-right::before {
  content: "";
  display: block;
  width: 3px;
  height: 20px;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background: #66b7fd;
  width: calc(50% + 20px);
  height: 3px;
  right: calc(-50% - calc(20px+2px));
  top: 0;
}
</style>
>
