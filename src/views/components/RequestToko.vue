<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>Request Toko</h1>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="addData">
              <CInput
                label="Nama Toko"
                v-model="shopName"
                required
                horizontal
              />
              <CInput
                label="Nama Aplikasi"
                v-model="appName"
                required
                horizontal
              />
              <CInput
                label="Background Aplikasi"
                v-model="appBackground"
                required
                horizontal
              />
              <CInput
                label="Warna Tulisan"
                v-model="appFontColor"
                required
                horizontal
              />
              <CInput
                label="Layout Produk"
                v-model="prodLayout"
                required
                horizontal
              />
              <div role="group" class="form-group form-row">
                <label class="col-form-label col-sm-3">Jenis Toko</label>
                <div class="col-sm-9">
                  <select class="form-control" v-model="category">
                    <option v-for="option in categories" v-bind:value="option.id">
                      {{option.name}}
                    </option>
                  </select>
                </div>
              </div>
              <CButton style="float: right; margin: 10px 0px 0px;" type="submit" color="success">Tambah</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        shopName: '',
        appName: '',
        appLogo: '',
        appBackground: '',
        appFontColor: '',
        prodLayout: '',
        category: '',
        categories: []
      }
    },
    methods: {
      getCategories() {
        axios.get("/category/get")
          .then((response) => {
            this.categories = response.data.data;
            console.log(this.categories);
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          })
      },
      addData() {
        const formData = new FormData();
        formData.set('shopName', this.shopName);
        formData.set('appName', this.appName);
        formData.set('appLogo', this.appLogo);
        formData.set('appBackground', this.appBackground);
        formData.set('appFontColor', this.appFontColor);
        formData.set('prodLayout', this.prodLayout);
        formData.set('category', this.category);

        axios({
          method: 'post',
          url: '/request/create',
          data: formData,
        })
          .then(() => {
            this.$router.push("/");
          });
      }
    },
    created() {
      this.getCategories();
    }
  };

</script>
