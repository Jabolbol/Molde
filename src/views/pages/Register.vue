<template>
<div class="d-flex align-items-center min-vh-100">
<CContainer fluid>
    <CRow class="justify-content-center">
        <CCol md="6">
        <CCard class="mx-4 mb-0">
        <CCardBody class="p-4">
            <h1>Register</h1>
            <p class="text-muted">Create your account</p>
            
        <CForm class="register-form" @submit.prevent="validateForm">
            <CInput
                placeholder="Firstname"
                autocomplete="fname"
                type="text"
                v-model="firstname"
            >
            <template #prepend-content><CIcon name="cil-user"/></template>
            </CInput>

            <CInput
                placeholder="Lastname"
                autocomplete="lname"
                type="text"
                v-model="lastname"
            >
            <template #prepend-content><CIcon name="cil-user"/></template>
            </CInput>

            <CInput
                placeholder="Username"
                autocomplete="username"
                type="text"
                v-model="username"
            >
            <template #prepend-content><CIcon name="cil-user"/></template>
            </CInput>

            <CInput
                placeholder="Email"
                autocomplete="email"
                type="email"
                v-model="email"
                prepend="@"
            />
            <CInput
                placeholder="Password"
                type="password"
                v-model="password"
                autocomplete="new-password"
            >
            <template #prepend-content><CIcon name="cil-lock-locked"/></template>
            </CInput>
            <CInput
                placeholder="Repeat password"
                type="password"
                autocomplete="new-password"
                class="mb-4"
            >
            <template #prepend-content><CIcon name="cil-lock-locked"/></template>
            </CInput>
            <CInput
                placeholder="Phone Number"
                autocomplete="phoneNumber"
                type="number"
                v-model="number"
                prepend="@"
            />
            <p v-if="isAuthError===true" style="color: red; font-size: 14px">{{authMessageError}}</p>
            <CRow>
                <CCol col="6" class="text-left">
                    <CButton type="submit" color="primary" @click="submit" block>Register</CButton>
                </CCol>
                <CCol col="6" class="text-center">
                    <router-link to='./login' class="btn btn-link" >Cancel</router-link>
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

import {mapGetters} from 'vuex'
export default {
  name: 'Register',
  data() {
      return {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          number: ''
      }
  },
  computed: {
      ...mapGetters([
          'isAuthError', 'authMessageError'
      ])
  },
  methods: {
      validateForm() {
          this.$store.dispatch('', {
              firstname: this.username,
              lastname: this.lastname,
              username:  this.username,
              email:  this.email,
              password:  this.password,
              number:  this.number
          })
      }
  }
}
</script>
