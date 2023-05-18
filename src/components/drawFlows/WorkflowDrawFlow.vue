<template>
  <el-container>
    <el-header class="header mt-10">
      <div class="mb-5">
        <h3 class="font-semibold">Create a flow for your Workflow</h3>
        <p class="my-3 text-sm">
          Drag an element from the left and create your flow on the right
        </p>
      </div>

      <el-button type="primary" class="mb-5" @click="exportEditor"
        >Submit Flow</el-button
      >
    </el-header>
    <el-container class="container p-2">
      <el-aside width="380px" class="column overflow-y-auto h-screen p-3">
        <StartNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Start"
          class="drag-drawflow"
        />
        <StepNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="StepNode"
          class="drag-drawflow"
        />
        <StopNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Stop"
          class="drag-drawflow"
        />
      </el-aside>

      <el-main>
        <div
          id="drawflow"
          @drop="drop($event)"
          @dragover="allowDrop($event)"
        ></div>
      </el-main>
    </el-container>
  </el-container>
  <el-dialog v-model="dialogVisible" title="Export">
    <span>Data:</span>
    <pre><code>{{dialogData}}</code></pre>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script defer>
import Drawflow from "drawflow";
import { mapActions, mapGetters } from "vuex";

// eslint-disable-next-line no-unused-vars
import styleDrawflow from "drawflow/dist/drawflow.min.css";
// eslint-disable-next-line no-unused-vars
import style from "@/assets/style.css";

import { onMounted, shallowRef, h, getCurrentInstance, render, ref } from "vue";
/*import Node1 from "@/components/chatNodes/SendTextWaitNode.vue";
import Node2 from "@/components/chatNodes/SendTextNode.vue";
import Node3 from "@/components/chatNodes/WaitNode.vue";
import Node4 from "@/components/chatNodes/QueueNode.vue";*/
import StepNode from "@/components/nodes/WorkflowNodes/StepNode.vue";
import StartNode from "../chatNodes/StartNode.vue";
import StopNode from "../chatNodes/StopNode.vue";
import $ from "jquery";

