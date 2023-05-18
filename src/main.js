import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// import VueCountryCode from "vue-country-code";
import JsonExcel from "vue-json-excel3";
import VOtpInput from "vue3-otp-input";
import VueTelInput from "vue3-tel-input";
import "vue3-tel-input/dist/vue3-tel-input.css";
import VueTimepicker from "vue3-timepicker";
import "vue3-timepicker/dist/VueTimepicker.css";
import treeview from "vue3-treeview";
import "vue3-treeview/dist/style.css";
// import JsonExcel from "vue-json-excel";
import { defaultConfig, plugin } from "@formkit/vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Echo from "laravel-echo";
import LitepieDatepicker from "litepie-datepicker";
import XLSX from "xlsx";
/* these are necessary styles for vue flow */
import "@braks/vue-flow/dist/style.css";
import VueVideoPlayer from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

/* this contains the default theme, these are optional styles */
import "@braks/vue-flow/dist/theme-default.css";
import VueIframe from "vue-iframes";

import mitt from "mitt";

window.Pusher = require("pusher-js");
// eslint-disable-next-line no-unused-vars
// window.Pusher = require("pusher-js");

const VueTelInputOptions = {
  mode: "international",
  onlyCountries: ["NG", "GH", "GB", "US", "CA"],
};
// const token = localStorage.getItem("token");

window.Echo = new Echo({
  broadcaster: "pusher",
  wsHost: process.env.VUE_APP_WEBSOCKET_URL,
  key: "ccbackend",
  // authEndpoint: "https://ccbackenddev.goipcloud.co.ke/broadcasting/auth",
  wsPort: "",
  wssPort: "",
  forceTLS: false,
  encrypted: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  cluster: "mt1",
  // auth: {
  //   headers: {
  //     authorization: "Bearer " + token,
  //   },
  // },
});
const emitter = mitt();

// .use(VueCountryCode)
createApp(App)
  .use(store)
  .use(VueTelInput, VueTelInputOptions)
  .use(treeview)
  .use(router)
  .use(ElementPlus)
  .use(XLSX)
  .use(VueTimepicker)
  .provide("emitter", emitter)
  .use(LitepieDatepicker)
  .use(plugin, defaultConfig)
  .use(VueVideoPlayer)
  .use(VueIframe)
  .component("downloadExcel", JsonExcel)
  .component("v-otp-input", VOtpInput)
  .component("QuillEditor", QuillEditor)
  .mount("#app");
