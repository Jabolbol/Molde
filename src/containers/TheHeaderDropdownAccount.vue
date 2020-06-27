<template>
    <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
        <template #toggler>
            <CHeaderNavLink>
                <div class="c-avatar">
                    <img src="img/avatars/6.jpg" class="c-avatar-img"/>
                </div>
            </CHeaderNavLink>
        </template>
        <CDropdownHeader tag="div" class="text-center" color="light">
            <strong>Account</strong>
        </CDropdownHeader>
        <CDropdownItem>
            <CIcon name="cil-user"/>
            Profile
        </CDropdownItem>
        <CDropdownDivider/>
        <CDropdownItem @click="logout">
            <CIcon name="cil-lock-locked"/>
            Logout
        </CDropdownItem>
    </CDropdown>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "TheHeaderDropdownAccnt",
        data() {
            return {
                itemsCount: 42
            };
        },
        methods: {
            ...mapActions(['doLogout']),
            logout() {
                console.log("Logout");
                this.doLogout();
                this.$router.push("/pages/login");
            }
        }
    };
</script>

<style scoped>
    .c-icon {
        margin-right: 0.3rem;
    }
</style>
