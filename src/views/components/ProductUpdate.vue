<template xmlns:src="http://www.w3.org/1999/xhtml">
    <div>
        <div class="col-md-4">
            <h3>Update Product</h3>
            <br>
        </div>
        <div class="col-md-6">
            <!-- prevent form submit untuk reload halaman, kemudian memanggil function updateData() -->
            <form @submit.prevent="updateData()">
                <div class="form-group">
                    <label>Nama Barang</label>
                    <input
                            type="textfield"
                            class="form-control"
                            v-model="product.name"
                            required
                    >
                </div>
                <div class="form-group">
                    <label>Deskripsi</label>
                    <input
                            type="textfield"
                            class="form-control"
                            v-model="product.description"
                            required
                    >
                </div>
                <div class="form-group">
                    <label>Berat</label>
                    <input
                            type="textfield"
                            class="form-control"
                            v-model="product.weight"
                            required
                    >
                </div>
                <div class="form-group">
                    <label>Harga</label>
                    <input
                            type="textfield"
                            class="form-control"
                            v-model="product.price"
                            required
                    >
                </div>
                <div class="form-group">
                    <label>Stock</label>
                    <input
                            type="textfield"
                            class="form-control"
                            v-model="product.stock"
                            required
                    >
                </div>
                <div class="form-group">
                    <input type="file" accept="image/*" id="product.image" @change="uploadImage">
                </div>
                <div>
                    <button class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                product: {
                    name: '',
                    description: '',
                    weight: '',
                    price: '',
                    stock: '',
                    image: null
                },
            }
        },
        created() {
            // load data saat pertama kali halaman dibuka
            this.loadData();
        },
        methods: {
            uploadImage(event) {
                this.product.image = event.target.files[0]
            },
            loadData() {
                // load data berdasarkan id
                axios
                    .get("http://localhost:9000/molde/api/v1/product/" + this.$route.params.id + "/detail")
                    .then(response => {
                        // this.product = response.data.data
                        // post value yang dari response ke form
                        console.log(response.data.data)
                        this.product.name = response.data.data.name;
                        this.product.description = response.data.data.description;
                        this.product.weight = response.data.data.weight;
                        this.product.price = response.data.data.price;
                        this.product.stock = response.data.data.stock;
                    });
            },
            updateData() {
                const formData = new FormData();
                formData.set('name', this.product.name);
                formData.set('description', this.product.description);
                formData.set('weight', this.product.weight);
                formData.set('price', this.product.price);
                formData.set('stock', this.product.stock);
                formData.append('image', this.product.image, this.product.image.name);
                axios
                    .put("http://localhost:9000/molde/api/v1/product/" + this.$route.params.id + "/update", formData)
                    .then(response => {
                        this.$router.push("/components/productList");
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.log(err)
                    })
            }
        }
    }
</script>
