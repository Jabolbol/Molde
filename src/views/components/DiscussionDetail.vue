<template>
  <div class="discussion-room">
    <div class="discussion-question">
      <h1>{{getDiscussion.question}}</h1>
    </div>
    <div class="discussion-responses">
      <div v-for="response in getDiscussion.responses" :key="response.id" class="response">
        <p v-if="response.shopReplyUsername">{{response.shopReplyUsername}}</p>
        <p v-if="response.shopUserReplyUsername">{{response.shopUserReplyUsername}}</p>
        {{response.message}}
      </div>
    </div>
    <form>
      <input type="text" v-model="detail" name="message" placeholder="Ketikkan balasan di sini" />
      <input type="submit" value="Kirim" @click="sendResponse" />
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DiscussionDetail",
  data() {
    return {
      detail: ""
    };
  },
  methods: {
    ...mapActions(["getDiscussionDetail", "replyDiscussion"]),
    sendResponse(e) {
      e.preventDefault();
      const discussionId = this.$route.params.id;
      const request = new FormData();
      request.set("detail", this.detail);

      this.replyDiscussion({ discussionId, request }).then(resp => {
        this.detail = "";
      });
    }
  },
  computed: mapGetters(["getDiscussion"]),
  created() {
    this.getDiscussionDetail(this.$route.params.id);
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