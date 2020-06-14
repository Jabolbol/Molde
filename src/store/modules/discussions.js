import axios from 'axios';

const state = {
  discussions: [],
  discussion: {},
  responses: [],
};

const getters = {
  allDiscussions: (state) => state.discussions,
  getDiscussion: (state) => state.discussion,
};

const actions = {
  fetchDiscussions: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axios({ method: 'get', url: 'discussions' })
        .then((resp) => {
          const discussions = resp.data.data;
          commit('setDiscussions', discussions);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  getDiscussionDetail: ({ commit }, discussionId) => {
    return new Promise((resolve, reject) => {
      axios({ method: 'get', url: `discussions/${discussionId}` })
        .then((resp) => {
          const discussion = resp.data.data;
          commit('setDiscussion', discussion);
          commit('setResponses', discussion.responses);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  replyDiscussion: ({ commit }, { discussionId, request }) => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `discussions/${discussionId}/reply`,
        data: request,
      })
        .then((resp) => {
          const response = resp.data.data;
          commit('updResponses', response);
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  replyDiscussionWs: ({ commit }, data) => {
    commit('updResponses', data);
  },
};

const mutations = {
  setDiscussions: (state, discussions) => (state.discussions = discussions),
  setDiscussion: (state, discussion) => (state.discussion = discussion),
  setResponses: (state, responses) => (state.responses = responses),
  updResponses: (state, response) => state.responses.push(response),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
