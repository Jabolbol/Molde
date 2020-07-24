<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1 style="margin-top: 15px;">Detail Pesanan</h1>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol col="5" v-if="order.paymentImage" centered>
                <p>Bukti Pembayaran</p>
                <img style="width: 500px; height: 500px;"
                     :src="'http://localhost:9000' + order.paymentImage" :alt="order.id">
              </CCol>
              <CCol v-bind:col="order.paymentImage ? 7 : 12">
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
                  <CInput
                    label="Nama Penerima"
                    v-model="order.shipment.recipient"
                    disabled
                    vertical
                  />
                  <CInput
                    label="No. Telepon Penerima"
                    v-model="order.shipment.recipientPhone"
                    disabled
                    vertical
                  />
                  <CTextarea
                    label="Alamat Tujuan"
                    v-model="order.shipment.address"
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
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <button v-if="order.status === 'WAITING_FOR_PAYMENT_CONFIRMATION'" class="btn btn-primary"
                    v-on:click="acceptOrder(order.id)" style="float: right;">Accept
            </button>
            <button v-if="order.status === 'WAITING_FOR_PAYMENT_CONFIRMATION'" class="btn btn-danger"
                    v-on:click="rejectOrder(order.id)" style="float: right; margin-right: 5px;">Reject
            </button>
            <button v-if="order.status === 'SHIPMENT_IN_PROGRESS'"
                    class="btn btn-success"
                    v-on:click="completeOrder" style="float: right;">Completed
            </button>
            <button v-if="order.status === 'PAYMENT_ACCEPTED' || order.status === 'SHIPMENT_IN_PROGRESS'"
                    class="btn btn-primary"
                    v-on:click="showModal" style="float: right; margin-right: 5px;">Update No. Resi
            </button>
          </CCardFooter>
        </CCard>
      </CCol>

      <modal v-show="isModalVisible" @close="closeModal">
        <template v-slot:header>
          <h1 style="margin-top: 15px;">Update No. Resi</h1>
          <button type="button" class="btn-close" @click="closeModal">X</button>
        </template>
        <template v-slot:body>
          <CForm>
            <CInput
              label="No. Resi"
              v-model="airwayBill"
              required
              horizontal
            />
          </CForm>
        </template>
        <template v-slot:footer>
          <CButton style="color: white" class="btn btn-warning" @click="updateAirwayBill">Update</CButton>
        </template>
      </modal>

    </CRow>
  </div>
</template>

<script>
    import modal from './Modal'
    import axios from 'axios'

    export default {
    name: "Order",
    components: {
      modal
    },
    data() {
      return {
        isModalVisible: false,
        order: {
          shipment: {}
        },
        airwayBill: ""
      }
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      loadData() {
        const orderId = this.$route.params.id;

        axios.get(`/order/${orderId}/get`)
          .then((response) => {
            this.order = response.data.data;
            this.airwayBill = response.data.data.shipment.airwayBill;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          })
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
      updateAirwayBill() {
        const orderId = this.$route.params.id;
        const formData = new FormData();
        formData.set("airwayBill", this.airwayBill);

        axios.post(`/order/${orderId}/airway-bill`, formData)
          .then((response) => {
            const order = response.data.data;
            this.airwayBill = order.shipment.airwayBill;
            this.isModalVisible = false;
            this.loadData();
          })
          .catch((error) => {
            console.log(error);
          })
      },
      completeOrder() {
        const orderId = this.$route.params.id;

        axios.post(`/order/${orderId}/complete`)
          .then((response) => {
            this.loadData();
          })
          .catch((error) => {
            console.log(error);
          })
      }
    },
    created() {
      this.loadData();
    }
  }
</script>