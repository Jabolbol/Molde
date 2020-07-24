<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>Selamat menggunakan aplikasi klien Molde</h1>
          </CCardHeader>

          <CCardBody v-if="admin">
            <CRow style="margin: 10px 0 0 10px;">
              <CCol col="4">
                <CCard>
                  <CCardHeader class="text-center">
                    <h2>Permohonan Aktif</h2>
                  </CCardHeader>
                  <CCardBody class="text-center">
                    <p style="font-size: 5em;">{{activeRequest}}</p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol col="4">
                <CCard>
                  <CCardHeader class="text-center">
                    <h2>Permohonan Berhasil</h2>
                  </CCardHeader>
                  <CCardBody class="text-center">
                    <p style="font-size: 5em;">{{completeRequest}}</p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol col="4">
                <CCard>
                  <CCardHeader class="text-center">
                    <h2>Permohonan Ditolak</h2>
                  </CCardHeader>
                  <CCardBody class="text-center">
                    <p style="font-size: 5em;">{{rejectedRequest}}</p>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

            <CRow style="margin: 10px 0 0 10px;">
              <CCol col="4">
                <CCard>
                  <CCardHeader class="text-center">
                    <h2>Toko</h2>
                  </CCardHeader>
                  <CCardBody class="text-center">
                    <p style="font-size: 5em;">{{allShops}}</p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol col="4">
                <CCard>
                  <CCardHeader class="text-center">
                    <h2>Toko Aktif</h2>
                  </CCardHeader>
                  <CCardBody class="text-center">
                    <p style="font-size: 5em;">{{activeShops}}</p>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol col="4">
                <CCard>
                  <CCardHeader class="text-center">
                    <h2>Toko Non-Aktif</h2>
                  </CCardHeader>
                  <CCardBody class="text-center">
                    <p style="font-size: 5em;">{{nonActiveShops}}</p>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>

          <CCardBody v-if="!admin">
            <CRow style="margin: 10px 0 0 10px;">
              <CCard accent-color="primary">
                <CCardHeader>
                  <CRow>
                    <CCol>
                      <h4><b>Permohonan toko</b></h4>
                    </CCol>
                    <CCol>
                      <CBadge color="primary" class="float-right">{{requestStatus}}</CBadge>
                    </CCol>
                  </CRow>
                </CCardHeader>
                <CCardBody>
                  <p><b>Nama Toko:</b> {{request.shopName}}</p>
                  <p><b>Nama Aplikasi:</b> {{request.appName}}</p>
                  <p><b>Keterangan:</b> {{requestDescription}}</p>
                </CCardBody>
                <CCardFooter v-if="request.status == 2">
                  <a class="btn btn-primary float-right" style="color: white;" :href="request.downloadUrl">Download</a>
                </CCardFooter>
              </CCard>
            </CRow>
            <CRow v-if="!this.isActive" style="margin: 10px 0 0 10px;">
              <CCard color="danger" class="text-center" body-wrapper text-color="white">
                <blockquote class="card-blockquote">
                  <p>
                    Toko anda telah diblokir, silahkan menghubungi administrator melalui email berikut:
                    <b>admin.molde@gmail.com</b>
                  </p>
                  <footer>
                    <cite title="Created By">Administrator</cite>
                  </footer>
                </blockquote>
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
        request: {},
        admin: false,
        isActive: true,
        activeRequest: 0,
        completeRequest: 0,
        rejectedRequest: 0,
        allShops: 0,
        activeShops: 0,
        nonActiveShops: 0
      };
    },
    methods: {
      getRequestsDetail() {
        axios.get(`/request/get/active`)
          .then(response => {
            this.activeRequest = response.data.data.length - 1;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });

        axios.get(`/request/get?status=2`)
          .then(response => {
            this.completeRequest = response.data.data.length;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });

        axios.get(`/request/get?status=3`)
          .then(response => {
            this.rejectedRequest = response.data.data.length;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });
      },
      getShopsDetail() {
        axios.get(`/shop`)
          .then(response => {
            this.allShops = response.data.data.length;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });

        axios.get(`/shop/gets?status=true`)
          .then(response => {
            this.activeShops = response.data.data.length;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });

        axios.get(`/shop/gets?status=false`)
          .then(response => {
            this.nonActiveShops = response.data.data.length;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });
      },
      getRequest() {
        axios.get('/request/get/shop')
          .then((response) => {
            this.request = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          })
      },
      isAdmin() {
        const role = localStorage.getItem("role");
        if (role === "ROLE_ADMIN") {
          this.admin = true;
        }
      },
      checkActive() {
        axios.get("/shop/get")
          .then((response) => {
            const shop = response.data.data;
            this.isActive = shop.isActive;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
            }
          })
      }
    },
    created() {
      this.isAdmin();
      this.checkActive();
      this.getRequestsDetail();
      this.getShopsDetail();
      this.getRequest();
    },
    computed: {
      requestStatus: function () {
        if (this.request.status === 0) return 'Menunggu Konfirmasi';
        else if (this.request.status === 1) return 'Dalam Proses';
        else if (this.request.status === 2) return 'Selesai';
        else if (this.request.status === 3) return 'Permohonan Ditolak';
        else return 'Tidak ada request'
      },
      requestDescription: function () {
        if (this.request.status === 0) return 'Mohon tunggu, admin sedang mereview permohonan';
        else if (this.request.status === 1) return 'Permohonan diterima, aplikasi akan selesai dalam waktu 30-60 menit';
        else if (this.request.status === 2) return 'Aplikasi telah selesai';
        else if (this.request.status === 3) return 'Silahkan melakukan request ulang';
        else return 'Silahkan melakukan request toko';
      }
    }
  };
</script>

<style scoped>
</style>
