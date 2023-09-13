import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("../components/Layout.vue"),
    children: [
      {
        path: "order/list",
        component: () => import("../views/Orders/OrdersList.vue"),
      },
      {
        path: "order/create",
        component: () => import("../views/Orders/CreateOrders.vue"),
      },
      {
        path: "agent/list",
        component: () => import("../views/Agent/AgentList.vue"),
      },
      {
        path: "product/list",
        component: () => import("../views/Product/ProductList.vue"),
      },
      {
        name: "editProduct",
        path: "product/list/edit/:id",
        component: () => import("../views/Product/EditProduct.vue"),
      },
      {
        path: "product/create",
        component: () => import("../views/Product/CreateProduct.vue"),
      },
      {
        path: "product/addon",
        component: () => import("../views/Product/AddonList.vue"),
      },
      {
        path: "product/create-addon",
        component: () => import("../views/Product/CreateAddon.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
