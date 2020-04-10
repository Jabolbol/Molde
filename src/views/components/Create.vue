<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <br>
                <br>
                <h4>Create new data</h4>
                <br>
                <!-- prevent form submit untuk reload halaman, kemudian memanggil function addData() -->
                <form @submit.prevent="addData()">
                    <div class="form-group">
                        <label>Nama Barang</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan nama barang"
                                v-model="form.name"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Deskripsi</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.description"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Berat</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.weight"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.prize"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.stock"
                                required
                        >
                    </div>
<!--                    <div>-->
<!--                        <input type="file" id="gambar_profil">-->
<!--                        <button id="btnUpload"></button>-->
<!--                    </div>-->

                    <button class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                form:{
                    name: '',
                    description: '',
                    wight: '',
                    prize: '',
                    stock: ''
                }
            }
        },
        methods: {
            addData() {
                // post data ke api menggunakan axios
                axios
                    .post("http://localhost:9000/molde/api/v1/product/add", {
                        name: this.form.name,
                        description: this.form.description,
                        weight: this.form.weight,
                        prize: this.form.prize,
                        stock: this.form.stock
                    })
                    .then(response => {
                        // push router ke read data
                        this.$router.push("/");
                    });
            }
        }
    };
</script>
