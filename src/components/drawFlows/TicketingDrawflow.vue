<template>
  <el-container>
    <el-header class="header mt-10">
      <div class="mb-5">
        <h3 class="font-semibold">
          Create a flow for {{ currentTicketForm.name }}
        </h3>
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
        <TextFieldTextNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="TextField"
          class="drag-drawflow"
        />
        <TextArea
          draggable="true"
          @dragstart="drag($event)"
          data-node="TextArea"
          class="drag-drawflow"
        />
        <NumberField
          draggable="true"
          @dragstart="drag($event)"
          data-node="Number"
          class="drag-drawflow"
        />
        <CheckboxTextNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Checkbox"
          class="drag-drawflow"
        />
        <RadioButtonTextNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Radio"
          class="drag-drawflow"
        />
        <DropdownTextNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Dropdown"
          class="drag-drawflow"
        />
        <FileUpload
          draggable="true"
          @dragstart="drag($event)"
          data-node="FileUpload"
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
import { inject } from "vue";

// eslint-disable-next-line no-unused-vars
import styleDrawflow from "drawflow/dist/drawflow.min.css";
// eslint-disable-next-line no-unused-vars
import style from "@/assets/style.css";

import { onMounted, shallowRef, h, getCurrentInstance, render, ref } from "vue";
import StartNode from "@/components/chatNodes/StartNode.vue";
import StopNode from "@/components/nodes/TicketingNodes/Stop.vue";
import TextFieldTextNode from "@/components/nodes/TicketingNodes/TextFieldTextNode.vue";
import TextArea from "@/components/nodes/TicketingNodes/TextArea.vue";
import NumberField from "@/components/nodes/TicketingNodes/NumberField.vue";
import RadioButton from "@/components/nodes/TicketingNodes/RadioButton.vue";
import RadioButtonTextNode from "@/components/nodes/TicketingNodes/RadioButtonTextNode.vue";
import Dropdown from "@/components/nodes/TicketingNodes/Dropdown.vue";
import DropdownTextNode from "@/components/nodes/TicketingNodes/DropdownTextNode.vue";
import FileUpload from "@/components/nodes/TicketingNodes/FileUpload.vue";
import Checkbox from "@/components/nodes/TicketingNodes/Checkbox.vue";
import CheckboxTextNode from "@/components/nodes/TicketingNodes/CheckboxTextNode.vue";
import axios from "axios";

