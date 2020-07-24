<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol>
                <h1>Daftar Request</h1>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Nama Aplikasi</th>
                <th scope="col">Background</th>
                <th scope="col">Font Color</th>
                <th scope="col">Product Layout</th>
                <th scope="col">Kategori</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-if="request.shopName !== 'Default Shop'" v-for="request in requests" :key="request.id">
                <td>{{request.appName}}</td>
                <td>{{request.customization.appBackground}}</td>
                <td>{{request.customization.appFontColor}}</td>
                <td>{{request.customization.prodLayout}}</td>
                <td>{{request.customization.category.name}}</td>
                <td>{{request.status}}</td>
                <td style=" width:20%">
                  <button v-if="request.status == 0" class="btn btn-success" style="margin-right: 5px"
                          v-on:click="acceptRequest(request.id)">
                    Accept
                  </button>

                  <button v-if="request.status == 0" class="btn btn-danger" v-on:click="rejectRequest(request.id)">
                    Reject
                  </button>

                  <button v-if="request.status == 1" class="btn btn-success" v-on:click="showModal(request.id)">
                    Complete
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <modal v-show="isModalVisible">
      <template v-slot:header>
        <h1 style="margin-top: 15px;">Update Download Url</h1>
        <button type="button" class="btn-close" @click="closeModal">X</button>
      </template>
      <template v-slot:body>
        <CRow>
          <CCol>
            <CForm>
              <CInput
                label="URL"
                v-model="downloadUrl"
                required
                horizontal
              />
            </CForm>
          </CCol>
        </CRow>
      </template>
      <template v-slot:footer>
        <CButton class="btn btn-primary float-right" @click="completeRequest">Confirm</CButton>
      </template>
    </modal>

  </div>
</template>

<script>
  import axios from 'axios'
  import modal from './Modal'

  export default {
    data() {
      return {
        isModalVisible: false,
        downloadUrl: '',
        requestId: 0,
        requests: [],
        status: 0,
      };
    },
    components: {
      modal
    },
    created() {
      this.loadData();
    },
    methods: {
      showModal(id) {
        this.requestId = id;
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      loadData() {
        axios.get(`/request/get/active`)
          .then(response => {
            this.requests = response.data.data;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });
      },
      acceptRequest(id) {
        axios.put(`/request/${id}/accept`)
          .then(() => {
            this.loadData();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      completeRequest() {
        axios.put(`/request/${this.requestId}/complete?url=${this.downloadUrl}`)
          .then(() => {
            this.isModalVisible = false;
            this.downloadUrl = '';
            this.loadData();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      rejectRequest(id) {
        axios.put(`/request/${id}/reject`)
          .then(() => {
            this.loadData();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
</script>