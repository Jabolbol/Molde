<template>
    <CContainer class="d-flex content-center min-vh-100">
        <CCard class="p-4">
            <CCardBody>
                <Form>
                    <h1>Welcome to Molde</h1>
                    <p class="text-muted">Sign In to your account</p>
                    <CInput type="email" placeholder="Email" v-model="email" autocomplete="username email">
                        <template #prepend-content>
                            <CIcon name="cil-user"/>
                        </template>
                    </CInput>

                    <CInput placeholder="Password" type="Password" v-model="password" autocomplete="current-password">
                        <template #prepend-content>
                            <CIcon name="cil-lock-locked"/>
                        </template>
                    </CInput>

                    <CRow>
                        <CCol col="6" class="text-left">
                            <CButton type="submit" color="primary" class="px-4" @click.prevent="login()">Login</CButton>
                        </CCol>

                        <CCol col="6" class="text-right">
                            <router-link to="register" class="btn btn-link">Register</router-link>
                        </CCol>
                    </CRow>
                </Form>
            </CCardBody>
        </CCard>
    </CContainer>
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
