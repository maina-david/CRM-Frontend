<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="my-5 flex justify-between border-b">
      <div class="">
        <h2 @click="handleFlattenEscalation" class="font-bold text-xl p-3">
          Ticket Form Builder
        </h2>
      </div>
      <div class="inline-flex gap-3 mb-4">
        <ActionButton text="Submit" @click="wasClicked" />
      </div>
    </div>
    <div class="m-5 border-b">
      <div class="">
        <h3 class="font-bold text-xl p-3">Ticket Raiser Form builder</h3>
        <AccordionFormBuilder
          @form_items="handleForm"
          :treeData="treeData"
          :escNode="escNode"
        />
      </div>
    </div>
    <div class="">
      <h3 class="font-bold text-xl p-3">Ticket Form builder</h3>
    </div>
    <div class="tree">
      <div class="tree-content" @mousedown.stop="move">
        <TreeItem :tree-data="treeData" :tree-first="true" />
      </div>
    </div>
  </div>
</template>

<script>
import TreeItem from "./TreeItem.vue";
import AccordionFormBuilder from "@/components/dynamicFormOutline/AccordionFromBuilder.vue";

export default {
  components: {
    TreeItem,
    AccordionFormBuilder,
  },
  data() {
    return {
      form_items: [],
      escNode: [],
      treeData: [
        {
          tree_id: "0tree0",
          name: "DIRECTOR",
          description: "DR",
          child: [
            {
              tree_id: "0tree1",
              name: "MARKETING DEPARTMENT",
              description: "MKTD",
              formItems: [],
              child: [
                {
                  tree_id: "1tree0",
                  name: "PRODUCT A",
                  description: "PDA",
                  formItems: [],
                  child: [],
                },
                {
                  tree_id: "1tree1",
                  name: "PRODUCT B",
                  description: "PDB",
                  formItems: [],
                  child: [],
                },
              ],
            },
            {
              tree_id: "0tree2",
              name: "CUSTOMER SERVICE",
              description: "CSTS",
              formItems: [],
              child: [
                {
                  tree_id: "2tree0",
                  name: "PLANNING DEPARTMENT",
                  description: "PLDP",
                  formItems: [],
                  child: [],
                },
                {
                  tree_id: "2tree1",
                  name: "RESEARCH DEPARTMENT",
                  description: "RSDP",
                  formItems: [],
                  child: [],
                },
              ],
            },
            {
              tree_id: "0tree3",
              name: "ADMINISTRATIVE CENTER",
              description: "ADC",
              formItems: [],
              child: [
                {
                  tree_id: "3tree0",
                  name: "HUMAN RESOURCES DEPARTMENT",
                  description: "HRSD",
                  formItems: [],
                  child: [
                    {
                      tree_id: "3tree2",
                      name: "TRAINING",
                      description: "TRG",
                      formItems: [],
                      child: [],
                    },
                    {
                      tree_id: "3tree2",
                      name: "RECRUITING",
                      description: "RCG",
                      formItems: [],
                      child: [],
                    },
                    {
                      tree_id: "3tree2",
                      name: "SALARY",
                      description: "SLR",
                      formItems: [],
                      child: [],
                    },
                  ],
                },
                {
                  tree_id: "3tree1",
                  name: "OPERATIONS DEPARTMENT",
                  description: "OPRD",
                  formItems: [],
                  child: [
                    {
                      tree_id: "3tree2",
                      name: "PLANNING",
                      description: "PLG",
                      formItems: [],
                      child: [],
                    },
                    {
                      tree_id: "3tree2",
                      name: "RESEARCH",
                      description: "RSC",
                      formItems: [],
                      child: [],
                    },
                  ],
                },
              ],
            },
            {
              tree_id: "0tree3",
              name: "TEXHNOLOGY",
              description: "TCG",
              formItems: [],
              child: [
                {
                  tree_id: "3tree0",
                  name: "COPMUTING",
                  description: "NTW",
                  formItems: [],
                  child: [
                    {
                      tree_id: "3tree2",
                      name: "SOFTWARE",
                      description: "SFT",
                      formItems: [],
                      child: [],
                    },
                    {
                      tree_id: "3tree2",
                      name: "HARDWARE",
                      description: "HRD",
                      formItems: [],
                      child: [],
                    },
                  ],
                },
                {
                  tree_id: "3tree1",
                  name: "NETWORKING DEPARTMENT",
                  description: "NTW",
                  formItems: [],
                  child: [
                    {
                      tree_id: "3tree2",
                      name: "PLANNING",
                      description: "PLG",
                      formItems: [],
                      child: [],
                    },
                    {
                      tree_id: "3tree2",
                      name: "RESEARCH",
                      description: "RSC",
                      formItems: [],
                      child: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
  created() {
    this.escNode = this.handleFlattenEscalation([], this.treeData);
  },
  methods: {
    handleForm(e) {
      this.form_items = e;
    },
    handleFlattenEscalation(into, node) {
      var that = this;
      if (node == null) return into;
      if (Array.isArray(node))
        return node.reduce(that.handleFlattenEscalation, into);
      into.push({ label: node.name, value: node.id });
      return that.handleFlattenEscalation(into, node.child);
    },
    //Drag and move
    move(e) {
      const odiv = e.currentTarget; //Get the element
      //Calculate the position of the mouse relative to the element
      const disX = e.clientX - odiv.offsetLeft;
      const disY = e.clientY - odiv.offsetTop;
      document.onmousemove = (e) => {
        //The event that the mouse presses and moves
        //Subtract the position of the mouse relative to the element from the position of the mouse to get the position of the element
        const left = e.clientX - disX;
        const top = e.clientY - disY;
        //Bind the element position to position X and position Y
        this.positionX = top;
        this.positionY = left;
        //Move the current element
        odiv.style.left = left + "px";
        odiv.style.top = top + "px";
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    wasClicked() {
      // var click = this.treeData;
      // console.log("Was Clicked" + JSON.stringify(click));
      console.log("Was Clicked");
    },
  },
};
</script>

<style>
.tree {
  min-height: calc(100vh-110px);
}
.tree-content {
  top: 0;
  left: 0;
}
</style>
