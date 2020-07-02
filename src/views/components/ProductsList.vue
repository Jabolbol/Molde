<template>
    <CRow>
<!--        <CCol>-->
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol col="8">
                            <h1>Daftar Produk</h1>
                        </CCol>
                        <CCol col="2">
                            <CButton block color="primary" @click="exportProduct">Export</CButton>
                        </CCol>
                        <CCol col="2">
                            <router-link class="btn btn-primary w-100" to="create">+ Tambah</router-link>
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol col="3" v-for="product in products" :key="product.id">
                            <div class="card">
                                <img
                                        :src="'http://localhost:9000' + product.image"
                                        :alt="product.name"
                                        class="card-img-top"
                                />
                                <div class="card-body">
                                    <h4 class="card-title">{{ product.name }}</h4>
                                    <div class="card-text">Rp. {{ product.price }}</div>
                                    <div class="row justify-content-end">
                                        <button type="button" class="btn btn-primary" @click="showModal(product)">Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>

<!--        </CCol>-->



        <modal v-show="isModalVisible" @close="closeModal">
            <template v-slot:header>
                <h1>Detail Produk</h1>
                <button type="button" class="btn-close" @click="closeModal">X</button>
            </template>
            <template v-slot:body>
                <div class="row">
                    <div class="col-md-4">
                        <img :src="'http://localhost:9000' + currProduct.image" :alt="currProduct.name"
                             class="card-img-top">
                    </div>
                    <div class="col-sm-6">
                        <h3> {{currProduct.name}} </h3>
                        <br>
                        <div class="form-group">
                            <label>Berat</label>
                            <input class="form-control"
                                   v-model="currProduct.weight"
                                   disabled
                            />
                        </div>
                        <div class="form-group">
                            <label>Harga</label>
                            <input type="text" class="form-control"
                                   v-model="currProduct.price"
                                   disabled
                            />
                        </div>
                        <div class="form-group">
                            <label>Stock</label>
                            <input type="text" class="form-control"
                                   v-model="currProduct.stock"
                                   disabled
                            />
                        </div>
                        <div class="form-group">
                            <label>Deskripsi</label>
                            <input type="text" class="form-control"
                                   v-model="currProduct.description"
                                   disabled
                                   horizontal
                            />
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <router-link class="btn btn-warning" :to="'productsUpdate/'+currProduct.id">Update</router-link>
                <button class="btn btn-danger" v-on:click="deleteData(product.id)">Delete</button>
            </template>
        </modal>
    </CRow>

<!--    <div class="products row">-->
<!--        <div class="col-md-12">-->
<!--            <div class="row">-->
<!--                <div class="col-md-8">-->
<!--                    <h1>Daftar Produk</h1>-->
<!--                </div>-->
<!--                <div class="col-md-2">-->

<!--                </div>-->
<!--                <div class="col-md-2">-->

<!--                </div>-->
<!--            </div>-->
<!--            <br/>-->
<!--            <div class="row">-->
<!--                <div class="col-md-3" v-for="product in products" :key="product.id">-->
<!--                    <div class="card">-->
<!--                        <img-->
<!--                                :src="'http://localhost:9000' + product.image"-->
<!--                                :alt="product.name"-->
<!--                                class="card-img-top"-->
<!--                        />-->
<!--                        <div class="card-body">-->
<!--                            <h4 class="card-title">{{ product.name }}</h4>-->
<!--                            <div class="card-text">Rp. {{ product.price }}</div>-->
<!--                            <div class="row justify-content-end">-->
<!--                                &lt;!&ndash; <router-link class="btn btn-primary" to="productsUpdate">Detail</router-link> &ndash;&gt;-->
<!--                                <button type="button" class="btn btn-primary" @click="showModal(product)">Detail-->
<!--                                </button>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            <modal v-show="isModalVisible" @close="closeModal">-->
<!--                <template v-slot:header>-->
<!--                    <h1>Detail Produk</h1>-->
<!--                    <button type="button" class="btn-close" @click="closeModal">X</button>-->
<!--                </template>-->
<!--                <template v-slot:body>-->
<!--                    <div class="row">-->
<!--                        <div class="col-md-4">-->
<!--                            <img :src="'http://localhost:9000' + currProduct.image" :alt="currProduct.name"-->
<!--                                 class="card-img-top">-->
<!--                        </div>-->
<!--                        <div class="col-sm-6">-->
<!--                            <h3> {{currProduct.name}} </h3>-->
<!--                            <br>-->
<!--                            <div class="form-group">-->
<!--                                <label>Berat</label>-->
<!--                                <input class="form-control"-->
<!--                                       v-model="currProduct.weight"-->
<!--                                       disabled-->
<!--                                />-->
<!--                            </div>-->
<!--                            <div class="form-group">-->
<!--                                <label>Harga</label>-->
<!--                                <input type="text" class="form-control"-->
<!--                                       v-model="currProduct.price"-->
<!--                                       disabled-->
<!--                                />-->
<!--                            </div>-->
<!--                            <div class="form-group">-->
<!--                                <label>Stock</label>-->
<!--                                <input type="text" class="form-control"-->
<!--                                       v-model="currProduct.stock"-->
<!--                                       disabled-->
<!--                                />-->
<!--                            </div>-->
<!--                            <div class="form-group">-->
<!--                                <label>Deskripsi</label>-->
<!--                                <input type="text" class="form-control"-->
<!--                                       v-model="currProduct.description"-->
<!--                                       disabled-->
<!--                                       horizontal-->
<!--                                />-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </template>-->
<!--                <template v-slot:footer>-->
<!--                    <router-link class="btn btn-warning" :to="'productsUpdate/'+currProduct.id">Update</router-link>-->
<!--                    <button class="btn btn-danger" v-on:click="deleteData(product.id)">Delete</button>-->
<!--                </template>-->
<!--            </modal>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script>
    import modal from "./Modal";
    import axios from "axios";
    import Axios from "axios";

    export default {
        name: "productsList",
        components: {
            modal
        },
        data() {
            return {
                products: [],
                currProduct: {},
                isModalVisible: false
            };
        },
        methods: {
            showModal(product) {
                this.currProduct = product;
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
            },
            loadData() {
                axios
                    .get("http://localhost:9000/molde/api/v1/product/all")
                    .then(response => {
                        this.products = response.data.data;
                    })
                    .catch((error) => {
                        if (error.message === "Request failed with status code 401") {
                            console.log(error);
                            this.$router.push("/pages/login");
                        }
                    });
            },
            deleteData(id) {
                axios.delete("http://localhost:9000/molde/api/v1/product/" + id + "/delete")
                    .then(() => {
                        this.loadData();
                    })
                    .catch((error) => {
                        if (error.message === "Request failed with status code 401") {
                            console.log(error);
                            this.$router.push("/pages/login");
                        }
                    });
                ;
            },
            exportProduct() {
                Axios({
                    url: '/product/export',
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');

                    link.href = url;
                    link.setAttribute('download', 'products.xlsx');
                    document.body.appendChild(link);
                    link.click();
                }).catch((error) => {
                    if (error.message === "Request failed with status code 401") {
                        console.log(error);
                        this.$router.push("/pages/login");
                    }
                });
            },
        },
        created() {
            this.loadData();
        }
    };
</script>

<style scoped>
    .products {
        padding: 10px;
        background: white;
        border-radius: 10px;
    }
</style>
