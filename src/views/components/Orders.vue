<template>
    <div>
        <!-- disini saya menggunakan bootstrap untuk design tabel nya. secara default bootstrap sudah di include di file welcome.blade.php jadi saya tidak perlu lagi untuk import file nya -->
        <div class="row">
            <div class="col-md-12">
                <br>
                <br>
                <div class="row">
                    <div class="col-md-10">
                        <h4>Orders</h4>
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
                        <td style>{{order.transactionNo}}</td>
                        <td style>{{order.totalPrice}}</td>
                        <td style>{{order.totalPaymentPrice}}</td>
                        <td style>{{order.status}}</td>
                        <td style="width:20%">
                            <button class="btn btn-primary" v-on:click="acceptOrder(order.id)">Accept</button>
                            <button class="btn btn-danger" v-on:click="cancelOrder(order.id)">Cancel</button>
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
                orders: [],
                model: {}
            };
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                // fetch data dari api menggunakan axios
                axios.get("http://localhost:9000/molde/api/v1/order/shop/get").then(response => {
                    // mengirim data hasil fetch ke varibale array persons
                    console.log(response.data.data)
                    this.orders = response.data.data;
                });
            },
            updateData(order) {
                this.model = Object.assign({}, order)
            },
            acceptOrder(id) {
                axios.post("http://localhost:9000/molde/api/v1/order/" + id + "/accept").then(response => {
                    this.loadData();
                });
            },
            cancelOrder(id) {
                axios.post("http://localhost: 9000/molde/api/v1/order/" + id + "/cancel").then(response => {
                    this.loadData();
                });
            }
        }
    };
</script>
