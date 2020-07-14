<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>Detail Toko</h1>
          </CCardHeader>
          <CCardBody>
            <CInput
              label="Nama"
              v-model="shop.name"
              disabled
              horizontal
            />
            <CInput
              label="Provinsi"
              v-model="shop.province"
              disabled
              horizontal
            />
            <CInput
              label="Kabupaten/Kota"
              v-model="shop.city"
              disabled
              horizontal
            />
            <CInput
              label="Nama Jalan"
              v-model="shop.street"
              disabled
              horizontal
            />
            <CInput
              label="Kode Pos"
              v-model="shop.postalCode"
              disabled
              horizontal
            />
            <CButton class="btn btn-primary float-right" @click="showModal">Ubah Alamat</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol col="10">
                <h1>Daftar Rekening Bank</h1>
              </CCol>
              <CCol col="2">
                <CButton class="btn btn-primary float-right" @click="showBankAccountModal">Tambah Rekening</CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Bank</th>
                <th scope="col">Pemilik Rekening</th>
                <th scope="col">No. Rekening</th>
                <th scope="col">Aksi</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="bankAccount in bankAccounts" :key="bankAccount.id">
                <td>{{bankAccount.bank.name}}</td>
                <td>{{bankAccount.owner}}</td>
                <td>{{bankAccount.no}}</td>
                <td>
                  <CButton style="color: white; margin-right: 5px;" class="btn btn-warning"
                           @click="showUpdateBankAccountModal(bankAccount)">Ubah
                  </CButton>
                  <CButton style="color: white;" class="btn btn-danger"
                           @click="removeBankAccount(bankAccount.id)">Hapus
                  </CButton>
                </td>
              </tr>
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!--  Change Address Modal  -->
    <modal v-show="isModalVisible" @close="closeModal">
      <template v-slot:header>
        <h1 style="margin-top: 15px;">Ubah Alamat</h1>
        <button type="button" class="btn-close" @click="closeModal">X</button>
      </template>
      <template v-slot:body>
        <CRow>
          <CCol>
            <CForm>
              <CSelect
                label="Provinsi"
                :options="provinces"
                v-on:update:value="loadCities($event)"
                required
                horizontal
              />
              <CSelect
                label="Kabupaten/Kota"
                :options="cities"
                v-on:update:value="selectCity($event)"
                required
                horizontal
              />
              <CInput
                label="Nama Jalan"
                v-model="updateRequest.street"
                required
                horizontal
              />
              <CInput
                label="Kode Pos"
                v-model="updateRequest.postalCode"
                required
                horizontal
              />
            </CForm>
          </CCol>
        </CRow>
      </template>
      <template v-slot:footer>
        <CButton class="btn btn-primary float-right" @click="updateAddress">Ubah</CButton>
      </template>
    </modal>

    <!--  Bank Account Modal  -->
    <modal v-show="isBankAccountModalVisible">
      <template v-slot:header>
        <h1 style="margin-top: 15px;">Tambah Rekening</h1>
        <button type="button" class="btn-close" @click="closeBankAccountModal">X</button>
      </template>
      <template v-slot:body>
        <CRow>
          <CCol>
            <CForm>
              <CSelect
                label="Bank"
                :options="banks"
                v-on:update:value="selectBank($event)"
                required
                horizontal
              />
              <CInput
                label="Nama Pemilik"
                v-model="bankAccountRequest.owner"
                required
                horizontal
              />
              <CInput
                label="No. Rekening"
                v-model="bankAccountRequest.no"
                required
                horizontal
              />
            </CForm>
          </CCol>
        </CRow>
      </template>
      <template v-slot:footer>
        <CButton class="btn btn-primary float-right" @click="addBankAccount">Tambah</CButton>
      </template>
    </modal>

    <!-- Update Bank Account Modal  -->
    <modal v-show="isUpdateBankAccountModalVisible">
      <template v-slot:header>
        <h1 style="margin-top: 15px;">Ubah Rekening</h1>
        <button type="button" class="btn-close" @click="closeUpdateBankAccountModal">X</button>
      </template>
      <template v-slot:body>
        <CRow>
          <CCol>
            <CForm>
              <CSelect
                label="Bank"
                :options="banks"
                v-on:update:value="selectBank($event)"
                required
                horizontal
              />
              <CInput
                label="Nama Pemilik"
                v-model="bankAccountRequest.owner"
                required
                horizontal
              />
              <CInput
                label="No. Rekening"
                v-model="bankAccountRequest.no"
                required
                horizontal
              />
            </CForm>
          </CCol>
        </CRow>
      </template>
      <template v-slot:footer>
        <CButton class="btn btn-primary float-right" @click="updateBankAccount">Ubah</CButton>
      </template>
    </modal>

  </div>
</template>

