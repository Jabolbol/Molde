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
                    <div class="col-md-2">
                        <button class="btn btn-primary w-100" @click="exportOrder">Export</button>
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
                            <button type="button" class="btn btn-primary" @click="showModal(order)">Detail</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <modal v-show="isModalVisible" @close="closeModal">
            <template v-slot:header>
                <h1>Detail Produk</h1>
                <button type="button" class="btn-close" @click="closeModal">X</button>
            </template>
            <template v-slot:body>
                <div class="form-group">
                    <label>Kota Tujuan</label>
                    <input type="text" class="form-control" disabled
                           v-model="currOrder.shipment.destinationCity"
                           horizontal
                    />
                </div>
                <div class="form-group">
                    <label>Kota Tujuan</label>
                    <input type="text" class="form-control" disabled
                           v-model="currOrder.shipment.destinationCity"
                    />
                </div>
                <div class="form-group">
                    <label>Kota Tujuan</label>
                    <input type="text" class="form-control" disabled
                           v-model="currOrder.shipment.destinationCity"
                    />
                </div>
                <div class="form-group">
                    <label>Alamat</label>
                    <input type="text" class="form-control" disabled
                           v-model="currOrder.shipment.address" horizontal
                    />
                </div>
                <div class="form-group">
                    <label>Kurir</label>
                    <input type="text" class="form-control" disabled
                           v-model="currOrder.shipment.courier"
                    />
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <input type="text" class="form-control" disabled
                           v-model="currOrder.status"
                    />
                </div>
            </template>
            <template v-slot:footer>
                <router-link class="btn btn-warning" :to="'updateResi/'+currOrder.id">Update Resi</router-link>
                <button class="btn btn-primary" v-on:click="acceptOrder(order.id)">Accept</button>
            </template>
        </modal>

    </div>
</template>

<script>
    import Axios from 'axios';
    import axios from 'axios';
    import modal from "./Modal";

    export default {
        components: {
            modal,
        },
        data() {
            return {
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
                axios.get("/order/shop/get").then(response => {
                    console.log(response.data.data)
                    this.orders = response.data.data;
                });
            },
            acceptOrder(id) {
                axios.post("/order/" + id + "/accept").then(response => {
                    this.loadData();
                });
            },
            cancelOrder(id) {
                axios.post("/order/" + id + "/cancel").then(response => {
                    this.loadData();
                });
            },
            exportOrder() {
                Axios({
                    url: '/order/export',
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');

                    link.href = url;
                    link.setAttribute('download', 'orders.xlsx');
                    document.body.appendChild(link);
                    link.click();
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    };
</script>
