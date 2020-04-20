y <template xmlns:src="http://www.w3.org/1999/xhtml">
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
                                v-model="form.price"
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
                form: {
                    name: '',
                    description: '',
                    weight: '',
                    price: '',
                    stock: '',
                    image: null
                }
            }
        },
        methods: {
            uploadImage(event){
                console.log(event)
                this.image = event.target.files[0]
            },

            addData() {
        //         console.log(this.$store);
        //         const token = "";
        //         const formData = new FormData;
        //         formData.append('name', 'name');
        //         formData.append('description', 'description');
        //         formData.append('weight', 'weight');
        //         formData.append('prize', 'prize');
        //         formData.append('stock', 'stock');
        //
        //             this.$store.dispatch("Product", {
        //                 name: this.name,
        //                 description: this.description,
        //                 wight: this.wight,
        //                 prize: this.price,
        //                 stock: this.stock
        //             })
        //
        //                 .then(success => {
        //                     this.$router.push("/")
        //                 })
        //                 .catch(error => {
        //                     alert("Product Failed")
        //                     this.error = true;
        //                 })
        //         }
        //     }
        // };

                // post data ke api menggunakan axios
                const formData = new FormData();
                formData.set('name', this.name);
                formData.set('description', this.description);
                formData.append('weight', this.weight);
                formData.append('price', this.price);
                formData.append('stock', this.stock);
                formData.append('image', this.image, this.image.name);

                axios({
                    method: 'post',
                    url: 'http://localhost:9000/molde/api/v1/product/add',
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
