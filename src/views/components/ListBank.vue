<template>
  <div>
    <!-- disini saya menggunakan bootstrap untuk design tabel nya. secara default bootstrap sudah di include di file welcome.blade.php jadi saya tidak perlu lagi untuk import file nya -->
    <div class="row">
      <div class="col-md-12">
        <br>
        <br>
        <div class="row">
          <div class="col-md-10">
            <h4>Manage Bank</h4>
          </div>
          <div class="colmd-2">
            <!-- push router ke form membuat data -->
            <router-link class="btn btn-primary w-100" to="Bank">+ Tambah</router-link>
          </div>
        </div>
        <br>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Bank Name</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>    
          <tr v-for="bank in bank" :key="bank.id">
            <td style="width:40%">{{bank.bankName}}</td>
            <td style="width:20%">
              <router-link class="btn btn-warning" :to="'/listbank/'+bank.id">Update</router-link>
              <button class="btn btn-danger" v-on:click="deleteData(bank.id)">Delete</button>
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
        bank: []
      };
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        // fetch data dari api menggunakan axios
        axios.get("http://localhost:9000/molde/api/v1/bank").then(response => {
          // mengirim data hasil fetch ke varibale array persons
          this.bank = response.data;
        });
      },
      deleteData(id) {
        // delete data
        axios.delete("http://localhost:9000/molde/api/v1/bank" + id).then(response => {
          this.loadData();
        });
      }
    }
  };
</script>
