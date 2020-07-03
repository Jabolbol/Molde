<template>
  <div>
    <div class="row">
      <div class="col-md-5">
        <img :src="'http://localhost:9000' + product.image" :alt="product.name"
             class="card-img-top">
      </div>
      <div class="col-sm-6">
        <h3> {{product.name}} </h3>
        <br>
        <div class="form-group">
          <label>Berat</label>
          <input class="form-control"
                 v-model="product.weight"
                 disabled
          />
        </div>
        <div class="form-group">
          <label>Harga</label>
          <input type="text" class="form-control"
                 v-model="product.price"
                 disabled
          />
        </div>
        <div class="form-group">
          <label>Stock</label>
          <input type="text" class="form-control"
                 v-model="product.stock"
                 disabled
          />
        </div>
        <div class="form-group">
          <label>Deskripsi</label>
          <input type="text" class="form-control"
                 v-model="product.description"
                 disabled
          />
        </div>
      </div>
    </div>
    <div class="container">
      <router-link class="btn btn-warning" :to="'/components/productUpdate/'+product.id">Update</router-link>
      <button class="btn btn-danger" v-on:click="deleteData(product.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      product: []
    };
  },
  created() {
    // load data saat pertama kali halaman dibuka
    this.loadData();
  },
  methods: {
    loadData() {
      // load data berdasarkan id
      axios
        .get("http://localhost:9000/molde/api/v1/product/" + this.$route.params.id + "/detail")
        .then(response => {
          this.product = response.data.data
        });
    },
    deleteData(id) {
      // delete data
      axios.delete("http://localhost:9000/molde/api/v1/product/" + id + "/delete").then(response => {
        this.loadData();
      });
    },
  }
};
</script>

<style>
  .container {
    padding: 5%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    /*position: absolute;*/
  }
  .container .btn-warning {
  }
</style>
