<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol col="8">
                <h1>Daftar Produk</h1>
              </CCol>
              <CCol col="2">
                <CButton block color="primary" @click="exportProduct">Export</CButton>
              </CCol>
              <CCol col="2">
                <router-link class="btn btn-primary w-100" to="create">+ Tambah</router-link>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol col="3" v-for="product in products" :key="product.id">
                <div class="card">
                  <img
                    :src="'http://localhost:9000' + product.image"
                    :alt="product.name"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h4 class="card-title">{{ product.name }}</h4>
                    <div class="card-text">Rp. {{ product.price }}</div>
                    <div class="row justify-content-end">
                      <button type="button" class="btn btn-primary" @click="showModal(product)">
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h1 style="margin-top: 15px;">Detail Produk</h1>
        <button type="button" class="btn-close" @click="closeModal">X</button>
      </template>
      <template v-slot:body>
        <CRow class="modal-row">
          <CCol col="6">
            <img class="card-img-top" :src="'http://localhost:9000' + currProduct.image"
                 :alt="currProduct.name">
          </CCol>
          <CCol col="6">
            <h4>Nama</h4>
            <CInput
              :value="currProduct.name"
              readonly
            />
            <h4>Deskripsi</h4>
            <CTextarea
              :value="currProduct.description"
              rows="6"
              readonly
            />
            <h4>Berat</h4>
            <CInput
              :value="currProduct.weight"
              readonly
            />
            <h4>Harga</h4>
            <CInput
              :value="currProduct.price"
              readonly
            />
            <h4>Stok</h4>
            <CInput
              :value="currProduct.stock"
              readonly
            />
          </CCol>
        </CRow>
      </template>
      <template v-slot:footer>
        <button class="btn btn-danger" v-on:click="deleteData(currProduct.id)">Hapus</button>
        <router-link class="btn btn-warning" style="color: white" :to="'products-update/' + currProduct.id">
          Ubah
        </router-link>
      </template>
    </modal>
  </div>
</template>

<script>
    import modal from "./Modal";
    import axios from "axios";
    import Axios from "axios";

    export default {
    name: "productsList",
    components: {
      modal
    },
    data() {
      return {
        products: [],
        currProduct: {},
        isModalVisible: false
      };
    },
    methods: {
      showModal(product) {
        this.currProduct = product;
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      loadData() {
        axios
          .get("http://localhost:9000/molde/api/v1/product/all")
          .then(response => {
            this.products = response.data.data;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });
      },
      deleteData(id) {
        axios.delete("http://localhost:9000/molde/api/v1/product/" + id + "/delete")
          .then(() => {
            this.loadData();
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });
        ;
      },
      exportProduct() {
        Axios({
          url: '/product/export',
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');

          link.href = url;
          link.setAttribute('download', 'products.xlsx');
          document.body.appendChild(link);
          link.click();
        }).catch((error) => {
          if (error.message === "Request failed with status code 401") {
            console.log(error);
            this.$router.push("/pages/login");
          }
        });
      },
    },
    created() {
      this.loadData();
    }
  };
</script>

<style scoped>
  .modal-row {
    max-width: 50vw;
    overflow-y: scroll;
    padding: 10px;
  }
</style>
