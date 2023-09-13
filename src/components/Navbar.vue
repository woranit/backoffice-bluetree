<template>
  <v-app-bar height="80">
    <v-row class="align-center">
      <v-col cols="9" sm="3" md="2" class="d-flex align-center">
        <v-toolbar-items
          class="mx-5"
          style="font-size: 25px; font-weight: bold"
        >
          <v-btn
            class="d-lg-none"
            @click="toggleDrawer"
            style="background-color: transparent"
            density="compact"
            icon="mdi-menu"
          ></v-btn>
          {{ pageTitle }}
        </v-toolbar-items>
      </v-col>
      <v-divider :thickness="2" vertical class="my-3 ml-4"></v-divider>
      <v-col cols="auto" sm="6" md="8" class="d-none d-md-block">
        <div>
          <v-btn-toggle class="d-flex align-center">
            <v-btn
              v-for="button in pageButtons"
              :key="button.label"
              height="35px"
              width="160px"
              style="border-radius: 5px; text-align: center"
              :class="button.class"
              :to="button.to"
            >
              {{ button.label }}
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
      <v-spacer v-if="xs || sm == false"></v-spacer>
      <v-col class="text-right" cols="2" sm="2" md="1">
        <v-btn
          class="ml-md-2"
          style="
            background-color: #ffc4b1;
            color: #d9633c;
            min-width: 40px;
            flex-shrink: 0;
          "
          icon="mdi-account"
          size="small"
        ></v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
const emits = defineEmits(["toggle-drawer"]);

function toggleDrawer() {
  console.log("Emitting toggle-drawer");
  emits("toggle-drawer");
}

const { xs, sm } = useDisplay();
const pageTitle = ref("");
const pageButtons = ref([
  { label: "", class: "", to: "" },
  { label: "", to: "" },
]);

const route = useRoute();

// Update pageTitle and pageButtons based on the current route's path

watchEffect(() => {
  const currentPath = route.path.trim();
  console.log("Current Route:", currentPath);
  if (currentPath.startsWith("/dashboard/order")) {
    // console.log("Setting for Orders");
    pageTitle.value = "ORDERS";
    pageButtons.value = [
      { label: "Order List", class: "ml-5", to: "/dashboard/order/list" },
      { label: "Create Order", to: "/dashboard/order/create" },
      { label: "Fill List", to: "/dashboard/order/fill" },
      { label: "Create Fill", to: "/dashboard/order/create-fill" },
    ];
  } else if (currentPath.startsWith("/dashboard/agent")) {
    pageTitle.value = "Agent";
    pageButtons.value = [
      { label: "Agent List", class: "ml-5", to: "/dashboard/agent/list" },
      { label: "Create Agent", to: "/dashboard/agent/create" },
      { label: "Agent Fill", to: "/dashboard/agent/fill" },
      { label: "Create Fill", to: "/dashboard/agent/create-fill" },
    ];
  } else if (currentPath.startsWith("/dashboard/product")) {
    pageTitle.value = "Product";
    pageButtons.value = [
      { label: "Product List", class: "ml-5", to: "/dashboard/product/list" },
      { label: "Create Product", to: "/dashboard/product/create" },
      { label: "Additional List", to: "/dashboard/product/addon" },
      {
        label: "Create Additional",
        to: "/dashboard/product/create-addon",
      },
    ];
  } else if (route.path === "/dashboard/waiver") {
    pageTitle.value = "Waiver Form";
    pageButtons.value = [
      {
        label: "Waiver Form List",
        class: "ml-5",
        to: "/dashboard/waiver/list",
      },
      { label: "Create Waiver Form", to: "/dashboard/waiver/create" },
    ];
  } else if (route.path === "/dashboard/mode") {
    pageTitle.value = "Mode";
    pageButtons.value = [
      { label: "Booking", class: "ml-5", to: "/dashboard/mode/booking" },
      { label: "Package", to: "/dashboard/mode/package" },
      { label: "Member", to: "/dashboard/mode/member" },
    ];
  } else if (route.path === "/dashboard/marketing") {
    pageTitle.value = "Marketing";
    pageButtons.value = [
      {
        label: "Promotion",
        class: "ml-5",
        to: "/dashboard/marketing/promotion",
      },
      { label: "Campaign", to: "/dashboard/marketing/campaign" },
    ];
  } else if (route.path === "/dashboard/customer") {
    pageTitle.value = "Customer User";
    pageButtons.value = [
      { label: "Customer", class: "ml-5", to: "/dashboard/customer" },
    ];
  } else if (route.path === "/dashboard/news") {
    pageTitle.value = "News";
    pageButtons.value = [
      { label: "Banner", class: "ml-5", to: "/dashboard/news/banner" },
      { label: "Happening", to: "/dashboard/news/happening" },
      { label: "Promotion", to: "/dashboard/news/promotion" },
    ];
  }
});
</script>

<style scoped>
.v-btn {
  margin: 0 5px;
  font-size: small;
  font-weight: 600;
  color: #acacac;
  background-color: #ececec;
  text-transform: capitalize;
}

.v-btn:not(.v-btn--active):hover {
  color: #f39170;
  background-color: #ffebe5;
}

.v-btn--active {
  background-color: #d9633c;
  color: white;
}
</style>
