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
                        <label>Shop Name</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Nama Toko"
                                v-model="shopName"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>App Name</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masu kkan Nama Aplikasi"
                                v-model="appName"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Logo</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="appLogo"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Background</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="appBackground"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Font Color</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="appFontColor"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Layout</label>
                        <input
                                type="textfield"
                                class="form-control"
                                placeholder="Masukkan Deskripsi"
                                v-model="prodLayout"
                                required
                        >
                    </div>
                    <div class="form-group">
                        <label>Kategory</label>
                        <select class="form-control" v-model="category">
                            <option value="1">Makanan & Minuman</option>
                            <option value="2">Fashion</option>
                            <option value="3">Elektronik</option>
                            <option value="3">Perlengkapan Rumah</option>
                            <option value="3">Ibu & Bayi</option>
                        </select>
<!--                        <CSelect-->
<!--                               :options="['Makanan & Minuman',-->
<!--                               'Fashion',-->
<!--                               'Elektronik',-->
<!--                               'Kesehatan',-->
<!--                               'Perlengkapan rumah']"-->
<!--                               v-model="category"-->
<!--                        />-->
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
                shopName: '',
                appName: '',
                appLogo: '',
                appBackground: '',
                appFontColor: '',
                prodLayout: '',
                category: ''
            }
        },
        methods: {
            addData() {
                // post data ke api menggunakan axios
                const formData = new FormData();
                formData.set('shopName', this.shopName);
                formData.set('appName', this.appName);
                formData.set('appLogo', this.appLogo);
                formData.set('appBackground', this.appBackground);
                formData.set('appFontColor', this.appFontColor);
                formData.set('prodLayout', this.prodLayout);
                formData.set('category', this.category);

                axios({
                    method: 'post',
                    url: 'http://localhost:9000/molde/api/v1/request/create',
                    data: formData,
                })
                    .then(response => {
                        console.log(response)
                        // push router ke read data
                        this.$router.push("/");
                    });
            }
        }
    };

</script>
