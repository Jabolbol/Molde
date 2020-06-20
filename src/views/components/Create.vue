<template xmlns:src="http://www.w3.org/1999/xhtml">
    <div>
        <div class="row">
            <div class="col-md-6">
                <br>
                <br>
                <h4>Create new data</h4>
                <br>
                <!-- prevent form submit untuk reload halaman, kemudian memanggil function addData() -->
                <form @submit.prevent="addData">
                    <div class="form-group">
                        <label>Nama Barang</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan nama barang"
                                v-model="name"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Deskripsi</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="description"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Berat</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="weight"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="price"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
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
                name: '',
                description: '',
                weight: '',
                price: '',
                stock: '',
                image: null
            }
        },
        methods: {
            uploadImage(event) {
                console.log(event)
                this.image = event.target.files[0]
            },

            addData() {
                // post data ke api menggunakan axios
                const formData = new FormData();
                formData.set('name', this.name);
                formData.set('description', this.description);
                formData.set('weight', this.weight);
                formData.set('price', this.price);
                formData.set('stock', this.stock);
                formData.append('image', this.image, this.image.name);

                axios({
                    method: 'post',
                    url: 'http://localhost:9000/molde/api/v1/product/add',
                    data: formData,
                })
                    .then(response => {
                        // push rou ter ke read data
                        this.$router.push("/components/products");
                    });
            }
        }
    };

</script>
