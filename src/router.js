import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/products",
    name: "products",
    component: () => import("./components/ProductList")
  },
  {
    path: "/products/edit/:id",
    name: "product-details",
    component: () => import("./components/Product")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddProduct")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;