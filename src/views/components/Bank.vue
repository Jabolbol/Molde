<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol col="10">
                <h4>Kelola Bank</h4>
              </CCol>
              <CCol col="2">
                <CButton type="button" class="btn btn-primary" @click="addModal()">+ Tambah</CButton>
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
                <tr v-for="bank in banks" :key="bank.id">
                  <td style="width:10%">{{bank.id}}</td>
                  <td>{{bank.name}}</td>
                  <td style="width:20%">
                    <button type="button" class="btn btn-warning" @click="updateModal(bank)">Update</button>
                    <button class="btn btn-danger" v-on:click="deleteData(bank.id)">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </Ccol>
    </Crow>
    <!-- Create Item Modal -->
    <modal v-show="isModalAdd">
      <template v-slot:header>
        <h4>Tambah Bank</h4>
        <button type="button" class="btn-close" @click="closeAddModal">X</button>
      </template>
      <template v-slot:body>
        <div class="form-group">
          <label>Nama Bank</label>
          <input type="text" class="form-control"
                 v-model="addBank.name"
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
        <h4>Update Bank</h4>
        <button type="button" class="btn-close" @click="closeUpdateModal">X</button>
      </template>
      <template v-slot:body>
        <div class="form-group">
          <label>Nama Bank</label>
          <input type="text" class="form-control"
                 v-model="updateBank.name"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-warning" v-on:click="updateData(updateBank.id)">Update</button>
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
      // variable array yang akan menampung hasil fetch dari api
      banks: [],
      addBank: {
        id: '',
        name: ''
      },
      updateBank: {},
      isModalAdd: false,
      isModalUpdate: false
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
    updateModal(bank) {
      this.updateBank = bank;
      this.isModalUpdate = true;
    },
    closeUpdateModal() {
      this.isModalUpdate = false;
    },
    loadData() {
      // fetch data dari api menggunakan axios
      axios.get("http://localhost:9000/molde/api/v1/bank/get").then(response => {
        // mengirim data hasil fetch ke varibale array persons
        console.log(response);
        this.banks = response.data.data;
      });
    },
    addData() {
      const formData = new FormData();
      formData.set('id', this.addBank.id);
      formData.set('name', this.addBank.name);
      axios.post("http://localhost:9000/molde/api/v1/bank/add", formData)
              .then(response => {
                this.loadData();
              });
    },
    updateData(id) {
      const formData = new FormData();
      formData.set('name', this.updateBank.name);
      axios.put("http://localhost:9000/molde/api/v1/bank/" + id + "/edit", formData)
              .then(response => {
                this.loadData();
              });
    },
    deleteData(id) {
      // delete data
      axios
        .delete("http://localhost:9000/molde/api/v1/bank/" + id + "/remove").then(response => {
          this.loadData();
        });
    }
  }
};
</script>
