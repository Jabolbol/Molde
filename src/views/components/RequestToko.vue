<template>
  <div>
    <CRow>
      <CCol>
        <CAlert
          :show.sync="dismissCountDown"
          closeButton
          :color="alertColor"
        >
          {{alertMessage}}
          <CProgress
            color="info"
            :max="dismissSecs"
            :value="dismissCountDown"
            height="4px"
          />
        </CAlert>
        <CCard>
          <CCardHeader>
            <h1>Request Toko</h1>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="createRequest">
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
                disabled
                required
                horizontal
              />
              <CInput
                label="Warna Tulisan"
                v-model="appFontColor"
                disabled
                required
                horizontal
              />
              <CInput
                label="Layout Produk"
                v-model="prodLayout"
                disabled
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
        appBackground: 'Putih',
        appFontColor: 'Orange',
        prodLayout: 'Linear Layout',
        category: '',
        categories: [],
        dismissSecs: 0,
        dismissCountDown: 0,
        alertColor: '',
        alertMessage: ''
      }
    },
    methods: {
      showAlert(color, message) {
        this.alertColor = color;
        this.dismissCountDown = 3;
        this.dismissSecs = 3;
        this.alertMessage = message;
      },
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
      createRequest() {
        const formData = new FormData();
        formData.set('shopName', this.shopName);
        formData.set('appName', this.appName);
        formData.set('appLogo', this.appLogo);
        formData.set('appBackground', this.appBackground);
        formData.set('appFontColor', this.appFontColor);
        formData.set('prodLayout', this.prodLayout);
        formData.set('category', this.category);

        axios.post('/request/create', formData)
          .then((response) => {
            if (response.data.code === 400) {
              const message = response.data.message;
              if(message === "App name already exists") {
                this.showAlert("danger", "Nama aplikasi telah digunakan");
              } else {
                this.showAlert("danger", "Nama toko telah digunakan");
              }
            } else {
              this.$router.push("/");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    created() {
      this.getCategories();
    }
  };

</script>
