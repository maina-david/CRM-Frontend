<template>
  <el-container>
    <el-header class="header mt-10">
      <div class="mb-5">
        <h3 class="font-semibold">Create a flow for your IVR</h3>
        <p class="my-3 text-sm">
          Drag an element from the left and create your flow on the right
        </p>
      </div>

      <div class="flex justify justify-between">
        <div>
          <Dropdown
            id="selection"
            select="Select track to listen to"
            label="Listen to:"
            :options="selectIvrAudios"
            v-model="musicTrack"
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
            :src="musicTrack"
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
        <BackgroundNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Background"
          class="drag-drawflow"
        />
        <PlayBackNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="PlayBack"
          class="drag-drawflow"
        />
        <QueueNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Queue"
          class="drag-drawflow"
          v-model="testQueue"
        />
        <WaitNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="Wait"
          class="drag-drawflow"
        />
        <SendSMSNode
          draggable="true"
          @dragstart="drag($event)"
          data-node="SendSMS"
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

<script>
import Drawflow from "drawflow";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;

// eslint-disable-next-line no-unused-vars
import styleDrawflow from "drawflow/dist/drawflow.min.css";
// eslint-disable-next-line no-unused-vars
import style from "@/assets/style.css";

import { onMounted, shallowRef, h, getCurrentInstance, render, ref } from "vue";
/*import Node1 from "@/components/nodes/BackgroundNode.vue";
import Node2 from "@/components/nodes/PlayBackNode.vue";
import Node3 from "@/components/nodes/WaitNode.vue";
import Node4 from "@/components/nodes/QueueNode.vue";*/
import BackgroundNode from "../nodes/BackgroundNode.vue";
import QueueNode from "@/components/nodes/QueueNode.vue";
import WaitNode from "@/components/nodes/WaitNode.vue";
import PlayBackNode from "@/components/nodes/PlayBackNode.vue";
import StartNode from "../nodes/StartNode.vue";
import StopNode from "../nodes/StopNode.vue";
import Dropdown from "../Dropdown.vue";
import $ from "jquery";
import SendSMSNode from "../nodes/SendSMSNode.vue";

