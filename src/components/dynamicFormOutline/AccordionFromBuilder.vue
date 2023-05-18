<template>
  <div class="mt-10 grid grid-cols-4">
    <div class="border-r-2 border-indigo-300 grid-span-1">
      <p>Form Builder</p>
      <div id="app">
        <div class="items">
          <div v-for="(item, i) in items" :key="i">
            <div :class="item.open ? 'item open' : 'item'">
              <div class="question" @click="toggleOpen(i)">
                {{ item.question }}
              </div>
              <div v-if="item.dataType == 'text'" class="answer">
                <TextBox
                  type="text"
                  label="Text Label"
                  placeholder="Enter the label for Text"
                  v-model="current_form_item.label"
                />
                <TextBox
                  type="text"
                  label="Text Placeholder"
                  placeholder="Enter Placeholder for Text"
                  v-model="current_form_item.placeholder"
                />
                <div class="my-2 py-2">
                  <ActionButton
                    text="Add Text to Form"
                    @click="handleBuildForm(item, i)"
                  />
                </div>
              </div>
              <div v-if="item.dataType == 'textarea'" class="answer">
                <TextBox
                  type="text"
                  label="Text Area Label"
                  placeholder="Enter the label for Text Area"
                  v-model="current_form_item.label"
                />
                <TextBox
                  type="text"
                  label="Text Area Placeholder"
                  placeholder="Enter Placeholder for Text Area"
                  v-model="current_form_item.placeholder"
                />
                <div class="my-2 py-2">
                  <ActionButton
                    text="Add Text Area to Form"
                    @click="handleBuildForm(item, i)"
                  />
                </div>
              </div>
              <div v-if="item.dataType == 'number'" class="answer">
                <TextBox
                  type="text"
                  label="Number Label"
                  placeholder="Enter the label for Number"
                  v-model="current_form_item.label"
                />
                <TextBox
                  type="text"
                  label="Number Placeholder"
                  placeholder="Enter Placeholder for Number"
                  v-model="current_form_item.placeholder"
                />
                <div class="my-2 py-2">
                  <ActionButton
                    text="Add Number to Form"
                    @click="handleBuildForm(item, i)"
                  />
                </div>
              </div>
              <div v-if="item.dataType == 'select'" class="answer">
                <TextBox
                  type="text"
                  label="Dropdown Options Label"
                  placeholder="Enter the label for Dropdown Options"
                  v-model="current_form_item.label"
                />
                <div class="grid grid-cols-4 gap-2">
                  <div
                    v-for="(option, i) in optionItems"
                    :key="option"
                    class="col-span-3 flex flex-row"
                  >
                    <TextBox
                      type="text"
                      label="Add Option"
                      placeholder="Option"
                      v-model="current_form_item.options[i]"
                    />
                  </div>
                  <div class="p-2">
                    <ActionButton text="Add Option" @click="handleAddOption" />
                  </div>
                </div>
                <div class="my-2 py-2">
                  <ActionButton
                    text="Add Dropdown to Form"
                    @click="handleBuildForm(item, i)"
                  />
                </div>
              </div>
              <div v-if="item.dataType == 'radio'" class="answer">
                <TextBox
                  type="text"
                  label="Radio Buttons Label"
                  placeholder="Enter the label for Radio Buttons"
                  v-model="current_form_item.label"
                />
                <div class="grid grid-cols-4 gap-2">
                  <div
                    v-for="(option, i) in optionItems"
                    :key="option"
                    class="col-span-3 flex flex-row"
                  >
                    <TextBox
                      type="text"
                      label="Add Option"
                      placeholder="Option"
                      v-model="current_form_item.options[i]"
                    />
                  </div>
                  <div class="p-2">
                    <ActionButton text="Add Option" @click="handleAddOption" />
                  </div>
                </div>
                <div class="my-2 py-2">
                  <ActionButton
                    text="Add Radio Buttons to Form"
                    @click="handleBuildForm(item, i)"
                  />
                </div>
              </div>
              <div v-if="item.dataType == 'checkbox'" class="answer">
                <TextBox
                  type="text"
                  label="Checkbox Label"
                  placeholder="Enter the label for Checkbox"
                  v-model="current_form_item.label"
                />
                <div class="grid grid-cols-4 gap-2">
                  <div
                    v-for="(option, i) in optionItems"
                    :key="option"
                    class="col-span-3 flex flex-row"
                  >
                    <TextBox
                      type="text"
                      label="Add Option"
                      placeholder="Option"
                      v-model="current_form_item.options[i]"
                    />
                  </div>
                  <div class="p-2">
                    <ActionButton text="Add Option" @click="handleAddOption" />
                  </div>
                </div>
                <div class="my-2 py-2">
                  <ActionButton
                    text="Add Checkbox to Form"
                    @click="handleBuildForm(item, i)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ml-12 border-r-2 border-indigo-300 grid-span-1">
      <p>Form Preview</p>
      <div class="" v-for="item in form_items" :key="item.item_id">
        <div v-if="item.data_type === 'text' || item.data_type === 'number'">
          <TextBox
            :disabled="true"
            :type="item.data_type"
            :placeholder="item.placeholder"
            :label="item.label"
          />
        </div>
        <div v-if="item.data_type === 'textarea'">
          <TextArea
            :disabled="true"
            :placeholder="item.placeholder"
            :label="item.label"
          />
        </div>
        <div v-if="item.data_type === 'select'">
          <Dropdown
            :disabled="true"
            :options="item.options"
            :label="item.label"
          />
        </div>
        <div v-if="item.data_type === 'radio'">
          <Radio :disabled="true" :label="item.label" :options="item.options" />
        </div>
        <div v-if="item.data_type === 'checkbox'">
          <CheckBoxList
            :disabled="true"
            :options="item.options"
            :label="item.label"
            v-model:value="item.options"
          />
        </div>
      </div>
      <div v-if="form_items.length" class="answer mt-5">
        <p>Escalate to?</p>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="option in treeData" :key="option" class="col-span-3">
            <Escalation :optionChild="option" />
          </div>
        </div>
        <div class="my-2 py-2">
          <ActionButton
            text="Add Escalation to Form"
            @click="handleBuildForm(item, i)"
          />
        </div>
      </div>
    </div>
    <div class="ml-12 border-r-2 border-indigo-300 grid-span-1">
      <div v-for="item in form_items" :key="item.item_id" class="">
        <div
          v-if="item.data_type == 'radio' || item.data_type == 'select'"
          class=""
        >
          <TextBox
            type="text"
            label="Text Label"
            placeholder="Enter the label for Text"
            v-model="current_form_item.label"
          />
        </div>
      </div>
    </div>
    <div class="border-r-2 border-indigo-300 grid-span-1">
      <CheckBoxList
        :options="escNode"
        label="Escalate to?"
        v-model:value="escalateTo"
      />
    </div>
  </div>
