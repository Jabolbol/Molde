<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          User id: {{ $route.params.id }}
        </CCardHeader>
        <CCardBody>
          <CDataTable
            striped
            small
            fixed
            :items="visibleData"
            :fields="fields"
          />
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Back</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
  import usersData from '../users/UsersData'
  import axios from 'axios'

  export default {
    name: 'User',
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.usersOpened = from.fullPath.includes('users')
      })
    },
    data() {
      return {
        usersOpened: null
      }
    },
    computed: {
      fields() {
        return [
          {key: 'key', label: this.username, _style: 'width:150px'},
          {key: 'value', label: '', _style: 'width:150px;'}
        ]
      },
      userData() {
        this.loadUser();
        const id = this.$route.params.email
        const user = usersData.find((user, index) => index + 1 == id)
        const userDetails = user ? Object.entries(user) : [['id', 'Not found']]
        return userDetails.map(([key, value]) => {
          return {key, value}
        })
      },
      visibleData() {
        return this.userData.filter(param => param.key !== 'username')
      },
      username() {
        return this.userData.filter(param => param.key === 'username')[0].value
      },
    },
    methods: {
      goBack() {
        this.usersOpened ? this.$router.go(-1) : this.$router.push({path: '/users'})
      },
      loadUser() {
        const email = this.$route.params.email;
        axios.get(`/shopuser/info?email=${email}`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
</script>
