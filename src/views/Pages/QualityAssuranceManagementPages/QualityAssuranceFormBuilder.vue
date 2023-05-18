<!-- eslint-disable no-redeclare -->
<!-- eslint-disable no-redeclare -->
<template>
  <main class="bg-slate-100">
    <div class="m-5">
      <div class="border-b mt-5">
        <div class="flex justify-between m-4">
          <div>
            <h2 class="font-bold">{{ selectQAForm.name }}</h2>
            <h2 class="text-xs my-2">
              {{ selectQAForm.description }}
            </h2>
          </div>
          <div class="flex gap-3">
            <div class="export_html">
              <ActionButton text="Preview Form" />
            </div>
            <div class="export_json">
              <ActionButton
                @click="handleCreateFormItems"
                text="Submit Form to Create Form"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <nav class="navbar navbar-light bg-faded fixed-top">
          <div class="clearfix"></div>
        </nav>
        <br />
        <div class="clearfix"></div>
        <div class="form_builder" style="margin-top: 15px">
          <div class="row grid grid-cols-12">
            <div class="col-span-2">
              <nav class="nav-sidebar">
                <ul class="nav text-sm">
                  <div>
                    <h2 class="font-semibold text-sm">
                      Drag a field from here
                    </h2>
                  </div>
                  <li class="form_bal_toggle">
                    <a href=""
                      >YES-NO QUESTION
                      <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_scale">
                    <a href="javascript:;"
                      >OPEN ENDED QUESTION
                      <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="col-span-3 bal_builder">
              <div class="form_builder_area"></div>
            </div>
            <div class="col-span-7">
              <div class="m-2 p-3 bg-white">
                <div class="border-b mb-2">
                  <h2 class="font-semibold text-sm my-3">
                    Your form will be displayed here
                  </h2>
                </div>
                <form class="form-horizontal m-2">
                  <div class="preview"></div>
                  <div style="display: none" class="form-group plain_html">
                    <textarea rows="50" class="form-control"></textarea>
                  </div>
                  <div style="display: none" class="form-group json">
                    <textarea rows="50" class="form-control"></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
/* eslint-disable no-unused-vars */
import $ from "jquery";
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
// eslint-disable-next-line no-unused-vars
import "jquery-ui-dist/jquery-ui";
import ActionButton from "@/components/ActionButton.vue";

