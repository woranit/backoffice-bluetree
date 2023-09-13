import apiClient from "../apiClient";

interface Product {
  product_id: number;
  product_code: string | unknown;
  product_name_th: string;
  product_name_en: string;
  product_adult_price: number;
  product_child_price: number;
  product_total_price: number;
  product_addon: number;
}

//describe the object as an array of Product
interface ProductState {
  products: Product[];
}

interface productDetail {
  product_id: number;
  product_code: string | null;
  product_name_th: string;
  product_name_en: string;
  product_description_th: string;
  product_description_en: string;
  product_expired_type: Number;
  product_expired_date: string | null;
  product_expried_in: number | null;
  product_alotment: number;
  product_seperate_adult_child: number;
  product_have_sale_price: number;
  product_standard_price_thb: number | null;
  product_standard_price_usd: number | null;
  product_standard_adult_price_thb: number | null;
  product_standard_adult_price_usd: number | null;
  product_standard_child_price_thb: number | null;
  product_standard_child_price_usd: number | null;
  product_sale_price_thb: number | null;
  product_sale_price_usd: number | null;
  product_adult_sale_price_thb: number | null;
  product_adult_sale_price_usd: number | null;
  product_child_sale_price_thb: number | null;
  product_child_sale_price_usd: number | null;
  product_profile_image: string;
  product_status: number;
}

interface productImage {
  product_image_id: number;
  product_image_image: string;
}

interface productAddon {
  addon_id: number;
  addon_code: string | null;
  addon_name_th: string;
  addon_name_en: string;
  addon_description_th: string;
  addon_description_en: string;
  addon_profile_image: string;
  addon_price_thb: number;
  addon_price_usd: number;
}

interface productCategory {
  category_id: number;
  category_code: string | null;
  category_name_th: string;
  category_name_en: string;
  category_description_th: string;
  category_description_en: string;
  category_status: number;
}

interface productChannel {
  channel_id: number;
  channel_name: string;
}

interface productData {
  product: productDetail;
  product_image: productImage[];
  product_addon: productAddon[];
  product_categort: productCategory[];
  product_channel: productChannel[];
}

interface AddonList {
  addon_id: number;
  addon_code: string | null;
  addon_name_th: string;
  addon_name_en: string;
  addon_total_price: number;
}

//creating a state object as empty array of Product
const state = {
  products: [] as Product[],
  productDetail: {} as productData,
  addonList: [] as AddonList[],
};

const mutations = {
  //pass the products from the API to the state
  SET_PRODUCTS(state: ProductState, products: Product[]) {
    state.products = products;
  },
  SET_PRODUCT_DETAIL(state: any, payload: productData) {
    state.productDetail = payload;
  },
  SET_ADDON_LIST(state: any, payload: AddonList[]) {
    state.addonList = payload;
  },
};

const getters = {
  allProducts: (state: ProductState) => state.products,
  getProductDetail: (state: any) => state.productDetail,
  getAddonList: (state: any) => state.addonList,
};

const actions = {
  async fetchProducts({ commit }: any) {
    let url = "api/blue_tree/bof/get_product_list_backoffice";
    await apiClient
      .get(url)
      .then((response) => {
        commit("SET_PRODUCTS", response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  },

  async createProducts(context: any, data: any) {
    console.log(data);
    let url = "api/blue_tree/bof/create_product";
    return apiClient
      .post(url, data)
      .then((response) => {
        return true;
      })
      .catch((response) => {
        return false;
      });
  },

  async getProduct_detail(context: any, data: string) {
    let url = `api/blue_tree/bof/get_product_detail_backoffice/${data}`;
    await apiClient
      .get(url)
      .then((res) => {
        context.commit("SET_PRODUCT_DETAIL", res.data);
        return res.data;
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        return false;
      });
  },

  async deleteProduct(context: any, data: string) {
    let url = `api/blue_tree/bof/delete_product_backoffice/${data}`;
    return apiClient
      .delete(url)
      .then((res) => {
        return true;
      })
      .catch((res) => {
        return false;
      });
  },

  async fetchCategory() {
    let url = "api/blue_tree/bof/get_category_list_backoffice";
    try {
      const response = await apiClient.get(url);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch category:", error);
      return null; // You can return null or some error object to handle the error appropriately
    }
  },

  async fetchAddon({ commit }: any) {
    let url = "api/blue_tree/bof/get_addon_list_backoffice";
    await apiClient
      .get(url)
      .then((response) => {
        commit("SET_ADDON_LIST", response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch addon:", error);
      });
  },

  async createAddon(context: any, data: any) {
    console.log(data);
    let url = "api/blue_tree/bof/create_addon";
    return apiClient
      .post(url, data)
      .then((response) => {
        return true;
      })
      .catch((response) => {
        return false;
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
