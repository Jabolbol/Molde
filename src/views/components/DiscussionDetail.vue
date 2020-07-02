<template>
    <div class="discussion-room">
        <div class="discussion-question">
            <h1>{{ getDiscussion.question }}</h1>
        </div>
        <div class="discussion-responses">
            <div v-for="response in getDiscussion.responses" :key="response.id" class="response">
                <p
                        v-if="response.shopReplyUsername || response.shopReplyUsername ==''"
                >{{ response.shopReplyUsername }}</p>
                <p
                        v-if="response.shopUserReplyUsername || response.shopUserReplyUsername ==''"
                >{{ response.shopUserReplyUsername }}</p>
                {{ response.message }}
            </div>
        </div>
        <form>
            <input type="text" v-model="detail" name="message" placeholder="Ketikkan balasan di sini"/>
            <input type="submit" value="Kirim" @click="sendResponse"/>
        </form>
    </div>
</template>

<script>
    import axios from "axios";
    import {mapGetters, mapActions} from "vuex";
    import {messaging} from "../../firebaseConfig";

    export default {
        name: "DiscussionDetail",
        data() {
            return {
                detail: ""
            };
        },
        methods: {
            ...mapActions([
                "getDiscussionDetail",
                "replyDiscussion",
                "catchDiscussionReply"
            ]),

            connect() {
                const discussionId = this.$route.params.id;
                const catchMessage = this.catchDiscussionReply;

                messaging
                    .requestPermission()
                    .then(function () {
                        return messaging.getToken();
                    })
                    .then(function (token) {
                        axios
                            .post(`discussions/subscribe?token=${token}`)
                            .then(function (res) {
                                console.log(res);
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });

                messaging.onMessage(function (payload) {
                    console.log("Message received");
                    const response = {
                        shopReplyUsername: payload.data.shopReplyUsername,
                        shopUserReplyUsername: payload.data.shopUserReplyUsername,
                        message: payload.data.message
                    };

                    if (payload.data.discussionId == discussionId) {
                        catchMessage(response);
                    }
                });
            },

            disconnect() {
                messaging
                    .getToken()
                    .then(function (token) {
                        axios
                            .post(`discussions/unsubscribe?token=${token}`)
                            .then(function (res) {
                                console.log(res);
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            },

            sendResponse(e) {
                e.preventDefault();
                const discussionId = this.$route.params.id;
                const request = new FormData();
                request.set("detail", this.detail);

                this.replyDiscussion({discussionId, request})
                    .then(() => {
                        this.detail = "";
                    });
            }
        },
        computed: mapGetters(["getDiscussion"]),
        created() {
            this.connect();
            this.getDiscussionDetail(this.$route.params.id)
                .catch((error) => {
                    if (error.message === "Request failed with status code 401") {
                        console.log(error);
                        this.$router.push("/pages/login");
                    }
                });
            ;
        },
        beforeDestroy() {
            this.disconnect();
        }
    };
</script>

<style>
    .discussion-room {
        background: #fff;
        padding: 25px;
        border-radius: 15px;
    }

    .response {
        border: 1px solid rgb(190, 190, 190);
        padding: 10px;
        border-radius: 15px;
        margin-bottom: 10px;
    }

    form {
        display: flex;
    }

    input[type="text"] {
        flex: 10;
        padding: 10px;
        border: 1px solid #41b883;
        outline: 0;
    }

    input[type="submit"] {
        flex: 2;
        background: #41b883;
        color: #fff;
        border: 1px #41b883 solid;
        cursor: pointer;
    }
</style>
