<template xmlns:src="http://www.w3.org/1999/xhtml">
    <div>
        <div class="row">
            <div class="col-md-4">
                <h3>Update Products</h3>
                <br>
                <img :src="'http://localhost:9000/' + this.$route.params.id" :alt="name"
                     class="card-img-top">
            </div>
            <div class="col-md-6">
                <!-- prevent form submit untuk reload halaman, kemudian memanggil function updateData() -->
                <form @submit.prevent="updateData()">
                    <div class="form-group">
                        <label>Nama Barang</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="name"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Deskripsi</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="description"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Berat</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="weight"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="price"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input
                                type="textfield"
                                class="form-control"
                                v-model="stock"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <input type="file" accept="image/*" id="image" @change="uploadImage">
                    </div>
                    <div>
                        <button class="btn btn-primary">Submit</button>
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
                id: '',
                name: '',
                description: '',
                weight: '',
                price: '',
                stock: ''
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
                    .get("http://localhost:9000/molde/api/v1/product/" + this.$route.params.id + "/detail")
                    .then(response => {
                        // post value yang dari response ke form
                        this.name = response.data.data.name;
                        this.description = response.data.data.description;
                        this.weight = response.data.data.weight;
                        this.price = response.data.data.price;
                        this.stock = response.data.data.stock;
                    });
            },
            updateData() {
                axios
                .put("http://localhost:9000/molde/api/v1/product/" + this.$route.params.id + "/update", {
                    name: this.name,
                    description: this.description,
                    weight : this.weight,
                    price : this.price,
                    stock : this.stock,


                })
                    .then(_ => {
                        this.$router.push('/app')
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.log(err)
                    })
            }
        }
    }
</script>