export default {
  name: "ChatDrawFlow",
  data() {
    return {
      testQueue: "",
      attachment: "",
      files: [
        {
          value:
            "https://goipspace.fra1.digitaloceanspaces.com/call_center/media/1666829577_Caskaydia_Cove_Nerd_Font_Complete_Bold.otf",
          label: "Media Doc 1",
        },
        {
          value:
            "https://goipspace.fra1.digitaloceanspaces.com/call_center/media/1666829538_Caskaydia_Cove_Nerd_Font_Complete_Bold_Italic.otf",
          label: "Media Doc 2",
        },
        {
          value:
            "https://goipspace.fra1.digitaloceanspaces.com/call_center/media/1666829676_Capture4.PNG",
          label: "Media Image 1",
        },
        {
          value:
            "https://goipspace.fra1.digitaloceanspaces.com/call_center/media/1666829712_Capture2.PNG",
          label: "Media Image 2",
        },
        {
          value:
            "https://goipspace.fra1.digitaloceanspaces.com/call_center/media/1666829160_800x800.jpg",
          label: "Media Image 3",
        },
        {
          value:
            "https://goipspace.fra1.digitaloceanspaces.com/call_center/media/1666829234_illustration.svg",
          label: "Media Image 4",
        },
      ],
    };
  },
  created() {
    this.getQueues();
    this.getChat();
  },
  computed: {
    ...mapGetters(["queues", "selectQueues", "selectChatAttachment"]),
  },
  methods: {
    ...mapActions(["getQueues", "getChat", "addIvrFlow"]),
  },
  setup() {
    // const listNodes = readonly([]);
    var teamFiles = [
      { label: "Team 1", value: "Team 1" },
      { label: "Team 2", value: "Team 2" },
    ];
    var formFiles = [
      { label: "Form 1", value: "Form 1" },
      { label: "Form 2", value: "Form 2" },
    ];
    const editor = shallowRef({});
    const dialogVisible = ref(false);
    const dialogData = ref({});
    const Vue = { version: 3, h, render };
    const internalInstance = getCurrentInstance();
    editor.value.reroute = true;
    internalInstance.appContext.app._context.config.globalProperties.$df =
      editor;

    $(document).ready(function () {
      $("#selection").on("change", function () {
        change($(this).val());
      });
    });

    function change(attachment) {
      var audio = document.getElementById("player");
      var source = document.getElementById("mp3_src");

      audio.pause();
      console.log("Got it");

      source.src = attachment;
      audio.load();
      audio.play();
    }

    //Function to export data
    function exportEditor() {
      dialogData.value = editor.value.export();
      var draw_flow = dialogData.value;
      console.log(draw_flow);
    }

    //Drag function
    const drag = (ev) => {
      if (ev.type === "touchstart") {
        mobile_item_selec = ev.target
          .closest(".drag-drawflow")
          .getAttribute("data-node");
      } else {
        ev.dataTransfer.setData("node", ev.target.getAttribute("data-node"));
      }
    };
    //Drop function
    const drop = (ev) => {
      if (ev.type === "touchend") {
        var parentdrawflow = document
          .elementFromPoint(
            mobile_last_move.touches[0].clientX,
            mobile_last_move.touches[0].clientY
          )
          .closest("#drawflow");
        if (parentdrawflow != null) {
          addNodeToDrawFlow(
            mobile_item_selec,
            mobile_last_move.touches[0].clientX,
            mobile_last_move.touches[0].clientY
          );
        }
        mobile_item_selec = "";
      } else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("node");
        addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }
    };

    //Allow drop
    const allowDrop = (ev) => {
      ev.preventDefault();
    };
    let mobile_item_selec = "";
    let mobile_last_move = null;
    function positionMobile(ev) {
      mobile_last_move = ev;
    }

    //Add node to draw fow
    function addNodeToDrawFlow(name, pos_x, pos_y) {
      if (editor.value.editor_mode === "fixed") {
        return false;
      }
      pos_x =
        pos_x *
          (editor.value.precanvas.clientWidth /
            (editor.value.precanvas.clientWidth * editor.value.zoom)) -
        editor.value.precanvas.getBoundingClientRect().x *
          (editor.value.precanvas.clientWidth /
            (editor.value.precanvas.clientWidth * editor.value.zoom));
      pos_y =
        pos_y *
          (editor.value.precanvas.clientHeight /
            (editor.value.precanvas.clientHeight * editor.value.zoom)) -
        editor.value.precanvas.getBoundingClientRect().y *
          (editor.value.precanvas.clientHeight /
            (editor.value.precanvas.clientHeight * editor.value.zoom));

      switch (name) {
        //Start Node
        case "Start": {
          var start = ` <div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3"
  >
    <h3 class="font-semibold">START</h3>
  </div>

  `;

          editor.value.addNode(
            "Start",
            0,
            1,
            pos_x,
            pos_y,
            "Start",
            {
              data: {},
            },
            start
          );
          break;
        }

        //Step Node
        case "StepNode": {
          var options_files = teamFiles;
          var options_files2 = formFiles;

          // eslint-disable-next-line no-unused-vars
          var teams = "";
          var forms = "";
          // eslint-disable-next-line no-unused-vars
          var myTeams = options_files.forEach((option) => {
            teams =
              teams +
              `<option
 value = ${option.value}>${option.label}</option>`;
          });

          // eslint-disable-next-line no-unused-vars
          var myForms = options_files2.forEach((option) => {
            forms =
              forms +
              `<option
 value = ${option.value}>${option.label}</option>`;
          });
          var stepNode =
            `<div
    class="relative bg-white rounded-sm text-left shadow-sm p-3 m-2"
  >
    <h3 class="font-semibold text-xs">STEP NODE</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Name of step</label
      >
      <input
        type="text"
        placeholder="Step name"
        df-data-name
        class="form-control  w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
     <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Description of step</label
      >
      <input
        type="text"
        placeholder="Step Description"
        df-data-description
        class="form-control  w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>


    <div class="mt-3">
               <label
                  class="form-label text-xs inline-block mb-2 text-gray-700"
                  onClick="check_here()">Select a team</label
                >

                <select
                df-data-team
                 class="form-select block w-full p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >` +
            teams +
            `</select>

                </div>
                 <div class="mt-3">
               <label
                  class="form-label text-xs inline-block mb-2 text-gray-700"
                  onClick="check_here()">Select a form</label
                >

                <select
                df-data-team
                 class="form-select block w-full p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >` +
            forms +
            `</select>

                </div>

                 <div class="mb-2 mt-3 my-2 box">
                  <div>


  </div>`;
          editor.value.addNode(
            "StepNode",
            1,
            1,
            pos_x,
            pos_y,
            "StepNode",
            {
              data: {
                name: "",
                description: "",
                team: "",
                form: "",
              },
            },
            stepNode
          );
          break;
        }

        case "Stop": {
          var stop = ` <div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3"
  >
    <h3 class="font-semibold">HANG UP</h3>
  </div>`;

          editor.value.addNode(
            "Stop",
            1,
            0,
            pos_x,
            pos_y,
            "Stop",
            {
              data: {},
            },
            stop
          );
          break;
        }
        default:
      }
    }

    //OnMounted function
    onMounted(() => {
      var currentChatBot = {};
      var draw_flow = { drawflow: {} };

      draw_flow.drawflow.Home = {};
      var elements = document.getElementsByClassName("drag-drawflow");
      for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("touchend", drop, false);
        elements[i].addEventListener("touchmove", positionMobile, false);
        elements[i].addEventListener("touchstart", drag, false);
      }
      const id = document.getElementById("drawflow");
      editor.value = new Drawflow(
        id,
        Vue,
        internalInstance.appContext.app._context
      );
      editor.value.start();
      editor.value.registerNode("Node1", StepNode, {}, {});

      editor.value.registerNode("Node5", StartNode, {}, {});
      editor.value.registerNode("Node6", StopNode, {}, {});
      // var new_data = { drawflow: "" };
      // new_data.drawflow = currentChatBot;
      console.log("current chat bot", currentChatBot);
      draw_flow.drawflow.Home.data = {};
      editor.value.import(draw_flow);

      // window.location.reload();
    });
    return {
      exportEditor,
      drag,
      drop,
      allowDrop,
      dialogVisible,
      dialogData,
      addNodeToDrawFlow,
    };
  },
  components: {
    StepNode,
    StartNode,
    StopNode,
  },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e8e6e6;
}
.container {
  min-height: calc(100vh - 100px);
}
.column {
  border-right: 1px solid #e8e6e6;
}
.column ul {
  padding-inline-start: 0px;
  padding: 10px 10px;
}
.column li {
  background: transparent;
}

.node {
  border-radius: 3px;
  border: 2px solid #e8e6e6;
  display: block;
  padding: 5px;
  margin: 10px 0px;
  cursor: move;
}
#drawflow {
  height: 100%;
  text-align: initial;
}
.drawflow .connection .point {
  stroke: var(--border-color);
  stroke-width: 2;
  fill: white;
  transform: translate(-9999px, -9999px);
}
.t-tooltip:hover .t-box {
  display: block;
}
</style>
