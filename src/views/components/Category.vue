<template>
    <div>
        <CRow>
            <CCol>
                <CCard>
                    <CCardHeader>
                        <CRow>
                            <CCol col="10">
                                <h1>Daftar Kategori</h1>
                            </CCol>
                            <CCol col="2">
                                <button type="button" class="btn btn-primary" @click="addModal()">+ Tambah</button>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="category in categories" :key="category.id">
                                <td style="width:10%">{{category.id}}</td>
                                <td>{{category.name}}</td>
                                <td style="width:20%">
                                    <button type="button" class="btn btn-warning" style="color: white;"
                                            @click="updateModal(category)">Update
                                    </button>
                                    &emsp;
                                    <button class="btn btn-danger" v-on:click="deleteData(category.id)">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>

        <modal v-show="isModalAdd">
            <template v-slot:header>
                <h3 style="margin-top: 15px;">Tambah Bank</h3>
                <button type="button" class="btn-close" @click="closeAddModal">X</button>
            </template>
            <template v-slot:body>
                <CRow>
                    <CCol>
                        <CInput
                                label="Nama"
                                v-model="categoryName"
                                horizontal
                        />
                    </CCol>
                </CRow>
            </template>
            <template v-slot:footer>
                <button class="btn btn-primary" v-on:click="addData()">Tambah</button>
            </template>
        </modal>

        <modal v-show="isModalUpdate">
            <template v-slot:header>
                <h4>Update Kategori</h4>
                <button type="button" class="btn-close" @click="closeUpdateModal">X</button>
            </template>
            <template v-slot:body>
                <CRow>
                    <CCol>
                        <CInput
                                label="Nama"
                                v-model="categoryName"
                                horizontal
                        />
                    </CCol>
                </CRow>
            </template>
            <template v-slot:footer>
                <button class="btn btn-warning" v-on:click="updateData()">Update</button>
            </template>
        </modal>
    </div>
</template>

<script>
    import axios from "axios";
    import modal from "./Modal";

    export default {
        name: "Category",
        components: {
            modal,
        },
        data() {
            return {
                categories: [],
                categoryId: 0,
                categoryName: "",
                isModalAdd: false,
                isModalUpdate: false,
            };
        },
        created() {
            this.loadData();
        },
        methods: {
            addModal() {
                this.isModalAdd = true;
            },
            closeAddModal() {
                this.isModalAdd = false;
            },
            updateModal(category) {
                this.categoryId = category.id;
                this.categoryName = category.name;
                this.isModalUpdate = true;
            },
            closeUpdateModal() {
                this.isModalUpdate = false;
            },
            loadData() {
                axios.get("/category/get")
                    .then(response => {
                        this.categories = response.data.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            addData() {
                axios.post(`/category/add?name=${this.categoryName}`)
                    .then(() => {
                        this.categoryName = "";
                        this.isModalAdd = false;
                        this.loadData();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            updateData() {
                axios.put(`/category/${this.categoryId}/update?name=${this.categoryName}`)
                    .then(() => {
                        this.categoryId = 0;
                        this.categoryName = "";
                        this.isModalUpdate = false;
                        this.loadData();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            deleteData(id) {
                axios.delete(`/category/${id}/delete`)
                    .then(() => {
                        this.loadData();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        }
    };
</script>
