<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <br />
        <br />
        <div class="row">
          <div class="col-md-10">
            <h4>Manage Bank</h4>
          </div>
          <div class="col-md-2">
            <router-link class="btn btn-primary w-100" to="Bank">+ Tambah</router-link>
          </div>
        </div>
        <br />
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Bank Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bank in banks" :key="bank.id">
              <td style="width:40%">{{bank.name}}</td>
              <td style="width:20%">
                <router-link class="btn btn-warning"  @click="edit(bank.id)" :to="'/bankUpdate/'+bank.id ">Update</router-link>
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
import axios from "axios";
export default {
  data() {
    return {
      // variable array yang akan menampung hasil fetch dari api
      banks: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      // fetch data dari api menggunakan axios
      axios.get("bank/get").then(response => {
        // mengirim data hasil fetch ke varibale array persons
        console.log(response);
        this.banks = response.data.data;
      });
      // axios.get("http://localhost:9000/molde/api/v1/bank").then(response => {
      //     // mengirim data hasil fetch ke varibale array persons
      //     console.log(response.data.data)
      //     this.bank = response.data.data;
      //   });
    },
    deleteData(id) {
      // delete data
      axios
        .delete("http://localhost:9000/molde/api/v1/banks" + id +"/remove")
        .then(response => {
          this.loadData();
        });

        //  axios.delete("http://localhost:9000/molde/api/v1/bank" + id).then(response => {
        //   this.loadData();
        // });
    }
  }
};
</script>
