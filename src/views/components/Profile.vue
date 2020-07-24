<template>
  <div>
    <CRow>
      <CCol>
        <CAlert
          :show.sync="dismissCountDown"
          closeButton
          :color="alertColor"
        >
          {{alertMessage}}
          <CProgress
            color="info"
            :max="dismissSecs"
            :value="dismissCountDown"
            height="4px"
          />
        </CAlert>
        <CCard>
          <CCardHeader>
            <h1>Detail Profil</h1>
          </CCardHeader>
          <CCardBody>
            <CInput
              label="Email"
              v-model="profile.email"
              disabled
              horizontal
            />
            <CInput
              label="Nama Depan"
              v-model="profile.firstName"
              disabled
              horizontal
            />
            <CInput
              label="Nama Belakang"
              v-model="profile.lastName"
              disabled
              horizontal
            />
            <CInput
              label="No. Telepon"
              v-model="!profile.phoneNo ? '-' : profile.phoneNo"
              disabled
              horizontal
            />
            <CButton class="btn btn-primary float-right" @click="showModal">Ubah Profil</CButton>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <h1>Ubah Password</h1>
          </CCardHeader>
          <CCardBody>
            <CForm @submit.prevent="changePassword">
              <CInput
                type="password"
                label="Password Lama"
                v-model="updatePassword.old"
                required
                horizontal
              />
              <CInput
                type="password"
                label="Password Baru"
                v-model="updatePassword.new"
                required
                horizontal
              />
              <CInput
                type="password"
                label="Konfirmasi Password"
                v-model="updatePassword.confirmation"
                required
                horizontal
              />
              <CButton style="color: white" class="btn btn-warning float-right" type="submit">Ubah
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <modal v-show="isModalVisible">
      <template v-slot:header>
        <h1 style="margin-top: 15px;">Ubah Profil</h1>
        <button type="button" class="btn-close" @click="closeModal">X</button>
      </template>
      <template v-slot:body>
        <CForm>
          <CInput
            label="Email"
            v-model="newProfile.email"
            required
            horizontal
          />
          <CInput
            label="Nama Depan"
            v-model="newProfile.firstName"
            required
            horizontal
          />
          <CInput
            label="Nama Belakang"
            v-model="newProfile.lastName"
            required
            horizontal
          />
          <CInput
            label="No. Telepon"
            v-model="newProfile.phoneNo"
            required
            horizontal
          />
        </CForm>
      </template>
      <template v-slot:footer>
        <CButton class="btn-primary" @click="updateProfile">Ubah</CButton>
      </template>
    </modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import modal from './Modal'

  export default {
    name: "Profile",
    components: {
      modal
    },
    data() {
      return {
        isModalVisible: false,
        profile: {},
        newProfile: {
          email: '',
          firstName: '',
          lastName: '',
          phoneNo: ''
        },
        updatePassword: {
          old: '',
          new: '',
          confirmation: ''
        },
        dismissSecs: 0,
        dismissCountDown: 0,
        alertColor: '',
        alertMessage: ''
      }
    },
    methods: {
      showModal() {
        this.isModalVisible = true
      },
      closeModal() {
        this.isModalVisible = false
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert(color, message) {
        this.alertColor = color;
        this.dismissCountDown = 3;
        this.dismissSecs = 3;
        this.alertMessage = message;
      },
      loadData() {
        axios.get("/account/get")
          .then((response) => {
            const responseProfile = response.data.data;

            this.profile = responseProfile;
            this.newProfile.email = responseProfile.email;
            this.newProfile.firstName = responseProfile.firstName;
            this.newProfile.lastName = responseProfile.lastName;
            this.newProfile.phoneNo = responseProfile.phoneNo;
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              console.log(error);
              this.$router.push("/pages/login");
            }
          })
      },
      updateProfile() {
        const formData = new FormData();
        formData.set("email", this.newProfile.email);
        formData.set("firstName", this.newProfile.firstName);
        formData.set("lastName", this.newProfile.lastName);
        formData.set("phoneNo", this.newProfile.phoneNo);

        axios.put("/account/update", formData)
          .then(() => {
            this.isModalVisible = false
            this.showAlert("success", "Berhasil mengubah profil");
            this.loadData()
          })
          .catch((error) => {
            console.log(error)
          });
      },
      changePassword() {
        const formData = new FormData();
        formData.set("oldPassword", this.updatePassword.old);
        formData.set("newPassword", this.updatePassword.new);

        if (this.updatePassword.new !== this.updatePassword.confirmation) {
          this.showAlert("danger", "Password baru dengan konfirmasi tidak sama");
        } else {
          axios.put("/account/change-password", formData)
            .then((response) => {
              if(response.data.code === 400) {
                this.showAlert("danger", "Gagal mengubah password");
              } else {
                this.updatePassword = {}
                this.showAlert("success", "Berhasil mengubah password");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    created() {
      this.loadData();
    }
  }
</script>