<template>
  <div class="flex justify-between border-b mt-10 m-5">
    <div class="m-3"><DateRangePicker v-model="date" /></div>
    <div class="m-4">
      <ActionButton text="Export"></ActionButton>
    </div>
  </div>
  <div class="m-5 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
    <CDRDataTable :tableHead="timeTableHead" :tableData="cdrReport" />
    <div>
      <paginate
        v-model="page"
        :page-count="page_count"
        :page-range="15"
        :margin-pages="2"
        :click-handler="clickCallback"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
      >
      </paginate>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import CDRDataTable from "@/components/ReportCards/CDRDataTable.vue";
import DateRangePicker from "@/components/DateRangePicker.vue";
import ActionButton from "@/components/ActionButton.vue";
import Paginate from "vuejs-paginate-next";
export default {
  data() {
    return {
      start: "",
      page: "1",
      page_count: "5",
      end: "",
      date: "",
      timeTableHead: [
        "Call Id",
        "Phone",
        "Agent",
        "Desposition",
        "Call Time",
        "Hold Time",
        "Mute Time",
        "Queue Time",
        "Time to Answer",
        "Call Date Time",
        "Play Call",
        "Action",
      ],
    };
  },
  components: { CDRDataTable, DateRangePicker, ActionButton, Paginate },
  created() {
    this.start = moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format(
      "yyyy-MM-DD"
    );
    this.end = moment(new Date().getTime()).format("yyyy-MM-DD");
    this.date = {
      start: this.start,
      end: this.end,
    };
    this.getCdrReport({
      start: this.start,
      end: this.end,
      page: this.page,
    });
  },
  watch: {
    date: function (val) {
      console.log("changed date", val);
      if (!val.start || !val.end) {
        console.log("No Date");
      } else {
        this.getCdrReport({
          start: val.start,
          end: val.end,
          page: this.page,
        });
      }
    },

    cdrReport: function () {
      this.page_count = this.pageNumbers;
    },
  },
  methods: {
    ...mapActions(["getCdrReport"]),
    clickCallback() {
      console.log("this is the current page", this.page);
      this.getCdrReport({
        start: this.start,
        end: this.end,
        page: this.page,
      });
    },
  },

  computed: {
    ...mapGetters(["cdrReport", "pageNumbers"]),
  },
};
</script>

<style>
.pagination {
  height: 36px;
  margin: 0;
  padding: 0;
}
.pager,
.pagination ul {
  margin-left: 0;
  *zoom: 1;
}
.pagination ul {
  padding: 0;
  display: inline-block;
  *display: inline;
  margin-bottom: 0;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.pagination li {
  display: inline;
}
.pagination a {
  float: left;
  padding: 0 12px;
  line-height: 30px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-left-width: 0;
}
.pagination .active a,
.pagination a:hover {
  background-color: #f5f5f5;
  color: #94999e;
}
.pagination .active a {
  color: #94999e;
  cursor: default;
}
.pagination .disabled a,
.pagination .disabled a:hover,
.pagination .disabled span {
  color: #94999e;
  background-color: transparent;
  cursor: default;
}
.pagination li:first-child a,
.pagination li:first-child span {
  border-left-width: 1px;
  -webkit-border-radius: 3px 0 0 3px;
  -moz-border-radius: 3px 0 0 3px;
  border-radius: 3px 0 0 3px;
}
.pagination li:last-child a {
  -webkit-border-radius: 0 3px 3px 0;
  -moz-border-radius: 0 3px 3px 0;
  border-radius: 0 3px 3px 0;
}
.pagination-centered {
  text-align: center;
}
.pagination-right {
  text-align: right;
}
.pager {
  margin-bottom: 18px;
  text-align: center;
}
.pager:after,
.pager:before {
  display: table;
  content: "";
}
.pager li {
  display: inline;
}
.pager a {
  display: inline-block;
  padding: 5px 12px;
  background-color: #fff;
  border: 1px solid #ddd;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
}
.pager a:hover {
  text-decoration: none;
  background-color: #f5f5f5;
}
.pager .next a {
  float: right;
}
.pager .previous a {
  float: left;
}
.pager .disabled a,
.pager .disabled a:hover {
  color: #999;
  background-color: #fff;
  cursor: default;
}
.pagination .prev.disabled span {
  float: left;
  padding: 0 12px;
  line-height: 30px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-left-width: 1;
}
.pagination .next.disabled span {
  float: left;
  padding: 0 12px;
  line-height: 30px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-left-width: 0;
}
.pagination li.active,
.pagination li.disabled {
  float: left;
  padding: 0 12px;
  line-height: 30px;
  text-decoration: none;
  border: 1px solid #ddd;
  border-left-width: 0;
}
.pagination li.active {
  background: #364e63;
  color: #fff;
}
.pagination li:first-child {
  border-left-width: 1px;
}
</style>
