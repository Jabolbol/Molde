<template>
  <div class="row">
    <div class="discussions">
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
              >Lihat Diskusi</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
    this.fetchDiscussions();
  }
};
</script>

<style scoped>
.discussions {
  background: #fff;
  padding: 10px;
}

button {
  float: right;
}
</style>