export default {
  name: "DrawFlow",
  data() {
    return {
      testQueue: "",
      musicTrack: "",
    };
  },

  setup() {
    var selectedQueues = [];
    var selectURLs = [];
    get_ivr_urls();
    get_queues();
    // const listNodes = readonly([]);
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

    function change(musicTrack) {
      var audio = document.getElementById("player");
      var source = document.getElementById("mp3_src");

      audio.pause();
      console.log("Got it");

      source.src = musicTrack;
      audio.load();
      audio.play();
    }

    //Function to export data
    function exportEditor() {
      dialogData.value = editor.value.export();
      var draw_flow = dialogData.value;
      console.log(draw_flow);
      var ivr_id = localStorage.getItem("ivr_id");

      var config = {
        method: "post",
        url: `${baseUrl}ivr/add_ivr_flow`,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          ivr_id: ivr_id,
          drawflow: draw_flow.drawflow,
        },
      };
      console.log("add ivr flow config", config);
      console.log("add ivr id", ivr_id);

      axios(config)
        .then(function (response) {
          console.log(response.data);
          localStorage.removeItem("ivr_id");
        })
        .catch(function (error) {
          alert(error.response.data.errors[0]);
          console.log(error);
        });
    }

    function get_ivr_urls() {
      var config = {
        method: "get",
        url: `${baseUrl}ivr/get_ivr_files`,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {},
      };

      axios(config)
        .then(function (response) {
          selectURLs = response.data.map((audio) => {
            return { label: audio.name, value: audio.file_url };
          });
          console.log(selectURLs);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    function get_queues() {
      var config = {
        method: "get",
        url: `${baseUrl}queue/get_all_queues`,
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {},
      };

      axios(config)
        .then(function (response) {
          selectedQueues = response.data.map((queue) => {
            return { label: queue.name, value: queue.id };
          });
          console.log(selectedQueues);
        })
        .catch(function (error) {
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
        case "Background": {
          var optionsBackground = selectURLs; // eslint-disable-next-line no-unused-vars
          var threeBackground = "";

          // eslint-disable-next-line no-unused-vars
          var background_two = optionsBackground.forEach((option) => {
            threeBackground =
              threeBackground +
              ` <option
 value = ${option.value}>${option.label}
 </option>`;
          });
          var background =
            `<div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2 box"
  >
    <h3 class="font-semibold text-xs">Play something and wait</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Name of the background </label
      >
      <input
        type="text"
        placeholder="Name"
        df-data-name
        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>


     <div>
      <label for="selection" class="text-xs">Select a track</label>
      <select
        id="selection"
        df-data-audio_url
        value="df-data-audio_url"
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      > ` +
            threeBackground +
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
            "Play Something and Wait",
            1,
            1,
            pos_x,
            pos_y,
            "Background",
            {
              data: { name: "", audio_url: "", configurationprompt: "" },
            },
            background
          );
          break;
        }

        //PlayBack Node
        case "PlayBack": {
          var optionsPlayback = selectURLs; // eslint-disable-next-line no-unused-vars
          var threePlayback = "";

          // eslint-disable-next-line no-unused-vars
          var playback_two = optionsPlayback.forEach((option) => {
            threePlayback =
              threePlayback +
              ` <option
 value = ${option.value}>${option.label}
 </option>`;
          });
          var playback =
            `<div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2"
  >
    <h3 class="font-semibold text-xs">Play something</h3>

    <div class="mb-2 mt-3 my-2 box">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Name of the playback</label
      >
      <input
        type="text"
        placeholder="Play Back name"
        df-data-name
        class="form-control  w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
     <div>
      <label for="selection" class="text-xs">Select a track</label>
      <select
        id="selection"
        df-data-audio_url
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >` +
            threePlayback +
            `
      </select>
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
            "Play Something",
            1,
            1,
            pos_x,
            pos_y,
            "PlayBack",
            { data: { name: "", audio_url: "", configurationprompt: "" } },
            playback
          );
          break;
        }

        //Wait Node
        case "Wait": {
          var wait = `  <div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2"
  >
    <h3 class="font-semibold text-xs">Wait</h3>

    <div class="mb-2 mt-3 my-2">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Enter name of the background</label
      >
      <input
        type="text"
        placeholder="Wait Name"
        df-data-name
        class="form-control w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
   <div class="mb-2 w-full">
      <div>
        <label
          for="textBox"
          class="form-label text-xs inline-block text-gray-700"
          >Time in seconds</label
        >
      </div>
      <input
        type="number"
        placeholder="Wait Time"
        df-data-waittime
        class="form-control w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
    <div class="mb-2 my-2 box">
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
            "Wait",
            1,
            1,
            pos_x,
            pos_y,
            "Wait",
            { data: { name: "", waittime: "", configurationprompt: "" } },
            wait
          );
          break;
        }
        //Wait Node
        case "SendSMS": {
          var sendSMS = `  <div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2"
  >
    <h3 class="font-semibold text-xs">Send SMS</h3>

    <div class="mb-2 mt-3 my-2">
      <label
        class="form-label text-xs inline-block my-2 text-gray-700"
        >SMS Name</label
      >
      <input
        type="text"
        placeholder="SMS Name"
        df-data-name
        class="form-control w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

      />
    </div>
   <div class="mb-2 w-full">
      <div>
        <label
          for="textBox"
          class="form-label text-xs inline-block text-gray-700"
          >Enter a message</label
        >
      </div>
     <textarea id="message" rows="4" df-data-message class="block p-2.5 w-full text-xs text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>

    </div>
    <div class="mb-2 my-2 box">
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
            "SendSMS",
            1,
            1,
            pos_x,
            pos_y,
            "SendSMS",
            { data: { name: "", message: "", configurationprompt: "" } },
            sendSMS
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
      var currentIvr = {};
      var draw_flow = { drawflow: {} };
      get_current_ivrs();

      function get_current_ivrs() {
        var ivr_id = localStorage.getItem("ivr_id");
        var config = {
          method: "get",
          url: `${baseUrl}ivr/get_ivr_json?ivr_id=${ivr_id}`,
          headers: {
            "Content-Type": "application/json",
            "x-requested-with": "XMLHttpRequest",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          data: {},
        };

        axios(config)
          .then(function (response) {
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
            editor.value.registerNode("Node1", BackgroundNode, {}, {});
            editor.value.registerNode("Node2", PlayBackNode, {}, {});
            editor.value.registerNode("Node3", QueueNode, {}, {});
            editor.value.registerNode("Node4", WaitNode, {}, {});
            editor.value.registerNode("Node5", StartNode, {}, {});
            editor.value.registerNode("Node6", StopNode, {}, {});
            // var new_data = { drawflow: "" };
            // new_data.drawflow = currentIvr;
            console.log("current ivr", currentIvr);
            if (!response.data) {
              draw_flow.drawflow.Home.data = {};
              editor.value.import(draw_flow);
            } else {
              console.log("test_log", draw_flow);
              currentIvr = JSON.parse(response.data.ui_data);
              draw_flow.drawflow = currentIvr;
              console.log("first log", draw_flow);
              editor.value.import(draw_flow);
            }
            // window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      // var elements = document.getElementsByClassName("drag-drawflow");
      // for (var i = 0; i < elements.length; i++) {
      //   elements[i].addEventListener("touchend", drop, false);
      //   elements[i].addEventListener("touchmove", positionMobile, false);
      //   elements[i].addEventListener("touchstart", drag, false);
      // }
      // const id = document.getElementById("drawflow");
      // editor.value = new Drawflow(
      //   id,
      //   Vue,
      //   internalInstance.appContext.app._context
      // );
      // editor.value.start();
      // editor.value.registerNode("Node1", BackgroundNode, {}, {});
      // editor.value.registerNode("Node2", PlayBackNode, {}, {});
      // editor.value.registerNode("Node3", QueueNode, {}, {});
      // editor.value.registerNode("Node4", WaitNode, {}, {});
      // editor.value.registerNode("Node5", StartNode, {}, {});
      // editor.value.registerNode("Node6", StopNode, {}, {});
      // // var new_data = { drawflow: "" };
      // // new_data.drawflow = currentIvr;
      // console.log("current ivr", currentIvr);
      // get_current_ivrs();
      // editor.value.import(draw_flow);
      // editor.value.import({
      // new_data,
      // Home: {
      //   data: {
      //     1: {
      //       id: 1,
      //       name: "PlayBack",
      //       data: {
      //         data: {
      //           name: "intro",
      //           audio_url:
      //             "https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100220_samsungringtonemp3.mp3",
      //           configurationprompt: "",
      //         },
      //       },
      //       class: "PlayBack",
      //       html: '<div\n    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2"\n  >\n    <h3 class="font-semibold">Play Back</h3>\n\n    <div class="mb-2 border-t my-2 box">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Enter name of the background</label\n      >\n      <input\n        type="text"\n        placeholder="placeholder"\n        df-data-name\n        class="form-control  w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n     <div>\n      <label for="selection">Listen:</label>\n      <select\n        id="selection"\n        df-data-audio_url\n        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n      > <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100204_Iphonedefualt.mp3>Audio File 1\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100220_samsungringtonemp3.mp3>Audio File 2\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100699_cat-dog-31947.mp3>Audio File 3\n </option>\n      </select>\n\n      <audio\n        id="player"\n        class="my-3"\n        controls="controls"\n        style="width: 170px;"\n        @change="change(source.src)"\n      >\n        <source\n          id="mp3_src"\n          src="http://www.culturedub.com/assets/04-Moringa-JahYu-Remix-feat-BaNdula-1.mp3"\n          type="audio/mp3"\n        />\n        Your browser does not support the audio element.\n      </audio>\n    </div>\n\n       <div class="mb-2 border-t my-2 box">\n     <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Add Configuration Prompt</label\n      >\n      <input\n        type="text"\n        placeholder="Configuration Prompt"\n\n        df-data-configurationPrompt\n        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n  </div>',
      //       typenode: false,
      //       inputs: {
      //         input_1: {
      //           connections: [
      //             {
      //               node: "2",
      //               input: "output_1",
      //             },
      //           ],
      //         },
      //       },
      //       outputs: {
      //         output_1: {
      //           connections: [
      //             {
      //               node: "3",
      //               output: "input_1",
      //             },
      //           ],
      //         },
      //       },
      //       pos_x: 313,
      //       pos_y: 19,
      //     },
      //     2: {
      //       id: 2,
      //       name: "Start",
      //       data: {
      //         data: {},
      //       },
      //       class: "Start",
      //       html: ' <div\n    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3"\n  >\n    <h3 class="font-semibold">START</h3>\n  </div>',
      //       typenode: false,
      //       inputs: {},
      //       outputs: {
      //         output_1: {
      //           connections: [
      //             {
      //               node: "1",
      //               output: "input_1",
      //             },
      //           ],
      //         },
      //       },
      //       pos_x: 32,
      //       pos_y: 25,
      //     },
      //     3: {
      //       id: 3,
      //       name: "Background",
      //       data: {
      //         data: {
      //           name: "language selection",
      //           audio_url:
      //             "https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100204_Iphonedefualt.mp3",
      //           configurationPrompt: "",
      //         },
      //       },
      //       class: "Background",
      //       html: '<div\n    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2 box"\n  >\n    <h3 class="font-semibold">Background</h3>\n\n    <div class="mb-2 border-t my-2 box">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Enter name of the background here</label\n      >\n      <input\n        type="text"\n        placeholder="placeholder"\n        df-data-name\n        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n\n\n    <div>\n      <label for="selection">Listen:</label>\n      <select\n        id="selection"\n        df-data-audio_url\n        value="df-data-audio_url"\n        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n      \n      >  <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100204_Iphonedefualt.mp3>Audio File 1\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100220_samsungringtonemp3.mp3>Audio File 2\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100699_cat-dog-31947.mp3>Audio File 3\n </option></select>\n\n     \n    </div>\n      <div class="mb-2 border-t my-2 box">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Add Configuration Prompt</label\n      >\n      <input\n        type="text"\n        placeholder="Configuration Prompt"\n\n        df-data-configurationPrompt\n        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n  </div>',
      //       typenode: false,
      //       inputs: {
      //         input_1: {
      //           connections: [
      //             {
      //               node: "1",
      //               input: "output_1",
      //             },
      //           ],
      //         },
      //       },
      //       outputs: {
      //         output_1: {
      //           connections: [
      //             {
      //               node: "6",
      //               output: "input_1",
      //             },
      //             {
      //               node: "4",
      //               output: "input_1",
      //             },
      //           ],
      //         },
      //       },
      //       pos_x: 628,
      //       pos_y: 34,
      //     },
      //     4: {
      //       id: 4,
      //       name: "Background",
      //       data: {
      //         data: {
      //           name: "service menu",
      //           audio_url:
      //             "https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100220_samsungringtonemp3.mp3",
      //           configurationPrompt: "",
      //           configurationprompt: "1",
      //         },
      //       },
      //       class: "Background",
      //       html: '<div\n    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2 box"\n  >\n    <h3 class="font-semibold">Background</h3>\n\n    <div class="mb-2 border-t my-2 box">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Enter name of the background here</label\n      >\n      <input\n        type="text"\n        placeholder="placeholder"\n        df-data-name\n        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n\n\n    <div>\n      <label for="selection">Listen:</label>\n      <select\n        id="selection"\n        df-data-audio_url\n        value="df-data-audio_url"\n        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n      \n      >  <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100204_Iphonedefualt.mp3>Audio File 1\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100220_samsungringtonemp3.mp3>Audio File 2\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100699_cat-dog-31947.mp3>Audio File 3\n </option></select>\n\n     \n    </div>\n      <div class="mb-2 border-t my-2 box">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Add Configuration Prompt</label\n      >\n      <input\n        type="text"\n        placeholder="Configuration Prompt"\n\n        df-data-configurationPrompt\n        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n  </div>',
      //       typenode: false,
      //       inputs: {
      //         input_1: {
      //           connections: [
      //             {
      //               node: "3",
      //               input: "output_1",
      //             },
      //           ],
      //         },
      //       },
      //       outputs: {
      //         output_1: {
      //           connections: [
      //             {
      //               node: "8",
      //               output: "input_1",
      //             },
      //             {
      //               node: "7",
      //               output: "input_1",
      //             },
      //           ],
      //         },
      //       },
      //       pos_x: 114,
      //       pos_y: 375,
      //     },
      //     5: {
      //       id: 5,
      //       name: "PlayBack",
      //       data: {
      //         data: {
      //           name: "sales services",
      //           audio_url:
      //             "https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100204_Iphonedefualt.mp3",
      //           configurationprompt: "",
      //         },
      //       },
      //       class: "PlayBack",
      //       html: '<div\n    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2"\n  >\n    <h3 class="font-semibold">Play Back</h3>\n\n    <div class="mb-2 border-t my-2 box">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Enter name of the background</label\n      >\n      <input\n        type="text"\n        placeholder="placeholder"\n        df-data-name\n        class="form-control  w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n     <div>\n      <label for="selection">Listen:</label>\n      <select\n        id="selection"\n        df-data-audio_url\n        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n      > <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100204_Iphonedefualt.mp3>Audio File 1\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100220_samsungringtonemp3.mp3>Audio File 2\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100699_cat-dog-31947.mp3>Audio File 3\n </option>\n      </select>\n\n      <audio\n        id="player"\n        class="my-3"\n        controls="controls"\n        style="width: 170px;"\n        @change="change(source.src)"\n      >\n        <source\n          id="mp3_src"\n          src="http://www.culturedub.com/assets/04-Moringa-JahYu-Remix-feat-BaNdula-1.mp3"\n          type="audio/mp3"\n        />\n        Your browser does not support the audio element.\n      </audio>\n    </div>\n\n       <div class="mb-2 border-t my-2 box">\n     <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Add Configuration Prompt</label\n      >\n      <input\n        type="text"\n        placeholder="Configuration Prompt"\n\n        df-data-configurationPrompt\n        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n  </div>',
      //       typenode: false,
      //       inputs: {
      //         input_1: {
      //           connections: [
      //             {
      //               node: "8",
      //               input: "output_1",
      //             },
      //           ],
      //         },
      //       },
      //       outputs: {
      //         output_1: {
      //           connections: [],
      //         },
      //       },
      //       pos_x: 119,
      //       pos_y: 667,
      //     },
      //     6: {
      //       id: 6,
      //       name: "Queue",
      //       data: {
      //         data: {
      //           Name: "",
      //           selectedQueue: "",
      //           name: "customer service",
      //           selectedqueue: "2",
      //           configurationprompt: "0",
      //         },
      //       },
      //       class: "Queue",
      //       html: '<div\n              class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2"\n            >\n              <h3 class="font-semibold">Go to Queue</h3>\n\n             <div class="mb-2 border-t my-2">\n               <label\n                 class="form-label text-xs inline-block my-2 text-gray-700"\n                 >Enter name of the queue</label\n               >\n               <input\n                   type="text"\n                   placeholder="placeholder"\n                df-data-queueName\n                 class="form-control w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n                />\n             </div>\n          <div class="mt-3">\n               <label\n                  class="form-label text-xs inline-block mb-2 text-gray-700"\n                  onClick="check_here()">Select a queue</label\n                >\n\n                <select\n                df-data-selectedQueue\n                 class="form-select block w-full p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n                > <option\n value = 1>Third Queue test</option> <option\n value = 2>first Queue test</option> <option\n value = 3>second Queue test</option> <option\n value = 4>forth Queue test</option></select>\n\n                </div>\n\n                 <div class="mb-2 border-t my-2 box">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Add Configuration Prompt</label\n      >\n      <input\n        type="text"\n        placeholder="Configuration Prompt"\n\n        df-data-configurationPrompt\n        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n                </div>\n                </div>',
      //       typenode: false,
      //       inputs: {
      //         input_1: {
      //           connections: [
      //             {
      //               node: "3",
      //               input: "output_1",
      //             },
      //           ],
      //         },
      //       },
      //       outputs: {
      //         output_1: {
      //           connections: [],
      //         },
      //       },
      //       pos_x: 626,
      //       pos_y: 453,
      //     },
      //     7: {
      //       id: 7,
      //       name: "PlayBack",
      //       data: {
      //         data: {
      //           name: "support services",
      //           audio_url:
      //             "https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100699_cat-dog-31947.mp3",
      //           configurationprompt: "2",
      //         },
      //       },
      //       class: "PlayBack",
      //       html: '<div\n    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2"\n  >\n    <h3 class="font-semibold">Play Back</h3>\n\n    <div class="mb-2 border-t my-2 box">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Enter name of the background</label\n      >\n      <input\n        type="text"\n        placeholder="placeholder"\n        df-data-name\n        class="form-control  w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n     <div>\n      <label for="selection">Listen:</label>\n      <select\n        id="selection"\n        df-data-audio_url\n        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n      > <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100204_Iphonedefualt.mp3>Audio File 1\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100220_samsungringtonemp3.mp3>Audio File 2\n </option> <option\n value = https://goipspace.fra1.digitaloceanspaces.com/call_center/IVR_Files/1659100699_cat-dog-31947.mp3>Audio File 3\n </option>\n      </select>\n\n      <audio\n        id="player"\n        class="my-3"\n        controls="controls"\n        style="width: 170px;"\n        @change="change(source.src)"\n      >\n        <source\n          id="mp3_src"\n          src="http://www.culturedub.com/assets/04-Moringa-JahYu-Remix-feat-BaNdula-1.mp3"\n          type="audio/mp3"\n        />\n        Your browser does not support the audio element.\n      </audio>\n    </div>\n\n       <div class="mb-2 border-t my-2 box">\n     <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Add Configuration Prompt</label\n      >\n      <input\n        type="text"\n        placeholder="Configuration Prompt"\n\n        df-data-configurationPrompt\n        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n  </div>',
      //       typenode: false,
      //       inputs: {
      //         input_1: {
      //           connections: [
      //             {
      //               node: "4",
      //               input: "output_1",
      //             },
      //           ],
      //         },
      //       },
      //       outputs: {
      //         output_1: {
      //           connections: [],
      //         },
      //       },
      //       pos_x: 599,
      //       pos_y: 728,
      //     },
      //     8: {
      //       id: 8,
      //       name: "Wait",
      //       data: {
      //         data: {
      //           Name: "",
      //           waitTime: "",
      //           waittime: "2",
      //           name: "wait for sales services",
      //           configurationprompt: "1",
      //         },
      //       },
      //       class: "Wait",
      //       html: '  <div\n    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3 m-2"\n  >\n    <h3 class="font-semibold">Wait</h3>\n\n    <div class="mb-2 border-t my-2">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Enter name of the background</label\n      >\n      <input\n        type="text"\n        placeholder="Wait Name"\n        df-data-waitName\n        class="form-control w-full block p-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n   <div class="mb-2 w-full">\n      <div>\n        <label\n          for="textBox"\n          class="form-label text-xs inline-block text-gray-700"\n          >Time in seconds</label\n        >\n      </div>\n      <VueTimepicker format="ss" class="w-full"></VueTimepicker>\n    </div>\n     <div class="mb-2 border-t my-2 box">\n      <label\n        class="form-label text-xs inline-block my-2 text-gray-700"\n        >Add Configuration Prompt</label\n      >\n      <input\n        type="text"\n        placeholder="Configuration Prompt"\n\n        df-data-configurationPrompt\n        class="form-control block p-1 w-full text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"\n\n      />\n    </div>\n  </div>',
      //       typenode: false,
      //       inputs: {
      //         input_1: {
      //           connections: [
      //             {
      //               node: "4",
      //               input: "output_1",
      //             },
      //           ],
      //         },
      //       },
      //       outputs: {
      //         output_1: {
      //           connections: [
      //             {
      //               node: "5",
      //               output: "input_1",
      //             },
      //           ],
      //         },
      //       },
      //       pos_x: 275,
      //       pos_y: 1116,
      //     },
      //   },
      // },
      // });
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
    BackgroundNode,
    QueueNode,
    WaitNode,
    PlayBackNode,
    StartNode,
    StopNode,
    Dropdown,
    SendSMSNode,
  },
  created() {
    this.getQueues();
    this.getAudioIvr();
  },
  computed: {
    ...mapGetters(["queues", "selectQueues", "selectIvrAudios"]),
  },
  methods: {
    ...mapActions(["getQueues", "getAudioIvr", "addIvrFlow"]),
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
