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
    fetchDiscussions: ({commit}) => {
        return new Promise((resolve, reject) => {
            axios({method: 'get', url: 'discussions'})
                .then((resp) => {
                    const discussions = resp.data.data;
                    commit('setDiscussions', discussions);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    },
    getDiscussionDetail: ({commit}, discussionId) => {
        return new Promise((resolve, reject) => {
            axios({method: 'get', url: `discussions/${discussionId}`})
                .then((resp) => {
                    const discussion = resp.data.data;
                    commit('setDiscussion', discussion);
                    commit('setResponses', discussion.responses);
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    },
    replyDiscussion: ({discussionId, request}) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `discussions/${discussionId}/reply`,
                data: request,
            })
                .then(() => {
                    resolve(true);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    },
    catchDiscussionReply: ({commit}, data) => {
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
