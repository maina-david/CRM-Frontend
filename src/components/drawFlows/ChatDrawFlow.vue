<template>
  <el-container>
    <el-header class="header mt-10">
      <div class="mb-5">
        <h3 class="font-semibold">Create a flow for your Chat</h3>
        <p class="my-3 text-sm">
          Drag an element from the left and create your flow on the right
        </p>
      </div>

      <div class="flex justify justify-between">
        <!-- <p>{{ attachment }}</p> -->
        <!-- <p>selectChatAttachment: {{ selectChatAttachment }}</p>
        <p>selectChatBotFiles: {{ selectChatBotFiles }}</p> -->
        <div>
          <Dropdown
            id="selection"
            select="Select attachment to view"
            label="Attachment:"
            :options="selectChatBotFiles"
            v-model="attachment"
          />
        </div>
        <div class="t-tooltip">
          <span
            class="material-icons text-sm text-gray-400 inline-block align-middle m-2 hover:text-gray-700"
          >
            info
          </span>
          <div
            class="bg-blue-50 hidden t-box shadow-sm rounded-md text-xs p-3 m-3 absolute overflow-hidden"
          >
            Listen to a track before using it on a node
          </div>
        </div>
      </div>
      <div class="mb-5">
        <audio id="player" controls="controls" class="shadow-sm rounded-full">
          <source
            id="mp3_src"
            :src="attachment"
            class="bg-white"
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
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
        <SendTextWaitNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="SendTextWait"
          class="drag-drawflow"
        />
        <SendTextNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="SendText"
          class="drag-drawflow"
        />
        <QueueNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Queue"
          class="drag-drawflow"
          v-model="testQueue"
        />
        <AttachmentNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Attachment"
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

import { getCurrentInstance, h, onMounted, ref, render, shallowRef } from "vue";
/*import Node1 from "@/components/chatNodes/SendTextWaitNode.vue";
import Node2 from "@/components/chatNodes/SendTextNode.vue";
import Node3 from "@/components/chatNodes/WaitNode.vue";
import Node4 from "@/components/chatNodes/QueueNode.vue";*/
import AttachmentNode from "@/components/chatNodes/AttachmentNode.vue";
import QueueNode from "@/components/chatNodes/QueueNode.vue";
import SendTextNode from "@/components/chatNodes/SendTextNode.vue";
import Dropdown from "@/components/Dropdown.vue";
import $ from "jquery";
import SendTextWaitNode from "../chatNodes/SendTextWaitNode.vue";
import StartNode from "../chatNodes/StartNode.vue";
import StopNode from "../chatNodes/StopNode.vue";
import axios from "axios";

