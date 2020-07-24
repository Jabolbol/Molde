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
              <CSelect
                label="Background Aplikasi"
                :options="backgroundList"
                v-on:update:value="selectBackground($event)"
                required
                horizontal
              />
              <CSelect
                label="Warna Tulisan"
                :options="fontColorList"
                v-on:update:value="selectFontColor($event)"
                required
                horizontal
              />
              <CSelect
                label="Layout Produk"
                :options="layoutList"
                v-on:update:value="selectProdLayout($event)"
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
              <CButton class="float-right" type="submit" color="success">Tambah</CButton>
              <router-link class="btn btn-danger float-right" style="margin-right: 5px" to="/dashboard">Batal
              </router-link>
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
        backgroundList: [
          {label: 'Putih', value: 'white'},
          {label: 'Merah', value: 'red'},
          {label: 'Biru', value: 'blue'}
        ],
        fontColorList: [
          {label: 'Putih', value: 'white'},
          {label: 'Jingga', value: 'orange'},
        ],
        layoutList: [
          {label: 'Linear Layout', value: 'linear'},
          {label: 'Grid Layout', value: 'grid'},
        ],
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
      selectBackground(data) {
        this.appBackground = data;
      },
      selectFontColor(data) {
        this.appFontColor = data;
      },
      selectProdLayout(data) {
        this.prodLayout = data;
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
              if (message === "App name already exists") {
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
