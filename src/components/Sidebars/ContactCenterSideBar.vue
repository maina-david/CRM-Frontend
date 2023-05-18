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
        <router-link :to="{ name: 'AdminDashboard' }" class="button">
          <span class="material-icons">dashboard</span>
          <span class="text">Admin Dashboard</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{ name: 'AgentDashboard' }" class="button">
          <span class="material-icons">support_agent</span>
          <span class="text">Agent Dashboard</span>
        </router-link>
      </div>
      <div
        v-if="
          handleGuard(user) || handleGuard(invite) || handleGuard(roleProfile)
        "
      >
        <router-link :to="{ name: 'UserManagement' }" class="button">
          <span class="material-icons">person_pin</span>
          <span class="text">User Management</span>
        </router-link>
      </div>
      <div v-if="handleGuard(group)">
        <router-link :to="{ name: 'CompanyManagement' }" class="button">
          <span class="material-icons">supervised_user_circle</span>
          <span class="text">Company Management</span>
        </router-link>
      </div>
      <div v-if="handleGuard(channel)">
        <router-link :to="{ name: 'ChannelManagement' }" class="button">
          <span class="material-icons">graphic_eq</span>
          <span class="text">Channel Management</span>
        </router-link>
      </div>
      <div v-if="handleGuard(ivr)">
        <router-link :to="{ name: 'IVRManagement' }" class="button">
          <span class="material-icons"> smartphone </span>
          <span class="text">IVR Management</span>
        </router-link>
      </div>

      <div
        v-if="
          handleGuard(queueAgent) ||
          handleGuard(queue) ||
          handleGuard(mohQueue) ||
          handleGuard(moh)
        "
      >
        <router-link :to="{ name: 'QueueManagement' }" class="button">
          <span class="material-icons">groups</span>
          <span class="text">Queue Management</span>
        </router-link>
      </div>
      <div>
        <router-link :to="{ name: 'Reports' }" class="button">
          <span class="material-icons">summarize</span>
          <span class="text">Reports</span>
        </router-link>
      </div>
      <div class="mb-24">
        <router-link :to="{ name: 'Settings' }" class="button">
          <span class="material-icons">settings</span>
          <span class="text">Settings</span>
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref } from "vue";

import Guard from "@/componentGuard.js";
import logoURL from "@/assets/logo.svg";
export default {
  created() {
    this.user_right = this.handleGuard(this.user);
    this.invite_right = this.handleGuard(this.invite);
    this.role_profile_right = this.handleGuard(this.roleProfile);
    this.chanel_right = this.handleGuard(this.channel);
    console.log(
      "these are the access rights" +
        this.user_right +
        this.invite_right +
        this.chanel_right +
        this.role_profile_right
    );
  },

  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
  },
  data() {
    return {
      logoURL: logoURL,
      user: "User Management",
      user_right: false,
      invite: "Invitation Management",
      invite_right: false,
      roleProfile: "Role Profile",
      role_profile_right: false,
      channel: "Channel Management",
      chanel_right: false,
      company: "Company Management",
      company_right: false,
      group: "Group Management",
      group_right: false,
      ivr: "IVR Manager",
      ivr_right: false,
      moh: "MOH Manager",
      moh_right: false,
      mohQueue: "MOH Queue Manager",
      mohQueue_right: false,
      queue: "Queue Management",
      queue_right: false,
      queueAgent: "Queue Agent Management",
      queueAgent_right: false,
      myState: false,
    };
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
