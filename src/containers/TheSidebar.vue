<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <CRenderFunction flat v-if="isAdmin" :content-to-render="$options.nav"/>
    <CRenderFunction flat v-if="!isAdmin && isActive" :content-to-render="$options.navClient"/>
  </CSidebar>
</template>

<script>
  import navClient from "./_nav_client";
  import nav from "./_nav";
  import axios from "axios";

  export default {
    name: "TheSidebar",
    navClient,
    nav,
    data() {
      return {
        isAdmin: false,
        isActive: false
      };
    },
    methods: {
      checkRole() {
        if (localStorage.getItem("role") === "ROLE_CLIENT") {
          this.isAdmin = false;
        } else {
          this.isAdmin = true;
        }
      },
      checkBlocked() {
        axios.get("/shop/get")
          .then((response) => {
            const status = response.data.data.isActive;
            this.isActive = status;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
            }
          })
      }
    },
    created() {
      this.checkRole();
      this.checkBlocked();
    },
    computed: {
      show() {
        return this.$store.state.sidebarShow;
      },
      minimize() {
        return this.$store.state.sidebarMinimize;
      }
    }
  };
</script>
