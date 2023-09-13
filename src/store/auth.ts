import apiClient from "../apiClient";

interface AuthState {
  isAuthenticated: boolean;
}

const state: AuthState = {
  isAuthenticated: false,
};

const mutations = {
  SET_AUTHENTICATION(state: AuthState, isAuthenticated: boolean) {
    state.isAuthenticated = isAuthenticated;
  },
};

const actions = {
  async authenticateUser() {
    console.log(apiClient);
    let url = "api/blue_tree/bof/get_product_list_backoffice";
    apiClient.get(url).then((response) => {
      console.log(response);
    });
  },
};

const getters = {
  isAuthenticated: (state: AuthState) => state.isAuthenticated,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
