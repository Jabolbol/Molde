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
                                v-model="form.firstName"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Deskripsi</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.lastName"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Berat</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.lastName"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Harga</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.lastName"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.lastName"
                                required
                        >
                    </div>
                    <div>
                        <input type="file" id="gambar_profil">
                        <button id="btnUpload"></button>
                    </div>

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
                    firstName: '',
                    lastName: ''
                }
            }
        },
        methods: {
            addData() {
                // post data ke api menggunakan axios
                axios
                    .post("http://localhost:8000/api/person", {
                        first_name: this.form.firstName,
                        last_name: this.form.lastName
                    })
                    .then(response => {
                        // push router ke read data
                        this.$router.push("/");
                    });
            }
        }
    };
</script>