export default {
  name: "DrawFlow",
  data() {
    return {
      json_data: {},
    };
  },
  components: {
    StartNode,
    StopNode,
    TextFieldTextNode,
    TextArea,
    NumberField,
    RadioButtonTextNode,
    FileUpload,
    CheckboxTextNode,
    DropdownTextNode,
  },
  created() {
    this.currentTicketForm = JSON.parse(localStorage.getItem("ticket_form"));
  },
  methods: {
    handleOptions(options) {
      console.log(options);
      return options;
    },
  },
  setup() {
    const baseUrl = process.env.VUE_APP_API_URL;
    /*var count = 0;
    var val = "";*/
    var allOptions = [];
    // const listNodes = readonly([]);
    const editor = shallowRef({});
    var countId = 1;
    const dialogVisible = ref(false);
    const dialogData = ref({});
    // eslint-disable-next-line no-unused-vars
    var myId = ref("");
    // eslint-disable-next-line no-unused-vars
    var nodeId = ref("");
    const Vue = { version: 3, h, render };
    const internalInstance = getCurrentInstance();
    editor.value.reroute = true;
    internalInstance.appContext.app._context.config.globalProperties.$df =
      editor;

    const showModal = ref(false);

    //Function to export data
    function exportEditor() {
      dialogData.value = editor.value.export();
      var draw_flow = dialogData.value;
      console.log(JSON.stringify(draw_flow));
      var currentTicketFormID = JSON.parse(localStorage.getItem("ticket_form"));
      draw_flow.ticket_form_id = currentTicketFormID.id;
      var config = {
        method: "post",
        url: `${baseUrl}tickets/add_items_to_ticket_form`,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        data: draw_flow,
      };
      console.log("data", config.data);

      axios(config)
        .then(function (response) {
          console.log(response.data);
          // localStorage.removeItem("ivr_id");
        })
        .catch(function (error) {
          alert(error.response.data.errors[0]);
          console.log(error);
        });
    }

    function increaseCount() {
      return countId++;
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
              data: { data_type: "start" },
            },
            start
          );
          break;
        }
        case "TextField": {
          var textField = `<div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2 box"
  >
    <h3 class="font-semibold text-xs">Text Field</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter the label</label
      >
      <input
        type="text"
        placeholder="Label"
        df-data-label
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter the placeholder</label
      >
      <input
        type="text"
        placeholder="Placeholder""
        df-data-placeholder
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
       <div>
      <label for="selection" class="text-xs">Select a parent</label>
      <select
        id="selection_node${countId}"
        df-data-selectednode
        value="df-data-selectednode"
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      >
            </select>


    </div>

  </div>`;
          editor.value.addNode(
            "Text Field",
            1,
            1,
            pos_x,
            pos_y,
            "TextField",
            {
              data: {
                label: "",
                placeholder: "",
                data_type: "text",
                selectednode: "",
                countId: countId,
              },
            },
            textField
          );
          break;
        }

        case "TextArea": {
          var textArea = `<div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2 box"
  >
    <h3 class="font-semibold text-xs">Text Area</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter the label</label
      >
      <input
        type="text"
        placeholder="Label"
        df-data-label
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter the placeholder</label
      >
      <input
        type="text"
        placeholder="Placeholder""
        df-data-placeholder
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
 <div>
      <label for="selection" class="text-xs">Select a parent</label>
      <select
        id="selection_node${countId}"
        df-data-selectednode
        value="df-data-selectednode"
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      >
            </select>


    </div>
  </div>`;
          editor.value.addNode(
            "Text Area",
            1,
            1,
            pos_x,
            pos_y,
            "TextArea",
            {
              data: {
                label: "",
                placeholder: "",
                data_type: "textarea",
                selectednode: "",
                countId: countId,
              },
            },
            textArea
          );
          break;
        }
        case "Number": {
          var numberField = `<div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2 box"
  >
    <h3 class="font-semibold text-xs">Number</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter the label</label
      >
      <input
        type="text"
        placeholder="Label"
        df-data-label
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter the placeholder</label
      >
      <input
        type="text"
        placeholder="Placeholder""
        df-data-placeholder
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
 <div>
      <label for="selection" class="text-xs">Select a parent</label>
      <select
        id="selection_node${countId}"
        df-data-selectednode
        value="df-data-selectednode"
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      >
            </select>


    </div>
  </div>`;
          editor.value.addNode(
            "Number",
            1,
            1,
            pos_x,
            pos_y,
            "Number",
            {
              data: {
                label: "",
                placeholder: "",
                data_type: "number",
                selectednode: "",
                countId: countId,
              },
            },
            numberField
          );
          break;
        }
        case "FileUpload": {
          var fileUpload = `<div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2 box"
  >
    <h3 class="font-semibold text-xs">File Upload</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter the label</label
      >
      <input
        type="text"
        placeholder="Label"
        df-data-label
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
 <div>
      <label for="selection" class="text-xs">Select a parent</label>
      <select
        id="selection_node${countId}"
        df-data-selectednode
        value="df-data-selectednode"
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      >
            </select>


    </div>
  </div>`;
          editor.value.addNode(
            "File Upload",
            1,
            1,
            pos_x,
            pos_y,
            "FileUpload",
            {
              data: {
                label: "",
                placeholder: "",
                data_type: "file",
                selectednode: "",
                countId: countId,
              },
            },
            fileUpload
          );
          break;
        }
        case "Radio": {
          editor.value.addNode(
            "Radio",
            1,
            1,
            pos_x,
            pos_y,
            "Radio",
            {
              label: "",
              data_type: "radio",
              options: [],
              countId: countId,
            },
            "Node5",
            "vue"
          );
          break;
        }
        case "Dropdown": {
          editor.value.addNode(
            "Dropdown",
            1,
            1,
            pos_x,
            pos_y,
            "Dropdown",
            {
              label: "",
              data_type: "dropdown",
              options: [],
              countId: countId,
            },
            "Node6",
            "vue"
          );
          break;
        }
        case "Checkbox": {
          editor.value.addNode(
            "Checkbox",
            1,
            1,
            pos_x,
            pos_y,
            "Checkbox",
            {
              label: "",
              data_type: "checkbox",
              options: [],
            },
            "Node7",
            "vue"
          );
          break;
        }
        case "Stop": {
          var stop = ` <div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3"
  >
    <h3 class="font-semibold">STOP</h3>
  </div>`;

          editor.value.addNode(
            "Stop",
            1,
            0,
            pos_x,
            pos_y,
            "Stop",
            {
              data: { data_type: "stop" },
            },
            stop
          );
          break;
        }
        default:
      }
    }

    const emitter = inject("emitter");
    emitter.on("myevent", (value) => {
      console.log("Event Received", `value:${value}`);
      console.log("My value" + JSON.stringify(value));
      console.log(editor.value.export());
      editor.value.updateNodeDataFromId(myId, {
        data: value,
        countId,
      });

      var allMyOptions = [];
      var Options = [];
      value.options.forEach((val) => {
        allMyOptions.push(val);
      });
      if (editor.value.getNodeFromId(myId).outputs.output_1.connections[0]) {
        var input_id =
          editor.value.getNodeFromId(myId).outputs.output_1.connections[0].node;
        Options.push({ input_id, allMyOptions });

        emitter.emit("allMyOptions", Options);
      }
      console.log(editor.value.export());
    });
    emitter.on("checkboxOptions", (value) => {
      console.log("Event Received", `value:${value}`);
      console.log("My value" + value);
      console.log(editor.value.export());
      editor.value.updateNodeDataFromId(myId, {
        data: value,
        countId,
      });
      var allMyOptions = [];
      var Options = [];
      value.options.forEach((val) => {
        allMyOptions.push(val);
      });
      if (editor.value.getNodeFromId(myId).outputs.output_1.connections[0]) {
        var input_id =
          editor.value.getNodeFromId(myId).outputs.output_1.connections[0].node;
        Options.push({ input_id, allMyOptions });

        emitter.emit("allMyOptions", Options);
      }
      console.log(editor.value.export());
      console.log(editor.value.export());
    });
    emitter.on("radioOptions", (value) => {
      console.log("Event Received", `value:${value}`);
      console.log("My value" + JSON.stringify(value));
      console.log(editor.value.export());
      editor.value.updateNodeDataFromId(myId, {
        data: value,
        countId,
      });
      console.log(editor.value.export());
    });

    // eslint-disable-next-line no-unused-vars
    function getParentNodeData(id) {
      // if (editor.value.getNodeFromId(id).data)
      if (
        editor.value.getNodeFromId(id).data.data.data_type == "dropdown" ||
        editor.value.getNodeFromId(id).data.data.data_type == "radio"
      ) {
        allOptions = Object.values(
          editor.value.getNodeFromId(id).data.data.options
        );
      }

      return allOptions;
    }
    //OnMounted function
    onMounted(() => {
      var initial_data = {};
      setTimeout(function () {
        get_form_data();
      }, 5000);

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
      const props = { options: [], label: "Label 1", countId: countId };
      editor.value.start();
      editor.value.registerNode("Node1", TextFieldTextNode, {}, {});
      editor.value.registerNode("Node2", TextArea, {}, {});
      editor.value.registerNode("Node3", NumberField, {}, {});
      editor.value.registerNode("Node4", FileUpload, {}, {});
      editor.value.registerNode("Node5", RadioButton, props, {});
      editor.value.registerNode("Node6", Dropdown, props, {});
      editor.value.registerNode("Node7", Checkbox, {}, {});

      editor.value.registerNode("Node8", StartNode, {}, {});
      editor.value.registerNode("Node9", StopNode, {}, {});

      editor.value.on("nodeCreated", function (id) {
        console.log(id);
        increaseCount();
        console.log("increaseCount");
      });

      editor.value.on("connectionCreated", function (output_id) {
        console.log("OUTPUT ID" + JSON.stringify(output_id));
        var outputId = output_id.output_id;
        var input_id = output_id.input_id;
        var cId = 0;
        var allMyOptions = [];
        var Options = [];
        if (
          editor.value.getNodeFromId(input_id).data.data.data_type !== "stop"
        ) {
          if (
            editor.value.getNodeFromId(input_id).data.data.data_type ===
              "radio" ||
            editor.value.getNodeFromId(input_id).data.data.data_type ===
              "dropdown"
          ) {
            cId = editor.value.getNodeFromId(input_id).data.countId;
          } else {
            cId = editor.value.getNodeFromId(input_id).data.data.countId;
          }
          emitter.emit("theCountId", cId);

          if (
            (editor.value.getNodeFromId(outputId).data.data.data_type ===
              "dropdown" ||
              editor.value.getNodeFromId(outputId).data.data.data_type ===
                "radio") &&
            (editor.value.getNodeFromId(input_id).data.data.data_type ===
              "dropdown" ||
              editor.value.getNodeFromId(input_id).data.data.data_type ===
                "radio" ||
              editor.value.getNodeFromId(input_id).data.data.data_type ===
                "checkbox")
          ) {
            editor.value
              .getNodeFromId(outputId)
              .data.data.options.forEach((opt) => {
                allMyOptions.push(opt);

                //allOptions.push(opt);
                /*   allMyOptions.length = 0;
              Options.length = 0;*/
              });
            Options.push({ input_id, allMyOptions });
            emitter.emit("allMyOptions", Options);
            console.log("Options" + JSON.stringify(Options));
            console.log("All Options" + allMyOptions);

            console.log("TWO CONSECUTIVE RADIOS HERE!!!!!!!!!");
          } else {
            console.log(
              "CHEKI" +
                JSON.stringify(editor.value.getNodeFromId(outputId).data.data)
            );
            console.log(
              "LOOOK" + JSON.stringify(editor.value.getNodeFromId(input_id))
            );
            if (
              editor.value.getNodeFromId(outputId).data.data.data_type ===
                "radio" ||
              editor.value.getNodeFromId(outputId).data.data.data_type ===
                "dropdown"
            ) {
              editor.value
                .getNodeFromId(outputId)
                .data.data.options.forEach((opt) => {
                  var x = document.getElementById("selection_node" + cId);
                  console.log("Get X" + x);
                  var option = document.createElement("option");
                  if (opt != null) {
                    option.text = opt;
                    x.add(option);
                    //allOptions.push(opt);
                  }
                });
            }
            console.log("CID" + cId);
            console.log("Options" + allMyOptions);
          }
        }
      });

      editor.value.on("nodeSelected", function (id) {
        console.log("Node selected " + id);
        myId = id;
        var cId = 0;

        if (
          editor.value.getNodeFromId(id).data.data.data_type === "stop" ||
          editor.value.getNodeFromId(id).data.data.data_type === "start"
        ) {
          console.log("STARTED");
        } else {
          const nodeData = editor.value.getNodeFromId(id);
          if (nodeData.inputs.input_1.connections[0]) {
            console.log("CHECK HERE" + JSON.stringify(nodeData));
            nodeId.value = nodeData.inputs.input_1.connections[0].node;
            if (
              editor.value.getNodeFromId(id).data.data.data_type ===
                "dropdown" ||
              editor.value.getNodeFromId(id).data.data.data_type === "radio"
            ) {
              cId = editor.value.getNodeFromId(id).data.countId;
            } else {
              cId = editor.value.getNodeFromId(id).data.data.countId;
            }
            console.log("Node Selected CID" + cId);

            if (
              (editor.value.getNodeFromId(nodeId.value).data.data.data_type ===
                "dropdown" ||
                editor.value.getNodeFromId(nodeId.value).data.data.data_type ===
                  "radio") &&
              (editor.value.getNodeFromId(id).data.data.data_type ===
                "dropdown" ||
                editor.value.getNodeFromId(id).data.data.data_type ===
                  "radio" ||
                editor.value.getNodeFromId(id).data.data.data_type ===
                  "checkbox")
            ) {
              console.log("TWO CONSECUTIVE RADIOS HERE!!!!!!!!!");
            } else {
              if (
                (editor.value.getNodeFromId(nodeId.value).data.data
                  .data_type === "radio" ||
                  editor.value.getNodeFromId(nodeId.value).data.data
                    .data_type === "dropdown") &&
                editor.value.getNodeFromId(id).data.data.data_type !== "stop"
              ) {
                console.log(
                  "SEE Options" +
                    editor.value.getNodeFromId(nodeId.value).data.data.options
                );
                document.getElementById("selection_node" + cId).innerHTML = "";
                editor.value
                  .getNodeFromId(nodeId.value)
                  .data.data.options.forEach((opt) => {
                    var x = document.getElementById("selection_node" + cId);
                    var option = document.createElement("option");
                    if (opt != null) {
                      option.text = opt;
                      x.add(option);
                      //allOptions.push(opt);
                    }
                  });
              }
            }
          }
        }
      });

      //editor.value.updateNodeDataFromId();
      // var new_data = { drawflow: "" };
      // new_data.drawflow = currentIvr;
      // console.log("current ivr", currentIvr);
      //  if (!response.data) {
      /* editor.value.on("nodeSelected", function (id) {
        console.log("Node selected " + id);
        // eslint-disable-next-line no-const-assign
      });*/
      draw_flow.drawflow.Home.data = {};
      draw_flow = {
        drawflow: {
          Home: {
            data: {},
          },
        },
      };

      function get_form_data() {
        var currentTicketFormID = JSON.parse(
          localStorage.getItem("ticket_form")
        );
        var ticket_form_id = currentTicketFormID.id;
        var config = {
          method: "get",
          url:
            `${baseUrl}tickets/get_ticket_form_json?ticket_form_id=` +
            ticket_form_id,
          headers: {
            "Content-Type": "application/json",
            "x-requested-with": "XMLHttpRequest",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },

          data: {},
        };
        console.log("data", config.data);

        axios(config)
          .then((response) => {
            initial_data = response.data;
            draw_flow.drawflow = JSON.parse(initial_data.json_ui);
            console.log(draw_flow);
            editor.value.import(draw_flow);

            // localStorage.removeItem("ivr_id");
          })
          .catch((error) => {
            alert(error.response.data.errors[0]);
            console.log(error);
          });
      }

      // console.log("first log", draw_flow);

      /* } else {
              console.log("test_log", draw_flow);
              currentIvr = JSON.parse(response.data.ui_data);
              draw_flow.drawflow = currentIvr;
              console.log("first log", draw_flow);
              editor.value.import(draw_flow);
            }*/
      // window.location.reload();
    });
    return {
      exportEditor,
      drag,
      drop,
      allowDrop,
      dialogVisible,
      dialogData,
      showModal,
      addNodeToDrawFlow,
    };
  },
  /* created() {
    this.emitter.on("optionsEvent", (evt) => {
      this.options = evt.options;
      console.log(this.options);
    });
  },*/
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
