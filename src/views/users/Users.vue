<template>
    <CRow>
        <CCol col="12" xl="8">
            <CCard>
                <CCardHeader>
                    Users
                </CCardHeader>
                <CCardBody>
                    <CDataTable
                            hover
                            striped
                            :items="items"
                            :fields="fields"
                            :items-per-page="5"
                            clickable-rows
                            :active-page="activePage"
                            @row-clicked="rowClicked"
                            :pagination="{ doubleArrows: false, align: 'center'}"
                            @page-change="pageChange"
                    />
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    import usersData from './UsersData'
    import axios from 'axios';

    export default {
        name: 'Users',
        data() {
            return {
                items: [],
                fields: [
                    {key: 'firstName'},
                    {key: 'lastName'},
                    {key: 'email', _classes: 'font-weight-bold'},
                    {key: 'phoneNo',}
                ],
                activePage: 1
            }
        },
        watch: {
            $route: {
                immediate: true,
                handler(route) {
                    if (route.query && route.query.page) {
                        this.activePage = Number(route.query.page)
                    }
                }
            }
        },
        methods: {
            getBadge(status) {
                switch (status) {
                    case 'Active':
                        return 'success'
                    case 'Inactive':
                        return 'secondary'
                    case 'Pending':
                        return 'warning'
                    case 'Banned':
                        return 'danger'
                    default:
                        'primary'
                }
            },
            rowClicked(item, index) {
                this.$router.push({path: `users/${index + 1}`})
            },
            pageChange(val) {
                this.$router.push({query: {page: val}})
            },
            getShopUsers() {
                axios.get("/shopuser/get-by-shop")
                    .then((response) => {
                        this.items = response.data.data;
                    }).catch((error) => {
                        console.log(error);
                    })
            }
        },
        created() {
            this.getShopUsers();
        }
    }
</script>
