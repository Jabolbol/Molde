<template>
  <div>
    <!-- disini saya menggunakan bootstrap untuk design tabel nya. secara default bootstrap sudah di include di file welcome.blade.php jadi saya tidak perlu lagi untuk import file nya -->
    <div class="row">
      <div class="col-md-12">
        <br>
        <br>
        <div class="row">
          <div class="col-md-8">
            <h4>Products</h4>
          </div>

          <div class="col-md-2">
            <!-- push router ke form membuat data -->
            <router-link class="btn btn-primary w-100" to="create">+ Tambah</router-link>
          </div>
        </div>
        <br>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Nama Barang</th>
            <th scope="col">Deskripsi</th>
            <th scope="col">Berat</th>
            <th scope="col">Harga</th>
            <th scope="col">Stock</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          <!-- menampilkan data ke table -->
          <tr v-for="product in products" :key="product.id">
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>{{product.weight}}</td>
            <td>{{product.price}}</td>
            <td>{{product.stock}}</td>
            <td style=" width:20%">
              <router-link class="btn btn-warning" :to="'/detail/'+product.id">Update</router-link>
              <button class="btn btn-danger" v-on:click="deleteData(product.id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<!-- script js -->
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        // variable array yang akan menampung hasil fetch dari api
        products: []
      };
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        // fetch data dari api menggunakan axios
        axios.get("http://localhost:9000/molde/api/v1/product/all").then(response => {
          console.log(response.data.data)
          // mengirim data hasil fetch ke varibale array persons
          this.products = response.data.data;
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
