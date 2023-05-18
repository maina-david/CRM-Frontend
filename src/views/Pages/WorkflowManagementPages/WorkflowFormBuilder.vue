<!-- eslint-disable no-redeclare -->
<!-- eslint-disable no-redeclare -->
<template>
  <main class="bg-slate-100">
    <div class="m-5">
      <div class="border-b mt-5">
        <div class="flex justify-between m-4">
          <div>
            <h2 class="font-bold">Form 1</h2>
            <h2 class="text-xs my-2">
              This will be the form description. Information here is just made
              up..So ignore it
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
                  <li class="form_bal_singlename">
                    <a href=""
                      >Single Name <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_multiplenames">
                    <a href="javascript:;"
                      >Multiple Names
                      <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_textfield">
                    <a href="javascript:;"
                      >Text Field <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_textarea">
                    <a href="javascript:;"
                      >Text Area <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_select">
                    <a href="javascript:;"
                      >Select <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_radio">
                    <a href="javascript:;"
                      >Radio Button <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_checkbox">
                    <a href="javascript:;"
                      >Checkbox <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_email">
                    <a href="javascript:;"
                      >Email <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_number">
                    <a href="javascript:;"
                      >Number <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_password">
                    <a href="javascript:;"
                      >Password <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_date">
                    <a href="javascript:;"
                      >Date <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_image">
                    <a href="javascript:;"
                      >Image Upload <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_file">
                    <a href="javascript:;"
                      >File Upload <i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_phone">
                    <a href="javascript:;"
                      >Phone Number<i class="fa fa-plus-circle pull-right"></i
                    ></a>
                  </li>
                  <li class="form_bal_url">
                    <a href="javascript:;"
                      >Url<i class="fa fa-plus-circle pull-right"></i
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
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions(["createAccountFormItems"]),
    handleCreateFormItems() {
      this.formInfo = JSON.parse(localStorage.getItem("Form Info"));
      this.formInfo = this.formInfo[0];
      this.formInfo.account_form_id = JSON.parse(
        localStorage.getItem("currentAccountFormId")
      );
      this.formItems = JSON.parse(localStorage.getItem("account_form_builder"));

      if (confirm("Confirm Create Account Form") == true) {
        console.log("create account form");
        this.createAccountFormItems(this.formInfo);
      } else {
        console.log("create account form cancelled");
      }
    },
  },
  watch: {
    formItems: function () {
      this.formInfo = JSON.parse(localStorage.getItem("Form Info"));
      this.formInfo.account_form_id = JSON.parse(
        localStorage.getItem("currentAccountFormId")
      );
      this.formItems = JSON.parse(localStorage.getItem("account_form_builder"));
    },
  },
  setup() {
    var plain_html = "";
    var option_html_1 = "";
    var option_html_2 = "";
    var option_html_3 = "";
    $(document).ready(function () {
      if (localStorage.getItem("Form Info") != null) {
        var prevJson = localStorage.getItem("Form Info");
        getPreviousPlayFieldData(JSON.parse(prevJson)[0]);
        //console.log(prevJson);
      }
      $(".form_bal_singlename").draggable({
        helper: function () {
          return getSingleNameFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_multiplenames").draggable({
        helper: function () {
          return getMultipleNamesFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_textfield").draggable({
        helper: function () {
          return getTextFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_textarea").draggable({
        helper: function () {
          return getTextAreaFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_number").draggable({
        helper: function () {
          return getNumberFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_email").draggable({
        helper: function () {
          return getEmailFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_password").draggable({
        helper: function () {
          return getPasswordFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_date").draggable({
        helper: function () {
          return getDateFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_select").draggable({
        helper: function () {
          return getSelectFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_radio").draggable({
        helper: function () {
          return getRadioFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_image").draggable({
        helper: function () {
          return getImageFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_file").draggable({
        helper: function () {
          return getFileFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_phone").draggable({
        helper: function () {
          return getPhoneFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_url").draggable({
        helper: function () {
          return getUrlFieldHTML();
        },
        connectToSortable: ".form_builder_area",
      });
      $(".form_bal_checkbox").draggable({
        helper: function () {
          return getCheckboxFieldHTML();
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
      multipleNames.forEach((multipleName) => {
        if (multipleName.data_type == "singlename") {
          console.log(getSingleNameFieldHTML()[0]);
          $(".form_builder_area")
            .append(getSingleNameFieldHTML(multipleName)[0])
            .show();
        }
        if (multipleName.data_type == "firstname") {
          $(".form_builder_area").append(html);

          $(".li_" + field).append(
            '<div class="row li_row form_output mt-5" data-type="firstname" data-field="' +
              field +
              '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
              multipleName.name +
              '" name="label_' +
              field +
              '" class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="First Name" data-field="' +
              field +
              '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
              multipleName.placeholder +
              '"name="placeholder_' +
              field +
              '" data-field="' +
              field +
              '" class="form-control block w-full mt-2 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex mt-2"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
              field +
              '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
              field +
              '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div>'
          );
        } else if (multipleName.data_type == "maidenname") {
          $(".li_" + field).append(
            '<div class="row li_row form_output mt-5" data-type="maidenname" data-field="' +
              field +
              '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
              multipleName.name +
              '" name="label_' +
              field +
              '" class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="First Name" data-field="' +
              field +
              '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
              multipleName.placeholder +
              '"name="placeholder_' +
              field +
              '" data-field="' +
              field +
              '" class="form-control block w-full mt-2 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex mt-2"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
              field +
              '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
              field +
              '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div>'
          );
        } else if (multipleName.data_type == "lastname") {
          $(".li_" + field).append(
            '<div class="row li_row form_output mt-5" data-type="lastname" data-field="' +
              field +
              '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
              multipleName.name +
              '" name="label_' +
              field +
              '" class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="First Name" data-field="' +
              field +
              '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
              multipleName.placeholder +
              '"name="placeholder_' +
              field +
              '" data-field="' +
              field +
              '" class="form-control block w-full mt-2 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex mt-2"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
              field +
              '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
              field +
              '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div>'
          );
        }
      });

      //if (dataJson == "form_items") {
      formItems.forEach((formItem) => {
        console.log(formItem);
        if (formItem.data_type == "url") {
          $(".form_builder_area").append(getUrlFieldHTML(formItem)[0]).show();
        }
        if (formItem.data_type == "phone") {
          $(".form_builder_area").append(getPhoneFieldHTML(formItem)[0]).show();
        }
        if (formItem.data_type == "image") {
          $(".form_builder_area").append(getImageFieldHTML(formItem)[0]).show();
        }
        if (formItem.data_type == "file") {
          $(".form_builder_area").append(getFileFieldHTML(formItem)[0]).show();
        }
        if (formItem.data_type == "text") {
          $(".form_builder_area").append(getTextFieldHTML(formItem)[0]).show();
        }
        if (formItem.data_type == "number") {
          $(".form_builder_area")
            .append(getNumberFieldHTML(formItem)[0])
            .show();
        }
        if (formItem.data_type == "email") {
          $(".form_builder_area").append(getEmailFieldHTML(formItem)[0]).show();
        }
        if (formItem.data_type == "password") {
          $(".form_builder_area")
            .append(getPasswordFieldHTML(formItem)[0])
            .show();
        }
        if (formItem.data_type == "date") {
          $(".form_builder_area").append(getDateFieldHTML(formItem)[0]).show();
        }
        if (formItem.data_type == "textarea") {
          $(".form_builder_area")
            .append(getTextAreaFieldHTML(formItem)[0])
            .show();
        }
        if (formItem.data_type == "select") {
          $(".form_builder_area")
            .append(getSelectFieldHTML(formItem)[0])
            .show();
        }
        if (formItem.data_type == "radio") {
          $(".form_builder_area").append(getRadioFieldHTML(formItem)[0]).show();
        }
        if (formItem.data_type == "checkbox") {
          $(".form_builder_area")
            .append(getCheckboxFieldHTML(formItem)[0])
            .show();
        }
      });
    }

    function getSingleNameFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name =
        items_edit == null ? "Enter the name of the Entity" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;

      var html =
        '<div class="all_div"><div class="row li_row"><div class=""><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><div class="row li_row form_output" data-type="singlename" data-field="' +
        field +
        '"><div class=""><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Enter the name of entity" data-field="' +
        field +
        '"/></div></div><div class=""><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '"name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 text-xs mt-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Entity name placeholder"/></div></div><div><div class="flex grid grid-cols-6 text-xs mt-2"><div class="col-span-3"><div class="form-check "><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input text-xs isRequired form_input_req">Required</label></div></div></div><div class="text-xs"><div class="form-check col-span-3"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input text-xs isMasked form_input_req">Masked</label></div></div></div></div> </div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getMultipleNamesFieldHTML(items_edit = null) {
      console.log(items_edit);
      var field = items_edit == null ? generateField() : items_edit.id;

      var first_name = items_edit == null ? "First Name" : items_edit.name;
      var first_name_placeholder =
        items_edit == null ? "" : items_edit.placeholder;

      var second_name = items_edit == null ? "Maiden Name" : items_edit.name;
      var second_name_placeholder =
        items_edit == null ? "" : items_edit.placeholder;

      var last_name = items_edit == null ? "Last Name" : items_edit.name;
      var last_name_placeholder =
        items_edit == null ? "" : items_edit.placeholder;

      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '" id=""' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><div class="row li_row form_output" data-type="firstname" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        first_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="First Name" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        first_name_placeholder +
        '"name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full mt-2 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex mt-2"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div><div class="row li_row form_output mt-8" data-type="maidenname" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        second_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Maiden Name" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        second_name_placeholder +
        '"name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full mt-2 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex mt-2"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div><div class="row li_row mt-10 form_output" data-type="lastname" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        last_name +
        '" name="label_' +
        field +
        '" class="form-control block mt-2 w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Last Name" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        last_name_placeholder +
        '"name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full mt-2 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex mt-2"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getPhoneFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn btn-sm remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><div class="row li_row form_output" data-type="phone" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex text-xs mt-2"><div class="col-md-6"><div class="form-check"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6 text-xs"><div class="form-check"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getFileFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><div class="row li_row form_output" data-type="file" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getImageFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;
      var html =
        '<div class="all_div"><div class="row li_row "><div class="col-md-12"><button type="button" class="btn remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><div class="row li_row form_output" data-type="file" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex"><div class="col-md-6 text-xs"><div class="form-check"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getUrlFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><div class="row li_row form_output" data-type="url" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getTextFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;

      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><div class="row li_row form_output" data-type="text" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex mt-2"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired  form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getNumberFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><hr/><div class="row li_row form_output" data-type="number" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getEmailFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><hr/><div class="row li_row form_output" data-type="email" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getPasswordFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn bg-lime-500 remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><hr/><div class="row li_row form_output" data-type="password" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getDateFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><hr/><div class="row li_row form_output" data-type="date" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="flex"><div class="col-md-6"><div class="form-check"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getTextAreaFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_placeholder = items_edit == null ? "" : items_edit.placeholder;
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div></div><hr/><div class="row li_row form_output" data-type="textarea" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><input type="text" value="' +
        label_placeholder +
        '" name="placeholder_' +
        field +
        '" data-field="' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_placeholder" placeholder="Placeholder"/></div></div><div class="flex"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isMasked form_input_req">Masked</label></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getSelectFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_options = items_edit == null ? [] : items_edit.options;
      var myOptions = [];
      label_options.forEach((option) => {
        console.log(option.option);
        myOptions.push(
          '"<option class="form-control block w-80 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" data-opt="' +
            opt1 +
            '" value="Value">' +
            option.option +
            "</option>"
        );
      });
      var label_name = items_edit == null ? "Label" : items_edit.name;

      var opt1 = generateField();
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div><hr/><div class="row li_row form_output" data-type="select" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"   value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group"><select name="select_' +
        field +
        '" class="form-control form-select block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">' +
        myOptions +
        '</select></div></div></div><div class="row li_row"><div class="col-md-12"><div class="field_extra_info_' +
        field +
        '"><div data-field="' +
        field +
        '" class="row select_row_' +
        field +
        '" data-opt="' +
        opt1 +
        '"><div class="col-md-8"><div class="form-group"><input type="text" value="Option" class="s_opt form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "/></div></div><div class="col-md-4"><i class="margin-top-5 material-icons default_blue add_more_select" data-field="' +
        field +
        '">add</i></div></div></div></div><div class="flex"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getRadioFieldHTML(items_edit = null) {
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_options = items_edit == null ? [] : items_edit.options;
      var myOptions = [];
      console.log(label_options);
      var opt1 = generateField();
      label_options.forEach((option) => {
        myOptions.push(
          '<label class="mt-radio mt-radio-outline"><input data-opt="' +
            opt1 +
            '" type="radio" name="radio_' +
            field +
            '" value="Value"><p class="text-xs r_opt_name_' +
            opt1 +
            '">' +
            option.option +
            " </p><span></span></label>"
        );
      });
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div><hr/><div class="row li_row form_output" data-type="radio" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group m-4"><div class="mt-radio-list radio_list_' +
        field +
        '">' +
        myOptions +
        '</div></div></div></div><div class="row li_row"><div class="col-md-12"><div class="field_extra_info_' +
        field +
        '"><div data-field="' +
        field +
        '" class="row radio_row_' +
        field +
        '" data-opt="' +
        opt1 +
        '"><div class="col-md-8"><div class="form-group"><input type="text" value="Option" class="r_opt form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/></div></div><div class="col-md-4"><i class="margin-top-5 material-icons default_blue add_more_radio" data-field="' +
        field +
        '">add</i></div></div></div></div><div class="flex"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    function getCheckboxFieldHTML(items_edit = null) {
      var field = items_edit == null ? generateField() : items_edit.id;
      var label_name = items_edit == null ? "Label" : items_edit.name;
      var label_options = items_edit == null ? [] : items_edit.options;
      var myOptions = [];
      label_options.forEach((option) => {
        console.log(option.option);
        myOptions.push(
          '<label class="text-xs mt-checkbox mt-checkbox-outline"><input data-opt="' +
            opt1 +
            '" type="checkbox" name="checkbox_' +
            field +
            '" value="Value"> <p class="test-xs c_opt_name_' +
            opt1 +
            '">' +
            option.option +
            "</p></label>"
        );
      });
      var opt1 = generateField();
      var html =
        '<div class="all_div"><div class="row li_row"><div class="col-md-12"><button type="button" class="btn  remove_bal_field pull-right" data-field="' +
        field +
        '"><i class="material-icons bg-lime-500">close</i></button></div></div><hr/><div class="row li_row form_output" data-type="checkbox" data-field="' +
        field +
        '"><div class="col-md-12"><div class="form-group"><input type="text"  value="' +
        label_name +
        '" name="label_' +
        field +
        '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none form_input_label" value="Label" data-field="' +
        field +
        '"/></div></div><div class="col-md-12"><div class="form-group m-4"><div class="mt-checkbox-list checkbox_list_' +
        field +
        '">' +
        myOptions +
        '</div></div></div></div><div class="row li_row"><div class="col-md-12"><div class="field_extra_info_' +
        field +
        '"><div data-field="' +
        field +
        '" class="row checkbox_row_' +
        field +
        '" data-opt="' +
        opt1 +
        '"><div class="col-md-8"><div class="form-group"><input type="text" value="Option" class="c_opt form-control block w-80 px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/></div></div><div class="col-md-4"><i class="margin-top-5 material-icons default_blue add_more_checkbox" data-field="' +
        field +
        '">add</i></div></div></div></div><div class="flex"><div class="col-md-6"><div class="form-check text-xs"><label class="form-check-label"><input data-field="' +
        field +
        '" type="checkbox" class="form-check-input isRequired form_input_req">Required</label></div></div></div></div></div>';
      return $("<div>")
        .addClass("li_" + field + " form_builder_field")
        .html(html);
    }
    $(document).on("click", ".add_more_select", function () {
      $(this).closest(".form_builder_field").css("height", "auto");
      var field = $(this).attr("data-field");
      var option = generateField();
      $(".field_extra_info_" + field).append(
        '<div data-field="' +
          field +
          '" class="row select_row_' +
          field +
          '" data-opt="' +
          option +
          '"><div class="col-md-8"><div class="form-group"><input type="text" value="Option" class="s_opt form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/></div></div><div class="col-md-4"><i class="margin-top-5 material-icons default_blue add_more_select" data-field="' +
          field +
          '">add</i><i class="margin-top-5 margin-left-5 material-icons default_red fa-2x remove_more_select" data-field="' +
          field +
          '">close</i></div></div>'
      );
      var options = "";
      $(".select_row_" + field).each(function () {
        var opt = $(this).find(".s_opt").val();
        var val = $(this).find(".s_val").val();
        var s_opt = $(this).attr("data-opt");
        options +=
          '<option data-opt="' +
          s_opt +
          '" value="' +
          val +
          '">' +
          opt +
          "</option>";
      });
      $("select[name=select_" + field + "]").html(options);
      getPreview();
    });
    $(document).on("click", ".add_more_radio", function () {
      $(this).closest(".form_builder_field").css("height", "auto");
      var field = $(this).attr("data-field");
      var option = generateField();
      $(".field_extra_info_" + field).append(
        '<div data-opt="' +
          option +
          '" data-field="' +
          field +
          '" class="row radio_row_' +
          field +
          '"><div class="col-md-8"><div class="form-group"><input type="text" value="Option" class="r_opt form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/></div></div><div class="col-md-4"><i class="margin-top-5 material-icons default_blue add_more_radio" data-field="' +
          field +
          '">add</i><i class="margin-top-5 margin-left-5 material-icons default_red remove_more_radio" data-field="' +
          field +
          '">close</i></div></div>'
      );
      var options = "";
      $(".radio_row_" + field).each(function () {
        var opt = $(this).find(".r_opt").val();
        var val = $(this).find(".r_val").val();
        var s_opt = $(this).attr("data-opt");
        options +=
          '<label class="text-xs mt-radio mt-radio-outline"><input data-opt="' +
          s_opt +
          '" type="radio" name="radio_' +
          field +
          '" value="' +
          val +
          '"> <p class="text-xs r_opt_name_' +
          s_opt +
          '">' +
          opt +
          "</p><span></span></label>";
      });
      $(".radio_list_" + field).html(options);
      getPreview();
    });
    $(document).on("click", ".add_more_checkbox", function () {
      $(this).closest(".form_builder_field").css("height", "auto");
      var field = $(this).attr("data-field");
      var option = generateField();
      $(".field_extra_info_" + field).append(
        '<div data-opt="' +
          option +
          '" data-field="' +
          field +
          '" class=" div row checkbox_row_' +
          field +
          '"><div class="col-md-8"><div class="form-group"><input type="text" value="Option" class="c_opt form-control block w-80 px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/></div></div><div class="col-md-4"><i class="margin-top-5 material-icons default_blue add_more_checkbox" data-field="' +
          field +
          '">add</i><i class="margin-top-5 margin-left-5 material-icons default_red fa-2x remove_more_checkbox" data-field="' +
          field +
          '">close</i></div></div>'
      );
      var options = "";
      $(".checkbox_row_" + field).each(function () {
        var opt = $(this).find(".c_opt").val();
        var val = $(this).find(".c_val").val();
        var s_opt = $(this).attr("data-opt");
        options +=
          '<label class="text-xs mt-checkbox mt-checkbox-outline"><input data-opt="' +
          s_opt +
          '" name="checkbox_' +
          field +
          '" type="checkbox" value="' +
          val +
          '"> <p class="text-xs c_opt_name_' +
          s_opt +
          '">' +
          opt +
          "</p><span></span></label>";
      });
      $(".checkbox_list_" + field).html(options);
      getPreview();
    });
    $(document).on("keyup", ".s_opt", function () {
      var op_val = $(this).val();
      var field = $(this).closest(".row").attr("data-field");
      var option = $(this).closest(".row").attr("data-opt");
      $("select[name=select_" + field + "]")
        .find("option[data-opt=" + option + "]")
        .html(op_val);
      getPreview();
    });
    $(document).on("keyup", ".s_val", function () {
      var op_val = $(this).val();
      var field = $(this).closest(".row").attr("data-field");
      var option = $(this).closest(".row").attr("data-opt");
      $("select[name=select_" + field + "]")
        .find("option[data-opt=" + option + "]")
        .val(op_val);
      getPreview();
    });
    $(document).on("keyup", ".r_opt", function () {
      var op_val = $(this).val();
      var field = $(this).closest(".row").attr("data-field");
      var option = $(this).closest(".row").attr("data-opt");
      $(".radio_list_" + field)
        .find(".r_opt_name_" + option)
        .html(op_val);
      getPreview();
    });
    $(document).on("keyup", ".r_val", function () {
      var op_val = $(this).val();
      var field = $(this).closest(".row").attr("data-field");
      var option = $(this).closest(".row").attr("data-opt");
      $(".radio_list_" + field)
        .find("input[data-opt=" + option + "]")
        .val(op_val);
      getPreview();
    });
    $(document).on("keyup", ".c_opt", function () {
      var op_val = $(this).val();
      var field = $(this).closest(".row").attr("data-field");
      var option = $(this).closest(".row").attr("data-opt");
      $(".checkbox_list_" + field)
        .find(".c_opt_name_" + option)
        .html(op_val);
      getPreview();
    });
    $(document).on("keyup", ".c_val", function () {
      var op_val = $(this).val();
      var field = $(this).closest(".row").attr("data-field");
      var option = $(this).closest(".row").attr("data-opt");
      $(".checkbox_list_" + field)
        .find("input[data-opt=" + option + "]")
        .val(op_val);
      getPreview();
    });
    $(document).on("click", ".edit_bal_textfield", function () {
      var field = $(this).attr("data-field");
      var el = $(".field_extra_info_" + field);
      el.html(
        '<div class="form-group"><input type="text" name="label_' +
          field +
          '" class="form-control" placeholder="Enter Text Field Label"/></div><div class="mt-checkbox-list"><label class="mt-checkbox mt-checkbox-outline"><input name="req_' +
          field +
          '" type="checkbox" value="1"> Required<span></span></label></div>'
      );
      getPreview();
    });
    $(document).on("click", ".remove_bal_field", function (e) {
      e.preventDefault();
      var field = $(this).attr("data-field");
      $(this)
        .closest(".li_" + field)
        .hide("400", function () {
          $(this).remove();
          getPreview();
        });
    });
    $(document).on("click", ".remove_more_select", function () {
      var field = $(this).attr("data-field");
      $(this)
        .closest(".select_row_" + field)
        .hide("400", function () {
          $(this).remove();
          var options = "";
          $(".select_row_" + field).each(function () {
            var opt = $(this).find(".s_opt").val();
            var val = $(this).find(".s_val").val();
            var s_opt = $(this).attr("data-opt");
            options +=
              '<option data-opt="' +
              s_opt +
              '" value="' +
              val +
              '">' +
              opt +
              "</option>";
          });
          $("select[name=select_" + field + "]").html(options);
          getPreview();
        });
    });
    $(document).on("click", ".remove_more_radio", function () {
      var field = $(this).attr("data-field");
      $(this)
        .closest(".radio_row_" + field)
        .hide("400", function () {
          $(this).remove();
          var options = "";
          $(".radio_row_" + field).each(function () {
            var opt = $(this).find(".r_opt").val();
            var val = $(this).find(".r_val").val();
            var s_opt = $(this).attr("data-opt");
            options +=
              '<label class="text-xs mt-radio mt-radio-outline"><input data-opt="' +
              s_opt +
              '" type="radio" name="radio_' +
              field +
              '" value="' +
              val +
              '"> <p class="text-xs r_opt_name_' +
              s_opt +
              '">' +
              opt +
              "</p><span></span></label>";
          });
          $(".radio_list_" + field).html(options);
          getPreview();
        });
    });
    $(document).on("click", ".remove_more_checkbox", function () {
      var field = $(this).attr("data-field");
      $(this)
        .closest(".checkbox_row_" + field)
        .hide("400", function () {
          $(this).remove();
          var options = "";
          $(".checkbox_row_" + field).each(function () {
            var opt = $(this).find(".c_opt").val();
            var val = $(this).find(".c_val").val();
            var s_opt = $(this).attr("data-opt");
            options +=
              '<label class="mt-checkbox mt-checkbox-outline"><input data-opt="' +
              s_opt +
              '" name="checkbox_' +
              field +
              '" type="checkbox" value="' +
              val +
              '"> <p class="r_opt_name_' +
              s_opt +
              '">' +
              opt +
              "</p><span></span></label>";
          });
          $(".checkbox_list_" + field).html(options);
          getPreview();
        });
    });
    $(document).on("keyup", ".form_input_button_class", function () {
      getPreview();
    });
    $(document).on("keyup", ".form_input_button_value", function () {
      getPreview();
    });
    $(document).on("change", ".form_input_req", function () {
      getPreview();
    });
    $(document).on("keyup", ".form_input_placeholder", function () {
      getPreview();
    });
    $(document).on("keyup", ".form_input_label", function () {
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
      var multipleNames = [];
      var form_items = [];
      el.each(function () {
        var data_type = $(this).attr("data-type");
        var names = [];
        var form;
        var name = $(this).find(".form_input_label").val();
        var placeholder = $(this).find(".form_input_placeholder").val();
        var isRequiredCheckbox = $(this).find(".isRequired");
        var isMaskedCheckbox = $(this).find(".isMasked");
        var is_required = false;
        var is_masked = false;
        var options = [];
        //var option_html = "";
        if (isRequiredCheckbox.is(":checked")) {
          is_required = true;
        }
        if (isMaskedCheckbox.is(":checked")) {
          is_masked = true;
        }
        if (data_type == "select") {
          var option = "";
          $(this)
            .find("select option")
            .each(function () {
              option = $(this).html();
              var value = $(this).val();
              option_html_1 += '<option value="">' + option + "</option>";
              options.push({ option });
            });
        }
        if (data_type == "radio") {
          // eslint-disable-next-line no-redeclare
          // eslint-disable-next-line no-redeclare
          option_html_2 = "";
          $(this)
            .find(".mt-radio")
            .each(function () {
              var option = $(this).find("p").html();
              option_html_2 +=
                '<div class="form-check"><label class="form-check-label text-xs"><input type="radio" class="form-check-input ">' +
                option +
                "</label></div>";
              options.push({ option });
            });
        }
        if (data_type == "checkbox") {
          // eslint-disable-next-line no-redeclare
          option_html_3 = "";
          $(this)
            .find(".mt-checkbox")
            .each(function () {
              var option = $(this).find("p").html();
              //var value = $(this).find("input[type=checkbox]").val();
              option_html_3 +=
                '<div class="form-check flex"><label class="form-check-label text-xs"><input type="checkbox" class="form-check-input" >' +
                option +
                "</label></div>";
              options.push({ option });
            });
        }
        if (
          data_type == "firstname" ||
          data_type == "maidenname" ||
          data_type == "lastname" ||
          data_type == "singlename"
        ) {
          var multipleNameId = "MultipleName" + generateField();
          multipleNames.push({
            multipleNameId,
            name,
            placeholder,
            is_required,
            is_masked,
            data_type,
          });
        } else {
          var formId = "FormItem" + generateField();

          form = {
            formId,
            name,
            placeholder,
            is_required,
            is_masked,
            data_type,
            options,
          };
          form_items.push(form);
          //getPreview(plain_html, multipleNames, form_items);
        }
        allJsonItems.push({ multipleNames, form_items });

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
      localStorage.setItem("Form Info", JSON.stringify(json));
    });

    function getPreview(json) {
      // console.log(jsonStringified);
      //var form_items = [];
      //var html = "<div>";
      var html = "<div>";
      var not_stringified_form_items = JSON.parse(json)[0];
      var form_items = not_stringified_form_items;
      //console.log(form_items);
      var not_stringified_multiple_names = JSON.parse(json)[0];
      var multipleNames = not_stringified_multiple_names;
      //var option_html = "";
      form_items.form_items.forEach((form_item) => {
        if (form_item.data_type === "text") {
          console.log(form_item.name);
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            form_item.name +
            '</label><input type="text" " placeholder="' +
            form_item.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            form_item.is_required +
            "/></div>";
        }
        if (form_item.data_type === "number") {
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            form_item.name +
            '</label><input type="number" placeholder="' +
            form_item.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            form_item.is_required +
            "/></div>";
        }
        if (form_item.data_type === "email") {
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            form_item.name +
            '</label><input type="email" " placeholder="' +
            form_item.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            form_item.is_required +
            "/></div>";
        }
        if (form_item.data_type === "password") {
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            form_item.name +
            '</label><input type="password" " placeholder="' +
            form_item.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            form_item.is_required +
            "/></div>";
        }
        if (form_item.data_type === "textarea") {
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            form_item.name +
            '</label><textarea rows="5"  placeholder="' +
            form_item.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            form_item.is_required +
            "/></div>";
        }
        if (form_item.data_type === "date") {
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            form_item.name +
            '</label><input type="date" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            form_item.is_required +
            "/></div>";
        }
        if (form_item.data_type === "select") {
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            form_item.name +
            '</label><select class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"' +
            option_html_1 +
            "</select></div>";
        }
        if (form_item.data_type === "radio") {
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            form_item.name +
            "</label>" +
            option_html_2 +
            "</div>";
        }
        if (form_item.data_type === "checkbox") {
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            form_item.name +
            "</label>" +
            option_html_3 +
            "</div>";
        }
        if (form_item.data_type === "phone") {
          html +=
            '<div class="form-group"><label class="control-label text-xs">' +
            form_item.name +
            '</label><input type="tel" name=" placeholder="' +
            form_item.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            form_item.is_required +
            "/></div>";
        }
        if (form_item.data_type === "file") {
          html +=
            '<div class="form-group my-4"><label class="custom-file text-xs">' +
            form_item.name +
            '</label><input type="file" accepted="image/*" placeholder="' +
            form_item.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " ' +
            form_item.is_required +
            '"/></div>';
        }
        if (form_items.data_type === "url") {
          html +=
            '<div class="form-group my-4"><label class="control-label">' +
            form_item.name +
            '</label><input type="url"  placeholder="' +
            form_item.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            form_item.is_required +
            "/></div>";
        }
      });
      multipleNames.multipleNames.forEach((name) => {
        if (name.data_type === "singlename") {
          html +=
            '<div class="form-group my-4"><label class="control-label text-xs">' +
            name.name +
            '</label><input type="text" " placeholder="' +
            name.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            name.is_required +
            "/></div>";
        }
        if (name.data_type === "firstname") {
          html +=
            '<div class=""><div class="grid grid-cols-3 gap-4 flex my-4"><div><div><label class="control-label text-xs">' +
            name.name +
            '</label><input type="text" " placeholder="' +
            name.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            name.is_required +
            "/> </div></div>";
        }
        if (name.data_type === "maidenname") {
          html +=
            '<div class=""><div class=""><label class="control-label text-xs">' +
            name.name +
            '</label><input type="text" " placeholder="' +
            name.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            name.is_required +
            "/> </div></div>";
        }
        if (name.data_type === "lastname") {
          html +=
            '<div class=""><div><div><div><label class="control-label text-xs">' +
            name.name +
            '</label><input type="text" " placeholder="' +
            name.placeholder +
            '" class="form-control block w-full px-5 py-1.5 mt-2 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" ' +
            name.is_required +
            "/> </div></div> </div></div></div> </div></div> </div></div> </div></div></div> </div></div>";
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
