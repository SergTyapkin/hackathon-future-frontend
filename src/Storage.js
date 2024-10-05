import Vuex from 'vuex'

const Storage = new Vuex.Store({
  state: {
    user: {
      id: String(),
      name: String(),
      email: String(),
      phone: String(),
      isAdmin: Boolean(),
      interests: [],
      
      isSignedIn: false,
    },
  },
  mutations: {
    SET_USER(state, userData) {
      state.user = userData

      state.user.isSignedIn = true;
    },
    DELETE_USER(state) {
      state.user.isSignedIn = false;
    },
  },
  actions: {
    async GET_USER(state) {
      const {data, code, ok} = await this.$app.$api.getUser();
      if (!ok) {
        state.commit('DELETE_USER');
        return;
      }
      state.commit('SET_USER', data);
    },
    DELETE_USER(state) {
      state.commit('DELETE_USER');
    },
  }
});

export default Storage;
