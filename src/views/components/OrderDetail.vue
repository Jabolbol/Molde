<template>
    <div>
        <!-- disini saya menggunakan bootstrap untuk design tabel nya. secara default bootstrap sudah di include di file welcome.blade.php jadi saya tidak perlu lagi untuk import file nya -->
        <div class="row">
            <div class="col-md-12">
                <div class="row">
                    <div class="col-md-10">
                        <h4>Detail Order</h4>
                    </div>
                </div>
                <br>
                <div class="form-group">
                    <label>Penerima</label>
                    <input type="text" class="form-control" disabled
                           v-model="order.shipment.recipient"
                           horizontal
                    />
                </div>
                <div class="form-group">
                    <label>No Telepon</label>
                    <input type="text" class="form-control" disabled
                           v-model="order.shipment.recipientPhone"
                    />
                </div>
                <div class="form-group">
                    <label>Kota Tujuan</label>
                    <input type="text" class="form-control" disabled
                           v-model="order.shipment.destinationCity"
                    />
                </div>
                <div class="form-group">
                    <label>Alamat</label>
                    <input type="text" class="form-control" disabled
                           v-model="order.shipment.address"
                    />
                </div>
                <div class="form-group">
                    <label>Kurir</label>
                    <input type="text" class="form-control" disabled
                           v-model="order.shipment.courier"
                    />
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <input type="text" class="form-control" disabled
                           v-model="order.status"
                    />
                </div>
                <div class="col-md-4">
                    <label>Bukti Pembayaran</label>
                    <img :src="'http://localhost:9000' + order.paymentImage" :alt="'Belum ada bukti pembayaran'"
                         class="card-img-top">
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
        order: [],
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        // fetch data dari api menggunakan axios
        axios.get("http://localhost:9000/molde/api/v1/order/" + this.$route.params.id + "/get")
            .then(response => {
                console.log(response.data.data)
                this.order = response.data.data;
        });
      }
    }
  };
</script>
