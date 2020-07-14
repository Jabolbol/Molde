<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img src="img/avatars/6.jpg" class="c-avatar-img"/>
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem :to="'/components/profile'">
      <CIcon name="cil-user"/>
      Profile
    </CDropdownItem>
    <CDropdownItem v-if="!this.isAdmin && this.isActive" :to="'/components/shop'">
      <CIcon name="cil-house"/>
      Shop
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked"/>
      Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
  import {mapActions} from 'vuex';
  import axios from "axios";

  export default {
    name: "TheHeaderDropdownAccount",
    data() {
      return {
        isAdmin: false,
        isActive: true,
        itemsCount: 42
      };
    },
    methods: {
      ...mapActions(['doLogout']),
      checkRole() {
        if (localStorage.getItem("role") === "ROLE_CLIENT") {
          this.isAdmin = false;
        } else {
          this.isAdmin = true;
        }
      },
      checkActive() {
        axios.get("/shop/get")
          .then((response) => {
            const shop = response.data.data;
            this.isActive = shop.isActive;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
            }
          })
      },
      logout() {
        this.doLogout();
        this.$router.push("/pages/login");
      }
    },
    created() {
      this.checkRole();
      this.checkActive();
    }
  };
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>
