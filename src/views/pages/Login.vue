<template>
    <div class="c-app flex-row align-items-center">
        <CContainer>
            <CRow class="justify-content-center">
                <CCol md="8">
                    <CCardGroup>
                        <CCard class="p-4">
                            <CCardBody>
                                <CForm>
                                    <h1>Login</h1>
                                    <p class="text-muted">Sign In to your account</p>
                                    <CInput
                                            placeholder="Username"
                                            autocomplete="username email"
                                            v-model="email"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-user"/>
                                        </template>
                                    </CInput>
                                    <CInput
                                            placeholder="Password"
                                            type="password"
                                            autocomplete="curent-password"
                                            v-model="password"
                                    >
                                        <template #prepend-content>
                                            <CIcon name="cil-lock-locked"/>
                                        </template>
                                    </CInput>
                                    <CRow>
                                        <CCol col="6" class="text-left">
                                            <CButton color="primary" class="px-4" @click="login">Login</CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                        <CCard
                                color="primary"
                                text-color="white"
                                class="text-center py-5 d-md-down-none"
                                body-wrapper
                        >
                            <CCardBody>
                                <h2>Let's Join With Us</h2>
                                <p>Register now and grow your online business with us!</p>
                                <CButton
                                        color="light"
                                        variant="outline"
                                        size="lg"
                                        @click="$router.push('register')"
                                >
                                    Register Now!
                                </CButton>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "login",
        data: () => ({
            email: "",
            password: "",
        }),
        methods: {
            ...mapActions(["doLogin"]),
            login() {
                const router = this.$router;
                const email = this.email;
                const password = this.password;

                this.doLogin({email, password})
                    .then(function () {
                        router.push("/");
                    }).catch(function (err) {
                    console.log(err);
                    alert("Login failed");
                });
            }
        }
    };
</script>
