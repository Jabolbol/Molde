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
                            <router-link class="btn btn-primary" :to="'orderDetail/'+order.id">Detail</router-link>
                            <router-link class="btn btn-primary" :to="'updateResi/'+order.id">Update Resi</router-link>
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
    import modal from "./Modal";
    export default {
        components: {
            modal,
        },
        data() {
            return {
                // variable array yang akan menampung hasil fetch dari api
                orders: [],
                currOrder: {},
                isModalVisible: false
            };
        },
        created() {
            this.loadData();
        },
        methods: {
            showModal(order) {
                this.currOrder = order;
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            loadData() {
                // fetch data dari api menggunakan axios
                axios.get("http://localhost:9000/molde/api/v1/order/shop/get?status=WAITING_FOR_PAYMENT_CONFIRMATION")
                    .then(response => {
                    // mengirim data hasil fetch ke varibale array persons
                    console.log(response.data.data)
                    this.orders.filter = response.data.data;
                    });
            },
        }
    };
</script>