export default {
  data() {
    return {
      formItems: {},
      formInfo: [],
      type: "",
      name: "",
      isRequired: false,
      selectFormType: [
        { label: "Text", value: "text" },
        { label: "Email", value: "email" },
        { label: "Phone Number", value: "phone" },
        { label: "Number", value: "number" },
        { label: "CheckBox", value: "checkbox" },
        { label: "Combobox", value: "combobox" },
        { label: "Date", value: "date" },
      ],
    };
  },
  computed: {
    ...mapGetters(["selectQAForm", "qaFormItems"]),
  },
  methods: {
    ...mapActions(["createQualityAssuranceFormItems"]),
    handleCreateFormItems() {
      console.log(
        "I am submitting form items",
        JSON.parse(localStorage.getItem("final_items"))
      );
      var form_items = JSON.parse(localStorage.getItem("final_items"))[0]
        .form_items;
      this.createQualityAssuranceFormItems({
        q_a_form_id: this.selectQAForm.id,
        form_items,
      });
    },
  },
  watch: {
    formItems: function () {
      this.formInfo = JSON.parse(localStorage.getItem("QA Form Info"));
    },
    qaFormItems: function () {
      this.formInfo = JSON.parse(localStorage.getItem("QA Form Info"));
    },
  },
  setup() {
    var plain_html = "";
    var option_html_1 = "";
    var option_html_2 = "";
    var option_html_3 = "";
    $(document).ready(function () {
      if (localStorage.getItem("QA Form Info") != null) {
        var prevJson = localStorage.getItem("QA Form Info");
        getPreviousPlayFieldData(JSON.parse(prevJson)[0]);
        //console.log(prevJson);
      }
      $(".form_bal_toggle").draggable({
        helper: function () {
          return getToggleFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_scale").draggable({
        helper: function () {
          return getScaleFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });

      $(".form_builder_area").sortable({
        cursor: "move",
        placeholder: "placeholder",
        start: function (e, ui) {
          ui.placeholder.height(ui.helper.outerHeight());
        },
        stop: function (ev, ui) {},
      });

      $(".form_builder_area").disableSelection();
    });
    function getPreviousPlayFieldData(json) {
      // console.log(json);
      var multipleNames = json.multipleNames;
      //  console.log(multipleNames);
      var formItems = json.form_items;
      // console.log(formItems);
      //if (dataJson == "multipleNames") {
      var field = generateField();
      var html =
        '<div class="li_' +
        field +
        ' form_builder_field"><div class="all_div" id="' +
        field +
        '"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '" ><i class="material-icons bg-lime-500">close</i></button></div></div></div></div>';

      //if (dataJson == "form_items") {
      formItems.forEach((formItem) => {
        console.log(formItem);

        if (formItem.question_type == "range") {
          $(".form_builder_area").append(getScaleFieldHTML(formItem)[0]).show();
        }
        if (formItem.question_type == "toggle") {
          $(".form_builder_area")
            .append(getToggleFieldHTML(formItem)[0])
            .show();
        }
      });
    }

    function getToggleFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_question =
        items_edit == null ? "Enter your Question" : items_edit.question;
      var label_weight =
        items_edit == null
          ? "What is the weight of this question?"
          : items_edit.weight;

      var html =
        '<div class="all_div"><div class="row li_row"><div class=""><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><div class="row li_row form_output" data-type="toggle" data-field="' +
        field +
        '"><div class=""><div class="form-group"><input type="text"  value="' +
        label_question +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_question" value="What is the weight of this question?" data-field="' +
        field +
        '"/></div></div><div class=""><div class="form-group"><input type="number" value="' +
        label_weight +
        '"name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 text-xs mt-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_weight" placeholder="What is the weight of this question?"/></div></div><div><div class="flex grid grid-cols-6 text-xs mt-2"><div class="col-span-3"><div class="form-check "><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input text-xs isMandatory form_input_req">Mandatory</label></div></div></div></div></div> </div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }

    function getScaleFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_question =
        items_edit == null ? "Enter your Question" : items_edit.question;
      var label_weight = items_edit == null ? "" : items_edit.weight;
      var label_max_range = items_edit == null ? "" : items_edit.max_range;

      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-sm remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><div class="row li_row form_output" data-type="range" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_question +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_question" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="number" value="' +
        label_weight +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_weight" placeholder="What is the weight of this question?"/></div></div><div class="col-md-12"><div class="form-group"><input type="number" value="' +
        label_max_range +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_max_range" placeholder="What is the Maximum Range of this question?"/></div></div><div class="flex text-xs mt-2"><div class="col-md-6"><div class="form-check"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMandatory form_input_req">Mandatory</label></div></div></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }

    $(document).on("keyup", ".form_input_button_class", function () {
      getPreview();
    });
    $(document).on("keyup", ".form_input_button_value", function () {
      getPreview();
    });
    $(document).on("change", ".form_input_req", function () {
      getPreview();
    });
    $(document).on("keyup", ".form_input_weight", function () {
      getPreview();
    });
    $(document).on("keyup", ".form_input_max_range", function () {
      getPreview();
    });
    $(document).on("keyup", ".form_input_question", function () {
      getPreview();
    });
    $(document).on("keyup", ".form_input_name", function () {
      getPreview();
    });
    function generateField() {
      return Math.floor(Math.random() * (100000 - 1 + 1) + 57);
    }

    function getJson() {
      var el = $(".form_builder_area .form_output");
      var allJsonItems = [];
      var stringifiedJson;
      var form_items = [];
      el.each(function () {
        var question_type = $(this).attr("data-type");
        var form;
        var question = $(this).find(".form_input_question").val();
        var weight = $(this).find(".form_input_weight").val();
        var max_range = $(this).find(".form_input_max_range").val();
        var isMandatoryCheckbox = $(this).find(".isMandatory");
        var is_mandatory = false;
        var options = [];
        //var option_html = "";
        if (isMandatoryCheckbox.is(":checked")) {
          is_mandatory = true;
        }

        if (question_type == "range") {
          form = {
            question,
            weight,
            max_range,
            is_mandatory,
            question_type,
          };
          form_items.push(form);
        } else {
          form = {
            question,
            weight,
            is_mandatory,
            question_type,
          };

          form_items.push(form);
          //getPreview(plain_html, multipleNames, form_items);
        }
        allJsonItems.push({ form_items });
        console.log(allJsonItems);
        localStorage.setItem("final_items", JSON.stringify(allJsonItems));
        // allJsonItems.push({});
        stringifiedJson = allJsonItems;
        //getPreview();
        //dataTypes.push(JSON.stringify(data_types))
      });
      return stringifiedJson;
    }
    $(document).on("click", ".export_html", function () {
      var json = "";
      json = getJson();
      $(".preview").empty();
      var html_new = getPreview(JSON.stringify(json));
      $(".plain_html").hide();
      $(".preview").html(html_new).show();
      localStorage.setItem("QA Form Info", JSON.stringify(json));
    });

    function getPreview(json) {
      var html = "<div>";
      var not_stringified_form_items = JSON.parse(json)[0];
      var form_items = not_stringified_form_items;
      //console.log(form_items);
      //var option_html = "";
      form_items.form_items.forEach((form_item) => {
        if (form_item.question_type === "toggle") {
          console.log(form_item.question);
          html +=
            '<div class="form-group my-4"><label class="inline-flex relative items-center mb-5 cursor-pointer"><input type="checkbox" value="" class="sr-only peer"><div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] ' +
            'after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div><span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">' +
            form_item.question +
            "</span></label></div>";
        }
        if (form_item.question_type === "range") {
          console.log(form_item.question);

          html +=
            '<div class="form-group my-4"><label for="small-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">' +
            form_item.question +
            '</label><input id="small-range" type="range" value="' +
            form_item.max_range +
            '" class="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"></div>';
        }
      });
      return html;
    }
  },
  components: { ActionButton },
};
</script>

<style>
.form_builder .nav-sidebar {
  width: 100%;
  padding: 8px 0;
  border-right: 1px solid #ddd;
}
.form_builder .nav-sidebar a {
  color: #333;
  -webkit-transition: all 0.08s linear;
  -moz-transition: all 0.08s linear;
  -o-transition: all 0.08s linear;
  transition: all 0.08s linear;
  -webkit-border-radius: 4px 0 0 4px;
  -moz-border-radius: 4px 0 0 4px;
  border-radius: 4px 0 0 4px;
}
.form_builder .nav-sidebar .active a {
  cursor: default;
  background-color: #428bca;
  color: #fff;
  text-shadow: 1px 1px 1px #666;
}
.form_builder .nav-sidebar .active a:hover {
  background-color: #428bca;
}
.form_builder .nav-sidebar .text-overflow a,
.form_builder .nav-sidebar .text-overflow .media-body {
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
/* Right-aligned sidebar */
.form_builder .nav-sidebar.pull-right {
  border-right: 0;
  border-left: 1px solid #ddd;
}
.form_builder .nav-sidebar.pull-right a {
  -webkit-border-radius: 0 4px 4px 0;
  -moz-border-radius: 0 4px 4px 0;
  border-radius: 0 4px 4px 0;
}
.form_builder ul {
  font-size: 14px;
  display: block !important;
}
.form_builder ul li {
  padding: 10px;
  cursor: pointer;
}
.form_builder ul li a {
  text-decoration: none;
  cursor: pointer;
}
.form_builder_field {
  margin: 10px 5px;
  padding: 10px;
  background: #fff;
  width: 22%;
}
.form_builder .bal_builder {
  padding: 0 !important;
}
.margin-left-5 {
  margin-left: 5px;
}
.remove_bal_field {
  cursor: pointer;
  color: #fff;
}
.form-check-input {
  margin-right: 8px;
}
.placeholder {
  width: 22%;
  background-color: rgb(169, 250, 169);
  border: 1px dashed #666;
  margin-bottom: 5px;
}
.form_builder_area {
  width: 100%;
  min-height: 50px;
  position: absolute;
}
.mt-radio {
  display: block;
}
.mt-radio p {
  display: inline;
}
.mt-checkbox {
  display: block;
}
.mt-checkbox p {
  display: inline;
}
.add_more_select,
.add_more_radio,
.add_more_checkbox,
.remove_more_select,
.remove_more_radio,
.remove_more_checkbox {
  cursor: pointer;
}
</style>
