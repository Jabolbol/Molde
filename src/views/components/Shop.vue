<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>Detail Toko</h1>
          </CCardHeader>
          <CCardBody>
            <CInput
              label="Nama"
              v-model="shop.name"
              disabled
              horizontal
            />
            <CInput
              label="Provinsi"
              v-model="shop.province"
              disabled
              horizontal
            />
            <CInput
              label="Kabupaten/Kota"
              v-model="shop.city"
              disabled
              horizontal
            />
            <CInput
              label="Nama Jalan"
              v-model="shop.street"
              disabled
              horizontal
            />
            <CInput
              label="Kode Pos"
              v-model="shop.postalCode"
              disabled
              horizontal
            />
            <CButton class="btn btn-primary float-right" @click="showModal">Ubah Alamat</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h1 style="margin-top: 15px;">Ubah Alamat</h1>
        <button type="button" class="btn-close" @click="closeModal">X</button>
      </template>
      <template v-slot:body>
        <CRow>
          <CCol>
            <CForm>
              <CSelect
                label="Provinsi"
                :options="provinces"
                v-model="updateRequest.provinceId"
                onchange="loadCities"
                required
                horizontal
              />
              <CSelect
                label="Kabupaten/Kota"
                :options="cities"
                v-model="updateRequest.cityId"
                required
                horizontal
              />
            </CForm>
          </CCol>
        </CRow>
      </template>
      <template v-slot:footer>

      </template>
    </modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import Modal from "./Modal";

  export default {
    name: "Shop",
    components: {Modal},
    data() {
      return {
        isModalVisible: false,
        shop: {},
        provinces: [],
        cities: [],
        updateRequest: {
          provinceId: 0,
          province: '',
          cityId: 0,
          city: '',
          street: '',
          postalCode: ''
        }
      }
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      loadData() {
        axios.get("/shop/get")
          .then((response) => {
            this.shop = response.data.data;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
            }
          })
      },
      loadProvinces() {
        axios.get("/rajaongkir/province")
          .then((response) => {
            this.provinces = response.data.rajaongkir.results.map(p => {
              const obj = {
                value: p.province_id,
                label: p.province
              };
              return obj;
            });
          })
          .catch((error) => {
            console.log(error);
          })
      },
      loadCities() {
        axios.get(`/rajaongkir/cities?province=${updateRequest.provinceId}`)
          .then((response) => {
            this.cities = response.data.rajaongkir.results.map(c => {
              const obj = {
                value: c.city_id,
                label: c.city
              };
              return obj;
            });
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    created() {
      this.loadData();
      this.loadProvinces();
      this.loadCities();
    }
  }
</script>
