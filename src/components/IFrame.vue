<template>
  <iframe
    src="https://homebiogas.my.salesforce.com/?ec=302&startURL=%2Fvisualforce%2Fsession%3Furl%3Dhttps%253A%252F%252Fhomebiogas.lightning.force.com%252Flightning%252Fo%252FHBG_Contract__c%252Flist%253FfilterName%253DRecent"
    name="my-frame"
    width="1000px"
    height="500px"
  />
</template>

<script>
//import VueIframe from "vue-iframes";

export default {
  name: "IFrame",
  props: {},
  data: () => ({
    myIframe: null,
  }),
  /*methods: {
    onLoad(frame) {
      this.myIframe = frame.contentWindow;
    },
  },
  components: { VueIframe },*/
};
</script>