<script>
  import axios from 'axios'
  import Modal from "./Modal";

  export default {
    name: "Shop",
    components: {Modal},
    data() {
      return {
        isModalVisible: false,
        isBankAccountModalVisible: false,
        isUpdateBankAccountModalVisible: false,
        shop: {},
        provinces: [],
        cities: [],
        banks: [],
        bankAccounts: [],
        updateRequest: {
          provinceId: 0,
          province: '',
          cityId: 0,
          city: '',
          street: '',
          postalCode: ''
        },
        bankAccountRequest: {
          bankId: 2,
          owner: '',
          no: ''
        }
      }
    },
    methods: {
      showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      showBankAccountModal() {
        this.isBankAccountModalVisible = true;
      },
      closeBankAccountModal() {
        this.isBankAccountModalVisible = false;
      },
      showUpdateBankAccountModal(bankAccount) {
        console.log(bankAccount);
        this.bankAccountRequest.id = bankAccount.id;
        this.bankAccountRequest.owner = bankAccount.owner;
        this.bankAccountRequest.no = bankAccount.no;
        this.isUpdateBankAccountModalVisible = true;
      },
      closeUpdateBankAccountModal() {
        this.isUpdateBankAccountModalVisible = false;
      },
      loadData() {
        axios.get("/shop/get")
          .then((response) => {
            this.shop = response.data.data;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
            }
          })
      },
      loadBank() {
        axios.get("/bank/get")
          .then((response) => {
            this.banks = response.data.data.map(b => {
              const obj = {
                value: b.id,
                label: b.name
              };
              return obj;
            });
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
            }
          })
      },
      loadBankAccount() {
        axios.get("/bankaccount/get")
          .then((response) => {
            this.bankAccounts = response.data.data;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
            }
          })
      },
      loadProvinces() {
        axios.get("/rajaongkir/province")
          .then((response) => {
            this.provinces = response.data.rajaongkir.results.map(p => {
              const obj = {
                value: `${p.province_id}-${p.province}`,
                label: p.province
              };
              return obj;
            });
          })
          .catch((error) => {
            console.log(error);
          })
      },
      loadCities(data) {
        let provinceId = 1;
        let province = "Bali";

        if (data !== undefined) {
          const res = data.split("-");
          provinceId = parseInt(res[0]);
          province = res[1];
        }
        this.updateRequest.provinceId = provinceId;
        this.updateRequest.province = province;
        axios.get(`/rajaongkir/cities?province=${provinceId}`)
          .then((response) => {
            this.cities = response.data.rajaongkir.results.map(c => {
              const obj = {
                value: `${c.city_id}-${c.city_name}`,
                label: c.city_name
              };
              return obj;
            });
          })
          .catch((error) => {
            console.log(error);
          })
      },
      selectCity(data) {
        let cityId = 17;
        let city = "Badung";

        if (data !== undefined) {
          const res = data.split("-");
          cityId = parseInt(res[0]);
          city = res[1];
        }
        this.updateRequest.cityId = cityId;
        this.updateRequest.city = city;
      },
      updateAddress() {
        const formData = new FormData();
        formData.set("provinceId", this.updateRequest.provinceId);
        formData.set("province", this.updateRequest.province);
        formData.set("cityId", this.updateRequest.cityId);
        formData.set("city", this.updateRequest.city);
        formData.set("street", this.updateRequest.street);
        formData.set("postalCode", this.updateRequest.postalCode);

        axios.put("/shop/update", formData)
          .then((response) => {
            this.isModalVisible = false;
            this.updateRequest = {}
            this.loadData();
          })
          .catch((error) => {
            console.log(error);
          })
      },
      selectBank(bankId) {
        this.bankAccountRequest.bankId = bankId;
      },
      addBankAccount() {
        const bankId = this.bankAccountRequest.bankId;
        const formData = new FormData();
        formData.set("owner", this.bankAccountRequest.owner);
        formData.set("no", this.bankAccountRequest.no);

        axios.post(`/bankaccount/${bankId}/add`, formData)
          .then(() => {
            this.loadBankAccount();
            this.isBankAccountModalVisible = false;
            this.bankAccountRequest = {};
          })
          .catch((error) => {
            console.log(error);
          });
      },
      updateBankAccount() {
        const bankAccountId = this.bankAccountRequest.id;
        const formData = new FormData();
        formData.set("owner", this.bankAccountRequest.owner);
        formData.set("no", this.bankAccountRequest.no);

        axios.put(`/bankaccount/${bankAccountId}/edit`, formData)
          .then(() => {
            this.loadBankAccount()
            this.isUpdateBankAccountModalVisible = false;
            this.bankAccountRequest = {};
          })
          .catch((error) => {
            console.log(error);
          });
      },
      removeBankAccount(bankAccountId) {
        axios.delete(`/bankaccount/${bankAccountId}/remove`)
          .then(() => {
            this.loadBankAccount()
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    created() {
      this.loadData();
      this.loadProvinces();
      this.loadCities();
      this.loadBank();
      this.loadBankAccount();
    }
  }
</script>
