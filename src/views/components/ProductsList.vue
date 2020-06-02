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

                <div class="row">
                    <div class="col-md-3" v-for="product in products">
                        <div class="card">
                            <img :src="product.image" :alt="product.name" class="card-img-top">
                            <div class="card-body">
                                <h4 class="card-title">{{ product.name }}</h4>
                                <div class="card-text">{{ product.price}}</div>
                                <div class="row justify-content-end">
                                    <router-link class="btn btn-primary" to="productsUpdate">Detail</router-link>
                                </div>
                            </div>
                        </div>
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
