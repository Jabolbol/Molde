<template xmlns:src="http://www.w3.org/1999/xhtml">
    <div>
        <div class="row">
            <div class="col-md-6">
                <br>
                <br>
                <h4>Update No Resi</h4>
                <br>
                <!-- prevent form submit untuk reload halaman, kemudian memanggil function updateData() -->
                <form @submit.prevent="updateData()">
                    <div class="form-group">
                        <label>Nama Penerima</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="recipient"
                                disabled="disabled"
                        >
                    </div>
                    <div class="form-group">
                        <label>No Handphone</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="recipientPhone"
                                disabled="disabled"
                        >
                    </div>
                    <div class="form-group">
                        <label>Kota Tujuan</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="destinationcity"
                                disabled="disabled"
                        >
                    </div>
                    <div class="form-group">
                        <label>Alamat</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="address"
                                disabled="disabled"
                        >
                    </div>
                    <div class="form-group">
                        <label>Kurir</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="courier"
                                disabled="disabled"
                        >
                    </div>
                    <div class="form-group">
                        <label>No Resi</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="airwayBill"
                                required
                        >
                    </div>
                    <div>
                        <button class="btn btn-primary" v-on:click="updateData()">Update Resi</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                recipient: '',
                recipientPhone: '',
                destinationCity: '',
                address: '',
                courier: '',
                airwayBill: ''
            }
        },
        created() {
            // load data saat pertama kali halaman dibuka
            this.loadData();
        },
        methods: {
            loadData() {
                // load data berdasarkan id
                axios
                    .get("http://localhost:9000/molde/api/v1/order/" + this.$route.params.id + "/get")
                    .then(response => {
                        // post value yang dari response ke form
                        this.address = response.data.data.shipment.address;
                        this.courier = response.data.data.shipment.courier;
                        this.destinationCity = response.data.data.shipment.destinationCity;
                        this.recipient = response.data.data.shipment.recipient;
                        this.recipientPhone = response.data.data.shipment.recipientPhone;
                        this.airwayBill = response.data.data.shipment.airwayBill;
                    });
            },
            updateData() {
                const formData = new FormData();
                formData.set('airwayBill', this.airwayBill);
                axios
                    .post("http://localhost:9000/molde/api/v1/order/" + this.$route.params.id + "/airway-bill", formData)
                    .then(response => {
                        this.$router.push('/components/orders')
                    });
            }
        }
    }
</script>
