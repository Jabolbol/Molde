<template xmlns:src="http://www.w3.org/1999/xhtml">
    <div>
        <div class="row">
            <div class="col-md-6">
                <br>
                <br>
                <h4>Create new data</h4>
                <br>
                <!-- prevent form submit untuk reload halaman, kemudian memanggil function addData() -->
                <form @submit.prevent="addData" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Shop Name</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Nama Toko"
                                v-model="form.shopName"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>App Name</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masu kkan Nama Aplikasi"
                                v-model="form.appName"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Logo</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.appLogo"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Background</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.appBackground"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Font Color</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.appFontColor"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Layout</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.prodLayout"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="form.category"
                                required
                        >
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
                form: {
                    shopName: '',
                    appName: '',
                    appLogo: '',
                    appBackground: '',
                    appFontColor: '',
                    prodLayout: '',
                    category: ''
                }
            }
        },
        methods: {
            addData() {
                // post data ke api menggunakan axios
                const formData = new FormData();
                formData.set('name', this.shopName);
                formData.set('description', this.appName);
                formData.set('weight', this.appLogo);
                formData.set('price', this.appBackground);
                formData.set('stock', this.appFontColor);
                formData.set('stock', this.prodLayout);
                formData.set('stock', this.category);

                axios({
                    method: 'post',
                    url: 'http://localhost:9000/molde/api/v1/request/create',
                    data: FormData,
                    headers: {'Content-Type': 'multipart/form-data, boundary=${form._boundary}', }
                })

                // axios.post('http://localhost:9000/molde/api/v1/product/add', {
                //         name: this.form.name,
                //         description: this.form.description,
                //         weight: this.form.weight,
                //         prize: this.form.prize,
                //         stock: this.form.stock
                // })
                    .then(response => {
                        // push router ke read data
                        this.$router.push("/");
                    });
            }
        }
    };

</script>