export default {
  watch: {
    selectChatBotFiles() {
      console.log("i am updating attachment files", this.selectChatBotFiles);
      this.files = this.selectChatBotFiles;
    },
  },
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
    this.getChatBotFiles();
    this.getQueues();
    this.getChat();
  },
  computed: {
    ...mapGetters([
      "selectChatBotFiles",
      "queues",
      "selectQueues",
      "selectChatAttachment",
    ]),
  },
  methods: {
    ...mapActions(["getChatBotFiles", "getQueues", "getChat", "addIvrFlow"]),
  },
  setup() {
    const baseUrl = process.env.VUE_APP_API_URL;
    var selectedQueues = [];
    get_chat_queues();
    var attachmentFiles = [
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
    ];

    // const listNodes = readonly([]);
    const editor = shallowRef({});

    get_atatchment_files();
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

    function get_atatchment_files() {
      var config = {
        method: "get",
        url: `${baseUrl}chatbot/getChatbotFiles`,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        data: "",
      };
      console.log("data", config.data);

      axios(config)
        .then(function (response) {
          // localStorage.removeItem("ivr_id");
          attachmentFiles = response.data.map((ticket) => {
            return { label: ticket.name, value: ticket.id };
          });
          console.log("here are attachment files", attachmentFiles);
        })
        .catch(function (error) {
          alert(error.response.data.errors[0]);
          console.log(error);
        });
    }

    function get_chat_queues() {
      var config = {
        method: "get",
        url: `${baseUrl}chatQueues`,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        data: "",
      };
      console.log("data", config.data);

      axios(config)
        .then(function (response) {
          // localStorage.removeItem("ivr_id");
          selectedQueues = response.data.map((queue) => {
            return { label: queue.name, value: queue.id };
          });
          console.log("here are queue files", selectedQueues);
        })
        .catch(function (error) {
          alert(error.response.data.errors[0]);
          console.log(error);
        });
    }

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
      var exportdata = {};
      exportdata = dialogData.value;

      exportdata.chatbot_id = localStorage.getItem("chat_flow_id");
      console.log(exportdata);
      var config = {
        method: "post",
        url: `${baseUrl}chatbot/addChatbotFLow`,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

        data: exportdata,
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
        case "SendTextWait": {
          //           var optionsBackground = selectURLs; // eslint-disable-next-line no-unused-vars
          //           var threeBackground = "";

          //           // eslint-disable-next-line no-unused-vars
          //           var background_two = optionsBackground.forEach((option) => {
          //             threeBackground =
          //               threeBackground +
          //               ` <option
          //  value = ${option.value}>${option.label}
          //  </option>`;
          //           });
          var sendtextwait = `<div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2 box"
  >
    <h3 class="font-semibold text-xs">Send Some Text and wait</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Name  </label
      >
      <input
        type="text"
        placeholder="Name"
        df-data-name
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>

      <div class="mb-2 mt-3 my-2 box">
       <div>
        <label
          for="textBox"
          class="form-label text-xs inline-block text-gray-700"
          >Select configuration prompt</label
        >
      </div>
       <select
        id="selection"
        df-data-configurationprompt
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">- Select Prompt -</option>
        <option value="1">1</option>
        <option value="2">2</option>
         <option value="3">3</option>
        <option value="4">4</option>
         <option value="5">5</option>
        <option value="6">6</option>
         <option value="7">7</option>
        <option value="8">8</option>
         <option value="9">9</option>
        <option value="#">#</option>
         <option value="*">*</option>
        <option value="t">Time out</option>
         <option value="i">Invalid</option>
      </select>
    </div>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter Text </label
      >
      <textarea
        rows="10"
        placeholder="Enter Text"
        df-data-send_text_wait
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
  </div>`;
          editor.value.addNode(
            "Enter Text",
            1,
            1,
            pos_x,
            pos_y,
            "SendTextWait",
            {
              data: { name: "", send_text_wait: "", configurationprompt: "" },
            },
            sendtextwait
          );
          break;
        }

        //SendText Node
        case "SendText": {
          // var optionsPlayback = selectURLs; // eslint-disable-next-line no-unused-vars
          // var threePlayback = "";

          // eslint-disable-next-line no-unused-vars
          //           var playback_two = optionsPlayback.forEach((option) => {
          //             threePlayback =
          //               threePlayback +
          //               ` <option
          //  value = ${option.value}>${option.label}
          //  </option>`;
          //           });
          var sendtext = `<div
    class="relative bg-white rounded-sm text-left shadow-sm p-3 m-2"
  >
    <h3 class="font-semibold text-xs">SEND SOME TEXT</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Name of component</label
      >
      <input
        type="text"
        placeholder="Component name"
        df-data-name
        class="form-control  w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>

     <div class="mb-2 mt-3 my-2 box">
        <div>
        <label
          for="textBox"
          class="form-label text-xs inline-block text-gray-700"
          >Select configuration prompt</label
        >
      </div>
       <select
        id="selection"
        df-data-configurationprompt
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">- Select Prompt -</option>
        <option value="1">1</option>
        <option value="2">2</option>
         <option value="3">3</option>
        <option value="4">4</option>
         <option value="5">5</option>
        <option value="6">6</option>
         <option value="7">7</option>
        <option value="8">8</option>
         <option value="9">9</option>
        <option value="#">#</option>
         <option value="*">*</option>
        <option value="t">Time out</option>
         <option value="i">Invalid</option>
      </select>
    </div>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter Text</label
      >
      <textarea
        placeholder="Enter Text"
        rows="10"
        df-data-output_text
        class="form-control  w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>


  </div>`;
          editor.value.addNode(
            "Send Text",
            1,
            1,
            pos_x,
            pos_y,
            "SendText",
            { data: { name: "", output_text: "", configurationprompt: "" } },
            sendtext
          );
          break;
        }

        //Attachment Node
        case "Attachment": {
          var options_files = attachmentFiles;
          // eslint-disable-next-line no-unused-vars
          var three_files = "";
          // eslint-disable-next-line no-unused-vars
          var attachment_two = options_files.forEach((option) => {
            three_files =
              three_files +
              `<option
 value = ${option.value}>${option.label}</option>`;
          });
          var attachment =
            `<div
    class="relative bg-white rounded-sm text-left shadow-sm p-3 m-2"
  >
    <h3 class="font-semibold text-xs">ATTACHMENT</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Name of attachment</label
      >
      <input
        type="text"
        placeholder="Attachment name"
        df-data-name
        class="form-control  w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>

     <div class="mb-2 mt-3 my-2 box">
        <div>
        <label
          for="textBox"
          class="form-label text-xs inline-block text-gray-700"
          >Select configuration prompt</label
        >
      </div>
       <select
        id="selection"
        df-data-configurationprompt
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">- Select Prompt -</option>
        <option value="1">1</option>
        <option value="2">2</option>
         <option value="3">3</option>
        <option value="4">4</option>
         <option value="5">5</option>
        <option value="6">6</option>
         <option value="7">7</option>
        <option value="8">8</option>
         <option value="9">9</option>
        <option value="#">#</option>
         <option value="*">*</option>
        <option value="t">Time out</option>
         <option value="i">Invalid</option>
      </select>
    </div>

    <div class="mt-3">
               <label
                  class="form-label text-xs inline-block mb-2 text-gray-700"
                  onClick="check_here()">Select an attachment</label
                >

                <select
                df-data-attachedFiles
                 class="form-select block w-full p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >` +
            three_files +
            `</select>

                </div>

                 <div class="mb-2 mt-3 my-2 box">
                  <div>


  </div>`;
          editor.value.addNode(
            "Attachment",
            1,
            1,
            pos_x,
            pos_y,
            "Attachment",
            { data: { name: "", output_text: "", configurationprompt: "" } },
            attachment
          );
          break;
        }

        case "Queue": {
          // eslint-disable-next-line no-unused-vars
          //var myOption = "";

          var options = selectedQueues;
          // eslint-disable-next-line no-unused-vars
          var three = "";
          // eslint-disable-next-line no-unused-vars
          var queue_two = options.forEach((option) => {
            three =
              three +
              ` <option
 value = ${option.value}>${option.label}</option>`;
          });
          var queue =
            `<div
              class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2"
            >
              <h3 class="font-semibold text-xs">Go to Queue</h3>

             <div class="mb-2 mt-3 my-2">
               <label
                 class="form-label text-xs inline-block my-2 text-gray-700"
                 >Name of the queue</label
               >
               <input
                   type="text"
                   placeholder="Queue name"
                df-data-name
                 class="form-control w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                />
             </div>
          <div class="mt-3">
               <label
                  class="form-label text-xs inline-block mb-2 text-gray-700"
                  onClick="check_here()">Select a queue</label
                >

                <select
                df-data-selectedqueue
                 class="form-select block w-full p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >` +
            three +
            `</select>

                </div>

                 <div class="mb-2 mt-3 my-2 box">
                  <div>
        <label
          for="textBox"
          class="form-label text-xs inline-block text-gray-700"
          >Select configuration prompt</label
        >
      </div>
       <select
        id="selection"
        df-data-configurationprompt
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="">- Select Prompt -</option>
        <option value="1">1</option>
        <option value="2">2</option>
         <option value="3">3</option>
        <option value="4">4</option>
         <option value="5">5</option>
        <option value="6">6</option>
         <option value="7">7</option>
        <option value="8">8</option>
         <option value="9">9</option>
        <option value="#">#</option>
         <option value="*">*</option>
        <option value="t">Time out</option>
         <option value="i">Invalid</option>
      </select>
    </div>
                </div>`;
          editor.value.addNode(
            "Queue",
            1,
            1,
            pos_x,
            pos_y,
            "Queue",
            { data: { name: "", selectedqueue: "", configurationprompt: "" } },
            queue
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
      const baseUrl = process.env.VUE_APP_API_URL;
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
      editor.value.registerNode("Node1", SendTextWaitNode, {}, {});
      editor.value.registerNode("Node2", SendTextNode, {}, {});
      editor.value.registerNode("Node3", QueueNode, {}, {});
      editor.value.registerNode("Node3", AttachmentNode, {}, {});
      editor.value.registerNode("Node5", StartNode, {}, {});
      editor.value.registerNode("Node6", StopNode, {}, {});
      // var new_data = { drawflow: "" };
      // new_data.drawflow = currentChatBot;
      console.log("current chat bot", currentChatBot);
      draw_flow.drawflow.Home.data = {};
      editor.value.import(draw_flow);
      get_draw_flow_ui();
      // window.location.reload();
      function get_draw_flow_ui() {
        var send_data = { chatbot_id: localStorage.getItem("chat_flow_id") };
        var config = {
          method: "post",
          url: `${baseUrl}chatbot/getChatBotJSON`,
          headers: {
            "Content-Type": "application/json",
            "x-requested-with": "XMLHttpRequest",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },

          data: send_data,
        };
        console.log("data", config.data);

        axios(config)
          .then(function (response) {
            draw_flow.drawflow.Home.data = JSON.parse(
              response.data[0].ui_data
            ).Home.data;
            editor.value.import(draw_flow);
            console.log(response.data);
            // localStorage.removeItem("ivr_id");
          })
          .catch(function (error) {
            alert(error.response.data.errors[0]);
            console.log(error);
          });
      }
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
    SendTextWaitNode,
    QueueNode,
    SendTextNode,
    StartNode,
    AttachmentNode,
    StopNode,
    Dropdown,
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
