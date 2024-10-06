import Vuex from 'vuex'

const Storage = new Vuex.Store({
  state: {
    user: {
      id: String(),
      firstName: String(),
      midName: String(),
      lastName: String(),
      interests: [],
      photoUrl: String(),
      email: String(),
      phone: String(),
      role: null,
      bio: String(),

      isSignedIn: false,
    },
  },
  mutations: {
    SET_USER(state, userData) {
      state.user.id = userData.id;
      state.user.firstName = userData.firstName;
      state.user.midName = userData.midName;
      state.user.lastName = userData.lastName;
      state.user.interests = userData.interests
      state.user.photoUrl = userData.photoUrl;
      state.user.email = userData.email;
      state.user.phone = userData.phone;
      state.user.role = userData.role;
      state.user.bio = userData.bio;

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
