<template>
  <aside class="sticky" :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="menu-toggle-wrap">
      <button class="menu-toggle mt-12" @click="ToggleMenu">
        <span class="material-icons">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu" @click="closeMenu">
      <router-link :to="{ name: 'HomePage' }" class="button">
        <span class="material-icons">home</span>
        <span class="text">Home</span>
      </router-link>
    </div>
    <div class="menu" @click="closeMenu">
      <div>
        <div v-if="handleGuard(customerAccountManager)">
          <router-link :to="{ name: 'AccountTypes' }" class="button">
            <span class="material-icons">manage_accounts</span>
            <span class="text">Account Management </span>
          </router-link>
        </div>
        <div
          v-if="
            handleGuard(customerAccountManager) ||
            handleGuard(customerAccountUser)
          "
        >
          <router-link :to="{ name: 'Account' }" class="button">
            <span class="material-icons">account_box</span>
            <span class="text">Accounts </span>
          </router-link>
        </div>
        <div
          v-if="
            handleGuard(customerAccountManager) ||
            handleGuard(customerAccountUser)
          "
        >
          <router-link :to="{ name: 'Contacts' }" class="button">
            <span class="material-icons">import_contacts</span>
            <span class="text">Contacts</span>
          </router-link>
        </div>
        <div v-if="handleGuard(campaign)">
          <router-link :to="{ name: 'CampaignManagement' }" class="button">
            <span class="material-icons">campaign</span>
            <span class="text">Campaign Management</span>
          </router-link>
        </div>
        <div v-if="handleGuard(salesManager)">
          <router-link :to="{ name: 'SalesTeam' }" class="button">
            <span class="material-icons">sell</span>
            <span class="text">Sales Team Management</span>
          </router-link>
        </div>
        <div v-if="handleGuard(salesManager)">
          <router-link :to="{ name: 'SalesProcessManagement' }" class="button">
            <span class="material-icons">lan</span>
            <span class="text">Sales Process Management</span>
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'LeadManagement' }" class="button">
            <span class="material-icons">leaderboard</span>
            <span class="text">Lead Management</span>
          </router-link>
        </div>
        <router-link :to="{ name: 'CRMReports' }" class="button">
          <span class="material-icons">summarize</span>
          <span class="text">Reports</span>
        </router-link>

        <router-link :to="{ name: 'CRMSettings' }" class="mb-24 button">
          <span class="material-icons">settings</span>
          <span class="text">Settings</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref } from "vue";
import logoURL from "@/assets/logo.svg";
import Guard from "@/componentGuard.js";

export default {
  data() {
    return {
      logoURL: logoURL,
      campaign: "Campaign Management",
      customerAccountManager: "Customer Account Manager",
      customerAccountUser: "Customer Account User",
      customerServiceUser: "Customer Service User",
      salesManager: "Sales Manager",
      salesUser: "Sales User",
      mySales: false,
    };
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
  },
  components: {},
  setup() {
    const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
    const ToggleMenu = () => {
      is_expanded.value = !is_expanded.value;
      console.log("Toggled");
      localStorage.setItem("is_expanded", is_expanded.value);
    };

    const closeMenu = () => {
      if (is_expanded.value == true) {
        is_expanded.value = !is_expanded.value;
        localStorage.setItem("is_expanded", is_expanded.value);
      } else {
        localStorage.setItem("is_expanded", is_expanded.value);
      }
    };
    return {
      is_expanded,
      ToggleMenu,
      closeMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
aside::-webkit-scrollbar {
  display: none;
}
aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 32px);
  max-height: calc(100vh - 9rem);
  overflow-y: scroll;
  min-height: 100vh;
  padding: 1rem;
  transition: 0.2s ease-in-out;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  .flex {
    flex: 1 1 0%;
  }
  .logo {
    margin-bottom: 1rem;
    img {
      width: 4rem;
    }
  }
  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;
    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }
  h3,
  .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .menu {
    margin: 0 -1rem;
    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      &:hover {
        background-color: var(--dark-alt);
        .material-icons,
        .text {
          color: var(--primary);
        }
      }
      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);
        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }
  .footer {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }
  &.is-expanded {
    width: var(--sidebar-width);
    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }
    h3,
    .button .text {
      opacity: 1;
    }
    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
    .footer {
      opacity: 0;
    }
  }
  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