</template>

<script>
import TextBox from "@/components/TextBox.vue";
import TextArea from "@/components/TextArea.vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";
import Radio from "@/components/Radio.vue";
import CheckBoxList from "@/components/CheckBoxList.vue";
import Escalation from "@/components/dynamicFormOutline/Escalation.vue";

export default {
  name: "AccordionFormBuilder",
  props: {
    initial_form_items: {
      type: Array,
      default: () => [],
    },

    escNode: {
      type: Array,
      default: () => [],
    },
    treeData: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TextBox,
    TextArea,
    ActionButton,
    Dropdown,
    Radio,
    CheckBoxList,
    Escalation,
  },
  data() {
    return {
      form_items: [],
      escalateTo: "",
      escalation: "",
      current_form_item: {
        item_id: "",
        label: "",
        placeholder: "",
        data_type: "",
        options: [],
      },
      optionItems: 1,
      items: [
        {
          question: "Text",
          dataType: "text",
          open: false,
        },
        {
          question: "Text Area",
          dataType: "textarea",
          open: false,
        },
        {
          question: "Number",
          dataType: "number",
          open: false,
        },
        {
          question: "Select",
          dataType: "select",
          open: false,
        },
        {
          question: "Radio Button",
          dataType: "radio",
          open: false,
        },
        {
          question: "Checkbox",
          dataType: "checkbox",
          open: false,
        },
        {
          question: "Upload",
          dataType: "upload",
          open: false,
        },
      ],
    };
  },
  created() {
    if (this.initial_form_items.length > 0) {
      this.form_items = this.initial_form_items;
    } else {
      this.form_items = [];
    }
  },
  methods: {
    toggleOpen: function (index) {
      this.current_form_item = {
        item_id: "",
        label: "",
        placeholder: "",
        data_type: "",
        options: [],
      };
      this.optionItems = 1;
      this.items = this.items.map((item, i) => {
        if (index === i) {
          item.open = !item.open;
        } else {
          item.open = false;
        }
        return item;
      });
    },
    handleAddOption() {
      this.optionItems++;
    },
    handleBuildForm(data, i) {
      console.log("current form data", data);
      console.log("current form items", this.current_form_item);
      var id_assign = this.form_items.length;
      if (data.dataType === "text") {
        this.form_items[id_assign] = {
          item_id: data.dataType + id_assign,
          label: this.current_form_item.label,
          placeholder: this.current_form_item.placeholder,
          data_type: data.dataType,
          options: [],
        };
      }
      if (data.dataType === "textarea") {
        this.form_items[id_assign] = {
          item_id: data.dataType + id_assign,
          label: this.current_form_item.label,
          placeholder: this.current_form_item.placeholder,
          data_type: data.dataType,
          options: [],
        };
      }
      if (data.dataType === "number") {
        this.form_items[id_assign] = {
          item_id: data.dataType + id_assign,
          label: this.current_form_item.label,
          placeholder: this.current_form_item.placeholder,
          data_type: data.dataType,
          options: [],
        };
      }
      if (data.dataType === "select") {
        var selectOptions = this.current_form_item.options.map((item, i) => {
          return { label: item, value: i + 1 };
        });
        this.form_items[id_assign] = {
          item_id: data.dataType + id_assign,
          label: this.current_form_item.label,
          data_type: data.dataType,
          options: selectOptions,
        };
      }
      if (data.dataType === "radio") {
        var selectRadio = this.current_form_item.options.map((item, i) => {
          return { label: item, value: i + 1 };
        });
        this.form_items[id_assign] = {
          item_id: data.dataType + id_assign,
          label: this.current_form_item.label,
          data_type: data.dataType,
          options: selectRadio,
        };
      }
      if (data.dataType === "checkbox") {
        var selectCheckbox = this.current_form_item.options.map((item, i) => {
          return { label: item, value: i + 1 };
        });
        this.form_items[id_assign] = {
          item_id: data.dataType + id_assign,
          label: this.current_form_item.label,
          data_type: data.dataType,
          options: selectCheckbox,
        };
      }
      console.log("emit running");
      this.$emit("form_items", this.form_items);
      this.toggleOpen(i);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #eee;
  font-family: sans-serif;
}
.item {
  display: block;
  width: 100%;
  max-width: 340px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
}
.item .question {
  position: relative;
  color: #3c3c3c;
  font-weight: 600;
  transition: all 0.2s linear;
}
.item .question::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%) rotate(0deg);
  width: 20px;
  height: 20px;
  background-image: url("./AccordionFormItems/arrow-down-mint.svg");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  transition: all 0.2s linear;
}
.item.open .question {
  margin-bottom: 15px;
}
.item.open .question::after {
  transform: translateY(-50%) rotate(90deg);
}
.item .answer {
  color: #3c3c3c;
  opacity: 0;
  max-height: 0px;
  overflow-y: hidden;
  transition: all 0.2s ease-out;
}
.item.open .answer {
  opacity: 1;
  max-height: 1000px;
}
</style>
