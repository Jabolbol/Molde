<template>
    <CRow>
        <CCol>
            <CCard>
                <CCardHeader>
                    <h1>Daftar diskusi</h1>
                </CCardHeader>
                <CCardBody>
                    <div v-for="discussion in allDiscussions" :key="discussion.id">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">{{discussion.detail}}</h4>
                                <div class="card-text">
                                    <p>
                                        Dibuat oleh:
                                        <b>{{discussion.questionMaker}}</b>
                                    </p>
                                    <router-link
                                            class="btn btn-primary"
                                            :to="`discussion-detail/${discussion.id}`"
                                    >Lihat Diskusi
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "Discussion",
        data() {
            return {
                responses: []
            };
        },
        methods: {
            ...mapActions(["fetchDiscussions"])
        },
        computed: mapGetters(["allDiscussions"]),
        created() {
            this.fetchDiscussions()
                .catch((error) => {
                    if (error.message === "Request failed with status code 401") {
                        console.log(error);
                        this.$router.push("/pages/login");
                    }
                });
        }
    };
</script>

<style scoped>
    .discussions {
        padding: 10px;
        height: auto;
        width: 100%;
        max-height: 100%;
        overflow: auto;
        background: #fff;
        border-radius: 10px;
    }
</style>