<template>
  <div>
    <div
      class="flex text-black justify-start bg-white rounded-sm text-left overflow-hidden px-5 py-2"
    >
      <div class="text-center">
        <h3 class="font-semibold">{{ nodeItem.name }}</h3>
        <h6 class="text-sm text-gray-600">
          {{ nodeItem.description }}
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NodeItem",
  props: {
    nodeItem: {
      type: Object,
      default: () => {},
    },
    firstNode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      treeData: [
        {
          name: "START",
          description: "Click Here to configure first Escalation Nodes",
        },
      ],
    };
  },
  methods: {
    //Drag and move
    wasClicked() {
      console.log("Node");
    },
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
