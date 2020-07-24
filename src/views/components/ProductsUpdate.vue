<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>Ubah Produk</h1>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol col="4">
                <img :src="'http://localhost:9000' + this.image" :alt="name" class="card-img-top">
              </CCol>
              <CCol col="8">
                <CForm @submit.prevent="updateData">
                  <CInput
                    label="Nama"
                    v-model="name"
                    required
                    horizontal
                  />
                  <CTextarea
                    label="Deskripsi"
                    description="Deskripsikan produk secara singkat padat dan jelas"
                    rows="6"
                    v-model="description"
                    required
                    horizontal
                  />
                  <CInput
                    label="Berat"
                    description="Masukkan berat dalam satuan gram, contoh: 1000 (1 Kg)"
                    v-model="weight"
                    required
                    horizontal
                  />
                  <CInput
                    label="Harga"
                    v-model="price"
                    required
                    horizontal
                  />
                  <CInput
                    type="number"
                    label="Stok"
                    v-model="stock"
                    required
                    horizontal
                  />
                  <CInputFile
                    label="Gambar"
                    custom
                    horizontal
                    @change="uploadImage"
                  />
                  <CButton style="float: right; margin: 10px 0px 0px;" type="submit" color="success">
                    Ubah
                  </CButton>
                  <router-link class="btn btn-danger" style="float: right; margin: 10px 10px 0px;"
                               to="/components/products-list">Batal
                  </router-link>
                </CForm>
              </CCol>
            </CRow>
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
        id: '',
        name: '',
        description: '',
        weight: '',
        price: '',
        stock: '',
        image: '',
        newImage: null
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        axios
          .get("/product/" + this.$route.params.id + "/detail")
          .then(response => {
            const product = response.data.data;
            this.name = product.name;
            this.description = product.description;
            this.weight = product.weight;
            this.price = product.price;
            this.stock = product.stock;
            this.image = product.image;
          });
      },
      uploadImage(event) {
        this.newImage = event[0]
      },
      updateData() {
        const formData = new FormData();
        formData.set('name', this.name);
        formData.set('description', this.description);
        formData.set('weight', this.weight);
        formData.set('price', this.price);
        formData.set('stock', this.stock);
        if (this.newImage != null) {
          formData.append('image', this.newImage, this.newImage.name);
        }

        axios
          .put("/product/" + this.$route.params.id + "/update", formData)
          .then(() => {
            this.$router.push('/components/products-list')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
</script>
