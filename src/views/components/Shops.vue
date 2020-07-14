<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>

          </CCardHeader>
          <CCardBody>
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Nama Toko</th>
                <th scope="col">Pemilik Toko</th>
                <th scope="col">Provinsi</th>
                <th scope="col">Kabupaten/Kota</th>
                <th scope="col">Jalan</th>
                <th scope="col">Kode Pos</th>
                <th scope="col">Status</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="shop in shops" :key="shop.id">
                <td>{{shop.name}}</td>
                <td>{{shop.account.firstName}}</td>
                <td>{{shop.province}}</td>
                <td>{{shop.city}}</td>
                <td>{{shop.street}}</td>
                <td>{{shop.postalCode}}</td>
                <td>
                  <CSwitch
                    color="success"
                    size="lg"
                    v-bind="labelIcon"
                    :checked="shop.isActive"
                    v-on:update:checked="changeStatus"/>
                </td>
              </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "Shops",
    data() {
      return {
        labelIcon: {
          labelOn: '\u2713',
          labelOff: '\u2715'
        },
        shops: []
      }
    },
    methods: {
      loadData() {
        axios.get("/shop")
          .then((response) => {
            this.shops = response.data.data;
            console.log(shops);
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          })
      },
      changeStatus(status, e) {

      }
    },
    created() {
      this.loadData();
    }
  }
</script>

<style scoped>

</style>