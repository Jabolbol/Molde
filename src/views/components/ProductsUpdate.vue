<template xmlns:src="http://www.w3.org/1999/xhtml">
    <div>
        <div class="row">
            <div class="col-md-6">
                <br>
                <br>
                <h4>Create new data</h4>
                <br>
                <!-- prevent form submit untuk reload halaman, kemudian memanggil function addData() -->
                <form @submit.prevent="updateArticle(id)">
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
        mounted() {
            this.id = this.$route.params.id // id of the article
            this.fetchArticle(this.id)
        },
        methods: {
            /**
             * used to fetch the article to updated
             * @return {[type]} [description]
             */
            fetchArticle(id) {
                const URL = 'http://localhost:9000/molde/api/v1/product/'+id+'/detail'
                this.$axios({
                    method: 'get',
                    url: URL,
                })
                    .then(res => {
                        // eslint-disable-next-line
                        const { name, description } = res.data.data
                        // eslint-disable-next-line
                        this.article_title = name
                        // eslint-disable-next-line
                        this.article_description = description
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.log(err)
                    })
            },
            /**
             * [updateArticle used to Update Article]
             */
            updateArticle(id) {
                // eslint-disable-next-line
                const { name, description } = this
                const data = { name, description }
                const URL = 'http://localhost:9000/molde/api/v1/product/'+id+'/update'
                this.$axios({
                    method: 'put',
                    url: URL,
                    data: data
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
