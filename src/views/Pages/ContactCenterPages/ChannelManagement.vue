<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Channel Management</h2>
      </div>
      <div
        class="grid grid-cols-2 grid-flow-col gap-6 mt-10"
        v-if="handleGuard(channel)"
      >
        <div class="col-span-1 w-full">
          <div class="bg-white rounded-sm shadow-sm p-4">
            <Dropdown
              select="Select Carrier"
              label="Select Carrier"
              :options="carriers"
              v-model="selectedCarrier"
              @change="getSelectCarrier"
            />
            <FreeDIDTable
              :tableHead="freeDIDTableHead"
              :tableData="availableDids"
            />
            <div>
              <paginate
                v-model="page"
                :page-count="page_count"
                :page-range="15"
                :margin-pages="2"
                :click-handler="getData"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination'"
                :page-class="'page-item'"
              >
              </paginate>
            </div>
          </div>
        </div>
        <div class="col-span-1 w-full">
          <div class="bg-white rounded-sm shadow-sm p-4">
            <UserDIDTable
              :tableHead="userDIDTableHead"
              :tableData="allocatedDids"
            />

            <clickToCallUserDIDTable
              :tableHead="userClickToCallDIDTableHead"
              :tableData="getAgentsDIDs"
            />
          </div>
        </div>
      </div>
      <div v-else>Nothing for your eyes!!!!</div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Dropdown from "@/components/Dropdown.vue";
import { ref } from "vue";
import Guard from "@/componentGuard.js";
import Paginate from "vuejs-paginate-next";
/*import groupManagement from "@/componentGuard.js";
import ClickToCall from "@/componentGuard.js";
import Inbound from "@/componentGuard.js";
import Outbound from "@/componentGuard.js";
import Company from "@/componentGuard.js";*/
/*import RoleProfile from "@/componentGuard.js";*/
//import UserManagement from "@/componentGuard.js";
import FreeDIDTable from "../../../components/tables/ContactCenterTables/FreeDIDTable.vue";
import UserDIDTable from "../../../components/tables/ContactCenterTables/UserDIDTable.vue";
import clickToCallUserDIDTable from "@/components/tables/ContactCenterTables/clickToCallUserDIDTable.vue";

export default {
  name: "ChannelManagement",
  components: {
    FreeDIDTable,
    UserDIDTable,
    clickToCallUserDIDTable,
    Dropdown,
    Paginate,
  },
  setup() {
    const showDialerModal = ref(false);
    return {
      showDialerModal,
    };
  },
  data() {
    return {
      freeDIDTableHead: ["DID", "Operator", "IVR", "Actions"],
      userDIDTableHead: ["DID", "Operator", "IVR", "Actions"],
      userClickToCallDIDTableHead: ["User", "Assigned DID", "Actions"],
      channel: "Channel Management",
      myState: false,
      page: "1",
      page_count: "5",
      selectedCarrier: "",
    };
  },
  created() {
    this.getAllocatedDids();
    this.getCompanyInfo();
    this.getAgentClickToCallDid();
  },
  watch: {
    companyAddress: function (val) {
      this.getAvailableDids(
        `country_code=${val.country_code}&page=${this.page}`
      );
      this.getAvailableCarriers({
        country_code: val.country_code,
      });
    },
    availableDidsNumber: function () {
      this.page_count = this.availableDidsNumber;
    },
  },
  computed: {
    ...mapGetters([
      "availableDids",
      "availableDidsNumber",
      "allocatedDids",
      "companyAddress",
      "getAgentsDIDs",
      "carriers",
      "availableDidsFilteredNumber",
    ]),
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
    getData() {
      if (this.selectedCarrier == "") {
        this.getAvailableDids(
          `country_code=${this.companyAddresscountry_code}&page=${this.page}`
        );
      } else {
        this.getAvailableDids(
          `country_code=${this.companyAddress.country_code}&page=${this.page}&carrier_id=${this.selectedCarrier}`
        );
      }
    },
    getSelectCarrier() {
      this.getAvailableDids(
        `country_code=${this.companyAddress.country_code}&page=${this.page}&carrier_id=${this.selectedCarrier}`
      );
    },
    ...mapActions([
      "getAvailableCarriers",
      "getAvailableDids",
      "getAllocatedDids",
      "getCompanyInfo",
      "getAgentClickToCallDid",
    ]),
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
