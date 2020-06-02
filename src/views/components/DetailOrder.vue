<template>
  <div>
    <!-- disini saya menggunakan bootstrap untuk design tabel nya. secara default bootstrap sudah di include di file welcome.blade.php jadi saya tidak perlu lagi untuk import file nya -->
    <div class="row">
      <div class="col-md-12">
        <br>
        <br>
        <div class="row">
          <div class="col-md-10">
            <h4>Products</h4>
          </div>
          <div class="colmd-2">
            <!-- push router ke form membuat data -->
            <router-link class="btn btn-primary w-100" to="create">+ Tambah</router-link>
          </div>
        </div>
        <br>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Transaction No</th>
            <th scope="col">Total Harga</th>
            <th scope="col">Total Pembayaran</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          <!-- menampilkan data ke table -->
          <tr v-for="order in orders" :key="order.id">
            <td style="width:40%">{{order.transactionNo}}</td>
            <td style="width:40%">{{order.totalPrice}}</td>
            <td style="width:40%">{{order.totalPaymentPrice}}</td>
            <td style="width:40%">{{order.status}}</td>
            <td style="width:20%">
              <button class="btn btn-warning" data-toogle="modal" data-target="#modal-template">Detail</button>
              <button class="btn btn-danger" v-on:click="deleteData(order.id)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div id="modal-template" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Shopping cart</h5>
            <button class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            Shopping cart items will go here.
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">Keep shopping</button>
            <button class="btn btn-primary">Check out</button>
          </div>
        </div>
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
        orders: [],
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        // fetch data dari api menggunakan axios
        axios.get("http://localhost:9000/molde/api/v1/order/shop/get").then(response => {
          // mengirim data hasil fetch ke varibale array persons
          this.orders = response.data.data;
        });
      },
      editModalWindow(order){
        this.editMode = true
        $('#addNew').modal('show');
        this.form.fill(order)
      },
      updateUser(){
        this.form.put('http://localhost:9000/molde/api/v1/order/'+this.form.id+'/edit')
                .then(()=>{

                  Toast.fire({
                    icon: 'success',
                    title: 'User updated successfully'
                  })

                  Fire.$emit('AfterCreatedUserLoadIt');

                  $('#addNew').modal('hide');
                })
                .catch(()=>{
                  console.log("Error.....")
                })
      },
      deleteData(id) {
        // delete data
        axios.delete("http://localhost:8000/api/person/" + id).then(response => {
          this.loadData();
        });
      }
    }
  };
</script>
