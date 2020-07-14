<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <h1>Register</h1>
              <p class="text-muted">Create your account</p>
              <CForm class="register-form" @submit="register">
                <CInput
                  placeholder="Firstname"
                  :rules="[rules.required]"
                  type="text"
                  v-model="firstname"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user"/>
                  </template>
                </CInput>

                <CInput
                  placeholder="Lastname"
                  :rules="[rules.required]"
                  type="text"
                  v-model="lastname"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user"/>
                  </template>
                </CInput>

                <CInput
                  placeholder="Email"
                  :rules="[rules.required, rules.email]"
                  type="email"
                  v-model="email"
                  prepend="@"
                ></CInput>

                <CInput
                  placeholder="Password"
                  type="password"
                  v-model="password"
                  :rules="[rules.required]"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked"/>
                  </template>
                </CInput>

                <CInput
                  placeholder="Repeat password"
                  type="password"
                  :rules="[rules.required]"
                  v-model="confirm_password"
                  class="mb-4"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked"/>
                  </template>
                </CInput>

                <CInput
                  placeholder="Phone Number"
                  autocomplete="phoneNumber"
                  type="number"
                  v-model="number"
                  prepend="@"
                ></CInput>
                <CRow>
                  <CCol col="6" class="text-left">
                    <CButton
                      type="submit"
                      color="primary"
                      block
                      @click.prevent="register()"
                    >Register
                    </CButton>
                  </CCol>
                  <CCol col="6" class="text-center">
                    <router-link to="./login" class="btn btn-link">Cancel</router-link>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter class="p-4">
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
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "register",
    data: () => ({
      userExist: false,
      firstname: "",
      lastname: "",
      email: "",
      number: "",
      password: "",
      confirm_password: "",
      rules: {
        required: value => !!value || "Required",
        email: value => {
          const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      dismissSecs: 0,
      dismissCountDown: 0,
      alertColor: '',
      alertMessage: ''
    }),
    methods: {
      ...mapActions(['doRegister']),
      showAlert(color, message) {
        this.alertColor = color;
        this.dismissCountDown = 3;
        this.dismissSecs = 3;
        this.alertMessage = message;
      },
      register() {
        if (this.valid()) {
          const router = this.$router;
          const bodyFormData = new FormData();
          bodyFormData.set("firstName", this.firstname);
          bodyFormData.set("lastName", this.lastname);
          bodyFormData.set("email", this.email);
          bodyFormData.set("password", this.password);
          bodyFormData.set("phoneNo", this.number);
          bodyFormData.set("confirm_password", this.confirm_password);

          this.doRegister(bodyFormData)
            .then(() => {
              router.push("login")
            })
            .catch((error) => {
              if (error === "Email exists") {
                this.showAlert("danger", "Email telah digunakan");
              } else {
                alert("Register failed");
              }
            });
        }
      },
      valid() {
        return this.password === this.confirm_password;
      }
    }
  };
</script>
