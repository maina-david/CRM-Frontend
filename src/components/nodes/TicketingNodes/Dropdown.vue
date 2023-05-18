<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="justify-start bg-white rounded-sm text-left overflow-hidden shadow-sm p-4 m-3"
  >
    <div>
      <h3 class="font-semibold">DROPDOWN</h3>
    </div>

    <div class="">
      <label
        for="textBox"
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Label</label
      >
      <input
        type="text"
        placeholder="Enter the label"
        class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        v-model="myLabel"
        df-label
      />
    </div>
    <div class="" v-for="item in count" :key="item">
      <label
        for="textBox"
        class="form-label text-xs inline-block my-2 text-gray-700"
        >Option</label
      >
      <input
        type="text"
        placeholder="Enter the option"
        class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        df-options
        @focusout="myFunction"
        v-model="dropDownOptions[item]"
        :id="item"
      />

      <span
        @click="addOption"
        class="material-icons bg-lime-500 text-white p-0.5 mx-1 text-sm"
        >add</span
      >

      <span
        @click="removeOption"
        class="material-icons bg-lime-500 text-white p-0.5 mx-1 text-sm"
        >remove</span
      >
    </div>
    <ActionButton text="Add options" @click="myMethod" />
    <div class="my-3">
      <label for="selection" class="text-xs">Select a parent</label>
      <select
        :id="'selection_node' + removeFirst"
        df-data-selectednode
        value="df-data-selectednode"
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      ></select>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import { inject, ref, reactive, onUpdated } from "vue";
export default {
  components: { ActionButton },
  data() {
    return {
      count: 1,
      id: 0,
      removeFirst: 0,
      allOptions: {},
    };
  },
  methods: {
    addOption() {
      this.count++;
    },
  },
  setup() {
    const emitter = inject("emitter");
    const dropDownOptions = reactive([]);
    const myLabel = ref("");
    var myData = reactive({});
    var label = "";
    const data_type = "dropdown";
    var options = [];
    var thisLabel = "";
    var selectednode = "";
    var countId = 0;

    function myFunction() {
      console.log("Are you getting Here...");
      for (var key of Object.keys(dropDownOptions)) {
        console.log("KEY" + key);
        console.log("radioButtonOptions[key]" + dropDownOptions[key]);
        options[key - 1] = dropDownOptions[key];
      }
      return options;
    }

    function removeOption(item) {
      this.dropDownOptions.splice(item, 1);
      this.count--;
      console.log("This Radio Button Options" + this.dropDownOptions);
      options = this.dropDownOptions;
      myData = { label, data_type, options, selectednode };
      return this.dropDownOptions;
    }

    onUpdated(() => {
      label = myLabel.value;
      console.log(options);

      console.log(" My Label" + myLabel.value);
      console.log("Label" + label);
      myData = { label, data_type, options, selectednode };
      console.log("Inside" + JSON.stringify(myData));
    });
    console.log("Outside" + JSON.stringify(myData));

    const myMethod = () => {
      emitter.emit("myevent", myData);
    };
    return {
      emitter,
      myMethod,
      dropDownOptions,
      myLabel,
      thisLabel,
      countId,
      myFunction,
      removeOption,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.id = this.$el.parentElement.parentElement.id;
      console.log("My Node " + this.id);
    });

    this.emitter.on("allMyOptions", (value) => {
      console.log("My Event", `value:${value}`);
      console.log("My Event" + value);
      this.removeFirst = this.id.replace("node-", "");

      console.log("This label" + JSON.stringify(value));
      var x = document.getElementById("selection_node" + this.removeFirst);

      value.forEach((val) => {
        console.log("The Val" + val.input_id);
        console.log("This.Id", this.removeFirst);
        if (this.removeFirst == val.input_id) {
          console.log(JSON.stringify(val.allMyOptions));
          this.allOptions = val.allMyOptions;
        } else {
          console.log("FAAAAAAAALSE");
        }
      });

      var comaSeparated = Object.values(this.allOptions);
      console.log("ALL MY OPTIONNNNNNNNS" + comaSeparated);

      var ellength = document.getElementById(
        "selection_node" + this.removeFirst
      ).options.length;
      var i = 0;
      if (ellength > 0) {
        for (let j = 0; j < ellength; j++) {
          document
            .getElementById("selection_node" + this.removeFirst)
            .options.remove(j);
        }
        document
          .getElementById("selection_node" + this.removeFirst)
          .options.remove(0);
      }
      comaSeparated.forEach((item) => {
        var option = document.createElement("option");
        if (item != null) {
          option.text = item;
          x.add(option, i);
          i++;
        }
        console.log(
          "current option" +
            JSON.stringify(
              document.getElementById("selection_node" + this.removeFirst)
                .options
            )
        );
        console.log("OPTION" + item);
      });
    });
  },
};
</script>

<style></style>
