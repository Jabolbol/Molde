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
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="request in requests" :key="request.id">
                <td>{{request.appName}}</td>
                <td>{{request.customization.appBackground}}</td>
                <td>{{request.customization.appFontColor}}</td>
                <td>{{request.customization.prodLayout}}</td>
                <td>{{request.customization.category.name}}</td>
                <td style=" width:20%">
                  <button v-if="request.status != 1" class="btn btn-success" v-on:click="acceptRequest(request.id)">
                    Accept
                  </button>
                  &emsp;
                  <button v-if="request.status != 1" class="btn btn-danger" v-on:click="rejectRequest(request.id)">
                    Reject
                  </button>
                  <button v-if="request.status == 1" class="btn btn-primary">Detail</button>
                </td>
              </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        requests: [],
        status: 0,
      };
    },
    created() {
      this.loadData();
    },
    methods: {
      loadData() {
        axios.get(`/request/get?status=${this.status}`)
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
          .then(response => {
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