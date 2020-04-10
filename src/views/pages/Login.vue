<template>
  <CContainer class="d-flex content-center min-vh-100">
    <CCard class="p-4">
            <CCardBody>

              <Form  @submit="login">
                <h1>Login</h1>

                <p class="text-muted">Sign In to your account</p>
                <CInput
                  type="email"
                  placeholder="email"
                  v-model="email"
                  autocomplete="username email">
                  <template #prepend-content><CIcon name="cil-user"/></template>
                </CInput>

                <CInput
                  placeholder="Password"
                  type="password"
                  v-model="password"
                  autocomplete="curent-password">
                <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                </CInput>

                <CRow>
                  <CCol col="6" class="text-left">
                    <CButton type="submit" color="primary" class="px-4" @click.prevent="login()">Login</CButton>
                  </CCol>
                  
                  <CCol col="6" class="text-right">
                    <router-link to='./register' class="btn btn-link">Register</router-link>
                  </CCol>
                </CRow>
              

              </Form>
            </CCardBody>
          </CCard>
  </CContainer>
</template>

<script>
export default {
  name: 'login',
  data: () => ({
      email: '',
      password: '',
      error: false
    
  }), 
  methods: {
    // login() {
    //   this.axios.post('http://localhost:9000/molde/api/v1/login', {
    //     email: this.email,
    //     password: this.password
    //   })
    //   .then(function(response) {
    //     console.log(response.data)
    //   })
    //   .catch(function(error) {
    //     console.log(error)
    //   })
    // }
    login() {
      console.log(this.$store);
      
      this.$store.dispatch("LOGIN", {
        email: this.email,
        password: this.password
      })
      .then(success => {
        this.$router.push("/")
      })
      .catch(error => {
        alert("Login failed")
        this.error  = true;
      })
    }
  }
};
</script>
