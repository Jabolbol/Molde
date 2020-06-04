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
                                <!-- <v-alert
                                :value="userExist"
                                color="error"
                                icon="warning"
                                >This user already exists, try a different set of data.</v-alert> -->

                                <CInput
                                        placeholder="Firstname"
                                        :rules="[rules.required]"
                                        type="text"
                                        v-model="firstname">
                                    <template #prepend-content>
                                        <CIcon name="cil-user"/>
                                    </template>
                                </CInput>

                                <CInput
                                        placeholder="Lastname"
                                        :rules="[rules.required]"
                                        type="text"
                                        v-model="lastname">
                                    <template #prepend-content>
                                        <CIcon name="cil-user"/>
                                    </template>
                                </CInput>

                                <CInput
                                        placeholder="Email"
                                        :rules="[rules.required, rules.email]"
                                        type="email"
                                        v-model="email"
                                        prepend="@">
                                </CInput>

                                <CInput
                                        placeholder="Password"
                                        type="password"
                                        v-model="password"
                                        :rules="[rules.required]">
                                    <template #prepend-content>
                                        <CIcon name="cil-lock-locked"/>
                                    </template>
                                </CInput>

                                <CInput
                                        placeholder="Repeat password"
                                        type="password"
                                        :rules="[rules.required]"
                                        v-model="confirm_password"

                                        class="mb-4">
                                    <template #prepend-content>
                                        <CIcon name="cil-lock-locked"/>
                                    </template>
                                </CInput>

                                <CInput
                                        placeholder="Phone Number"
                                        autocomplete="phoneNumber"
                                        type="number"
                                        v-model="number"
                                        prepend="@">
                                </CInput>
                                <!-- <p v-if="isAuthError===true" style="color: red; font-size: 14px">{{authMessageError}}</p> -->
                                <CRow>
                                    <CCol col="6" class="text-left">
                                        <CButton type="submit" color="primary" block @click.prevent="register()">
                                            Register
                                        </CButton>
                                    </CCol>
                                    <CCol col="6" class="text-center">
                                        <router-link to='./login' class="btn btn-link">Cancel</router-link>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                        <CCardFooter class="p-4">
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>

    // import {mapGetters} from 'vuex'
    export default {
        name: "register",
        data: () => ({
            userExist: false,
            firstname: '',
            lastname: '',
            email: '',
            number: '',
            password: '',
            confirm_password: '',
            rules: {
                required: value => !!value || "Required",
                email: value => {
                    //   const pattern = /^(([^<>()[\]\\.,;:\$@"]+(\.[^<>()[\]\\.,;:\$@"]+)*)|
                    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    return pattern.test(value) || "Invalid e-mail.";
                }
            }
        }),
        methods: {

            register() {
                if (this.valid()) {
                    var bodyFormData = new FormData();
                    bodyFormData.set('firstName', this.firstname);
                    bodyFormData.set('lastName', this.lastname);
                    bodyFormData.set('email', this.email);
                    bodyFormData.set('password', this.password);
                    bodyFormData.set('phoneNo', this.number);
                    bodyFormData.set('confirm_password', this.confirm_password);

                    this.$store.dispatch('REGISTER',
                        bodyFormData
                    )
                        .then(({status}) => {
                            this.$store.commit("SET_NOTIFICATION", {
                                display: true,
                                text: 'Your account has been successfully created! you can now login.',
                                alertClass: "danger"
                            });
                            this.$router.push('/pages/login')
                        })
                        .catch(error => {
                            console.log(error)
                            alert("Register failed")
                            this.userExist = true;
                        })
                }
            },
            valid() {
                return this.password === this.confirm_password;
            }
        }
    };
</script>
