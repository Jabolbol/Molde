<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>Tambah Produk</h1>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="addData">
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
                required
                horizontal
                @change="uploadImage"
              />
              <CButton style="float: right; margin: 10px 0px 0px;" type="submit" color="success">Tambah
              </CButton>
              <router-link class="btn btn-danger" style="float: right; margin: 10px 10px 0px;"
                           to="/components/products-list">Batal
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
        name: '',
        description: '',
        weight: '',
        price: '',
        stock: '',
        image: null
      }
    },
    methods: {
      uploadImage(event) {
        this.image = event[0]
      },
      addData() {
        const formData = new FormData();
        formData.set('name', this.name);
        formData.set('description', this.description);
        formData.set('weight', this.weight);
        formData.set('price', this.price);
        formData.set('stock', this.stock);
        formData.append('image', this.image, this.image.name);

        axios({
          method: 'post',
          url: 'http://localhost:9000/molde/api/v1/product/add',
          data: formData,
        })
          .then(() => {
            this.$router.push("/components/products-list");
          });
      }
    }
  };

</script>
