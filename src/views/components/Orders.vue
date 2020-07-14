<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol col="10">
                <h1>Daftar Pesanan</h1>
              </CCol>
              <CCol col="2">
                <CButton block color="primary" @click="exportOrder">Export</CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Transaction No</th>
                <th scope="col">Total Harga</th>
                <th scope="col">Total Pembayaran</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>{{order.transactionNo}}</td>
                <td>{{order.totalPrice}}</td>
                <td>{{order.totalPaymentPrice}}</td>
                <td>{{order.status}}</td>
                <td>
                  <router-link class="btn btn-primary" :to="'orders/' + order.id">Detail</router-link>
                </td>
              </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>

      <modal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          <h1 style="margin-top: 15px;">Detail Pesanan</h1>
          <button type="button" class="btn-close" @click="closeModal">X</button>
        </template>
        <template v-slot:body>
          <CForm>
            <CRow>
              <CCol>
                <CInput
                  label="Kota Asal"
                  v-model="order.shipment.originCity"
                  disabled
                  vertical
                />
              </CCol>
              <CCol>
                <CInput
                  label="Kota Tujuan"
                  v-model="order.shipment.destinationCity"
                  disabled
                  vertical
                />
              </CCol>
            </CRow>
            <CTextarea
              label="Alamat Tujuan"
              v-model="order.shipment.address"
              rows="6"
              disabled
              vertical
            />
            <CInput
              label="Kurir"
              v-model="order.shipment.courier"
              disabled
              vertical
            />
            <CInput
              label="Status Pesanan"
              v-model="order.status"
              disabled
              vertical
            />
            <CInput
              label="No. Resi"
              v-if="order.shipment.airwayBill"
              v-model="order.shipment.airwayBill"
              disabled
              vertical
            />
          </CForm>
          <CRow v-if="order.paymentImage">
            <CCol>
              <p>Bukti Pembayaran</p>
              <img style="width: 500px; height: 500px;"
                   :src="'http://localhost:9000' + order.paymentImage" :alt="order.id">
            </CCol>
          </CRow>
        </template>
        <template v-slot:footer>
          <!--                    <router-link class="btn btn-warning" :to="'updateResi/'+order.id">Update Resi</router-link>-->
          <button v-if="order.status === 'WAITING_FOR_PAYMENT_CONFIRMATION'" class="btn btn-danger"
                  v-on:click="rejectOrder(order.id)">Reject
          </button>
          <button v-if="order.status === 'WAITING_FOR_PAYMENT_CONFIRMATION'" class="btn btn-primary"
                  v-on:click="acceptOrder(order.id)">Accept
          </button>
          <button v-if="order.status === 'PAYMENT_ACCEPTED'" class="btn btn-primary"
                  v-on:click="acceptOrder(order.id)">Update No. Resi
          </button>
        </template>
      </modal>
    </CRow>
  </div>
</template>

<script>
    import Axios from 'axios';
    import axios from 'axios';
    import modal from "./Modal";

    export default {
    components: {
      modal,
    },
    data() {
      return {
        orders: [],
        order: {
          shipment: {}
        },
        isModalVisible: false
      };
    },
    created() {
      this.loadData();
    },
    methods: {
      showModal(order) {
        this.order = order;
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      loadData() {
        axios.get("/order/shop/get")
          .then(response => {
            this.orders = response.data.data;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });
      },
      acceptOrder(id) {
        axios.post("/order/" + id + "/accept")
          .then(() => {
            this.loadData();
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });
      },
      rejectOrder(id) {
        axios.post("/order/" + id + "/reject")
          .then(() => {
            this.loadData();
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });
      },
      cancelOrder(id) {
        axios.post("/order/" + id + "/cancel")
          .then(() => {
            this.loadData();
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          });
      },
      exportOrder() {
        Axios({
          url: '/order/export',
          method: 'GET',
          responseType: 'blob',
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');

          link.href = url;
          link.setAttribute('download', 'orders.xlsx');
          document.body.appendChild(link);
          link.click();
        }).catch((error) => {
          if (error.message === "Request failed with status code 401") {
            console.log(error);
            this.$router.push("/pages/login");
          }
        });
      }
    }
  };
</script>

<style scoped>
  .orders {
    background: white;
    padding: 10px;
    border-radius: 10px;
  }
</style>