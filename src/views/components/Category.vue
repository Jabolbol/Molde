<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol col="10">
                <h4>Kelola Kategori</h4>
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
                  <th scope="col">Bank Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories" :key="category.id">
                  <td style="width:10%">{{category.id}}</td>
                  <td>{{category.name}}</td>
                  <td style="width:20%">
                    <button type="button" class="btn btn-warning" @click="updateModal(category)">Update</button>
                    <button class="btn btn-danger" v-on:click="deleteData(category.id)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <!-- Create Item Modal -->
    <modal v-show="isModalAdd">
    <template v-slot:header>
        <h4>Tambah Kategori</h4>
        <button type="button" class="btn-close" @click="closeAddModal">X</button>
    </template>
    <template v-slot:body>
        <div class="form-group">
            <label>Nama Bank</label>
            <input type="text" class="form-control"
                   v-model="addCategory.name"
            />
        </div>
    </template>
    <template v-slot:footer>
        <button class="btn btn-primary" v-on:click="addData()">Tambah</button>
    </template>
    </modal>
    <!-- Update Item Modal -->
    <modal v-show="isModalUpdate">
    <template v-slot:header>
        <h4>Update Kategori</h4>
        <button type="button" class="btn-close" @click="closeUpdateModal">X</button>
    </template>
    <template v-slot:body>
        <div class="form-group">
            <label>Nama Bank</label>
            <input type="text" class="form-control"
                   v-model="updateCategory.name"
            />
        </div>
    </template>
    <template v-slot:footer>
        <button class="btn btn-warning" v-on:click="updateData(updateCategory.id)">Update</button>
    </template>
    </modal>
  </div>
</template>

<!-- script js -->
<script>
    import axios from "axios";
    import modal from "./Modal";
    export default {
        components: {
            modal,
        },
        data() {
            return {
                isModalAdd: false,
                isModalUpdate: false,
                categories: [],
                addCategory: {},
                updateCategory: {},
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
                this.updateCategory = category;
                this.isModalUpdate = true;
            },
            closeUpdateModal() {
                this.isModalUpdate = false;
            },
            loadData() {
                // fetch data dari api menggunakan axios
                axios.get("http://localhost:9000/molde/api/v1/category/get").then(response => {
                    // mengirim data hasil fetch ke varibale array persons
                    console.log(response);
                    this.categories = response.data.data;
                });
            },
            addData() {
                const formData = new FormData();
                formData.set('id', this.addCategory.id);
                formData.set('name', this.addCategory.name);
                axios.post("http://localhost:9000/molde/api/v1/category/add", formData)
                    .then(response => {
                        this.isModalAdd = false;
                    });
            },
            deleteData(id) {
                // delete data
                axios
                    .delete("http://localhost:9000/molde/api/v1/category/" + id + "/remove").then(response => {
                    this.loadData();
                });
            },
            updateData(id) {
                const formData = new FormData();
                formData.set('name', this.updateBank.name);
                axios.put("http://localhost:9000/molde/api/v1/category/" + id + "/edit", formData)
                    .then(response => {
                        this.loadData();
                    });
            },
        }
    };
</script>
