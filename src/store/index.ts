import { createStore } from "vuex";
import auth from "./auth.ts";
import product from "./product.ts";

const store = createStore({
  modules: {
    auth,
    product,
  },
});

export default store;
