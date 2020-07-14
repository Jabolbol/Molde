<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol col="10">
                <h1>Daftar Bank</h1>
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
                <th scope="col">Nama</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="bank in banks" :key="bank.id">
                <td style="width:10%">{{bank.id}}</td>
                <td>{{bank.name}}</td>
                <td style="width:20%">
                  <button type="button" class="btn btn-warning" style="color: white;"
                          @click="updateModal(bank)">Update
                  </button>
                  &emsp;
                  <button class="btn btn-danger" v-on:click="deleteData(bank.id)">Delete</button>
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
              v-model="bankName"
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
        <h3 style="margin-top: 15px;">Ubah Bank</h3>
        <button type="button" class="btn-close" @click="closeUpdateModal">X</button>
      </template>
      <template v-slot:body>
        <CRow>
          <CCol>
            <CInput
              label="Nama"
              v-model="bankName"
              horizontal
            />
          </CCol>
        </CRow>
      </template>
      <template v-slot:footer>
        <button class="btn btn-warning" style="color: white;" v-on:click="updateData()">Update</button>
      </template>
    </modal>
  </div>
</template>

<script>
  import axios from "axios";
  import modal from "./Modal";

  export default {
    name: "ListBank",
    components: {
      modal
    },
    data() {
      return {
        banks: [],
        bankId: 0,
        bankName: "",
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
        this.bankId = bank.id;
        this.bankName = bank.name;
        this.isModalUpdate = true;
      },
      closeUpdateModal() {
        this.isModalUpdate = false;
      },
      loadData() {
        axios.get("bank/get").then(response => {
          this.banks = response.data.data;
        });
      },
      addData() {
        axios.post(`/bank/add?name=${this.bankName}`)
          .then(() => {
            this.bankName = "";
            this.isModalAdd = false;
            this.loadData();
          })
          .catch((error) => {
            console.log(error)
          });
      },
      updateData() {
        axios.put(`/bank/${this.bankId}/edit?name=${this.bankName}`)
          .then(() => {
            this.bankId = 0;
            this.bankName = "";
            this.isModalUpdate = false;
            this.loadData();
          })
          .catch((error) => {
            console.log(error)
          });
      },
      deleteData(id) {
        axios.delete(`/bank/${id}/remove`)
          .then(() => {
            this.loadData();
          })
          .catch((error) => {
            console.log(error)
          });
        ;
      }
    }
  };
</script>
