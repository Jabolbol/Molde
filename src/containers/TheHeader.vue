<template>
  <CHeader fixed with-subheader light>
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto" />
    <CHeaderNav class="mr-4">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink v-if="!admin && !shopAvailable" to="/components/request">Request Toko</CHeaderNavLink>
      </CHeaderNavItem>
      <TheHeaderDropdownAccount />
    </CHeaderNav>
  </CHeader>
</template>

<script>
import axios from "axios";
import TheHeaderDropdownAccount from "./TheHeaderDropdownAccount";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccount
  },
  data() {
    return {
      shopAvailable: false,
      admin: false
    }
  },
  methods: {
    isAdmin() {
      const role = localStorage.getItem("role");
      if(role === "ROLE_ADMIN") {
        this.admin = true;
      }
    },
    hasShop() {
      axios.get("/account/has-shop")
        .then(((response) => {
          if(response.data.data) {
            this.shopAvailable = true
          }
        }))
        .catch((error) => {
          console.log(error);
        })
    }
  },
  created() {
    this.isAdmin();
    this.hasShop();
  }
};
</script>
