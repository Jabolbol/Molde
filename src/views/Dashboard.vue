<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>Selamat menggunakan aplikasi klien Molde</h1>
          </CCardHeader>
          <CCardBody>
            <CRow v-if="this.activeRequest" style="margin: 10px 0 0 10px;">
              <CCard accent-color="primary">
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <h4>Permohonan toko</h4>
                    </CCol>
                    <CCol>
                      <CBadge color="primary" class="float-right">{{requestStatus}}</CBadge>
                    </CCol>
                  </CRow>

                </CCardHeader>
                <CCardBody>
                  <p>Nama Toko: {{activeRequest.shopName}}</p>
                  <p>Nama Aplikasi: {{activeRequest.appName}}</p>
                </CCardBody>
              </CCard>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Dashboard",
    components: {},
    data() {
      return {
        activeRequest: {}
      };
    },
    methods: {
      getActiveRequest() {
        axios.get('/request/get/active')
          .then((response) => {
            this.activeRequest = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    created() {
      this.getActiveRequest();
    },
    computed: {
      requestStatus: function () {
        if (this.activeRequest.status === 0) return 'Menunggu';
        else if (this.activeRequest.status === 1) return 'Diterima';
      }
    }
  };
</script>

<style scoped>
</style>
