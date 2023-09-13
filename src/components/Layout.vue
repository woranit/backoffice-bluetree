<template>
  <div>
    <div>
      <v-navigation-drawer
        v-model="drawerVisible"
        :permanent="!isSmallScreen"
        temporary
        :app="true"
        theme="dark"
        close-on-click
        overlay
      >
        <v-list density="compact" nav>
          <!-- logo -->
          <v-list-item>
            <v-list-item-title>
              <img src="../assets/icon/logo.svg" width="150" height="60" />
            </v-list-item-title>
          </v-list-item>
          <!-- overviews -->
          <div style="font-size: 14px; color: #6a6a6a" class="my-2">
            REPORTS
          </div>
          <v-list-item value="">
            <div class="d-flex align-center">
              <img class="pr-3" src="../assets/icon/overviews.svg" />
              <span>Overviews</span>
            </div>
          </v-list-item>
          <!-- management -->
          <div style="font-size: 14px; color: #6a6a6a" class="my-2">
            MANAGEMENT
          </div>
          <div v-for="(group, index) in data.items" :key="index">
            <v-list-group v-if="group.children">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" value="">
                  <div class="d-flex align-center">
                    <img class="pr-3" :src="group.icon" />
                    <span>{{ group.title }}</span>
                  </div>
                </v-list-item>
              </template>
              <v-list-item
                v-for="(item, itemIndex) in group.children"
                :key="itemIndex"
                :to="`/dashboard/${item.path}`"
                exact
                @click="onListItemClick"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <li>
                      {{ item.title }}
                    </li>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <!-- customer -->
            <v-list-item exact value="100" v-else>
              <div class="d-flex align-center">
                <img class="pr-3" :src="group.icon" />
                <span>{{ group.title }}</span>
              </div>
            </v-list-item>
          </div>
        </v-list>
      </v-navigation-drawer>
      <!-- overlay -->
      <div
        v-if="drawerVisible && isSmallScreen"
        @click="closeDrawer"
        class="custom-overlay"
      ></div>
    </div>
    <!-- navbar -->
    <Navbar @toggle-drawer="handleDrawerToggle" />
    <!-- content -->
    <v-main>
      <div class="pa-8" style="background-color: #f5f5f5">
        <router-view></router-view>
      </div>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { watch, computed, ref } from "vue";
import Navbar from "../components/Navbar.vue";

import ordersIcon from "../assets/icon/orders.svg";
import agentsIcon from "../assets/icon/agent.svg";
import modeIcon from "../assets/icon/mode.svg";
import customerIcon from "../assets/icon/customer.svg";
import productIcon from "../assets/icon/product.svg";

const drawerVisible = ref(true);

import { useDisplay } from "vuetify";
const { xs, sm, md, lg } = useDisplay();

const isSmallScreen = computed(
  () => xs.value || sm.value || md.value || lg.value
);

const handleDrawerToggle = () => {
  console.log("Received toggle-drawer event");
  drawerVisible.value = !drawerVisible.value;
};

const onListItemClick = () => {
  if (isSmallScreen.value) {
    drawerVisible.value = false;
  }
};

const closeDrawer = () => {
  drawerVisible.value = false;
};

watch(isSmallScreen, (newValue) => {
  drawerVisible.value = newValue ? false : true;
});

const data = ref({
  items: [
    {
      title: "Orders",
      icon: ordersIcon,
      children: [
        { title: "Orders List", value: "1", path: "order/list" },
        { title: "Create Orders", value: "2", path: "order/create" },
        { title: "Orders Fill List", value: "3" },
        { title: "Create Fill", value: "4" },
      ],
    },
    {
      title: "Agent",
      icon: agentsIcon,
      children: [
        { title: "Agent List", value: "5", path: "agent/list" },
        { title: "Create Agent", value: "6" },
        { title: "Agent Fill", value: "7" },
        { title: "Create Fill", value: "8" },
      ],
    },
    {
      title: "Product",
      icon: productIcon,
      children: [
        { title: "Product List", value: "9", path: "product/list" },
        { title: "Create Product", value: "10", path: "product/create" },
        { title: "Additional List", value: "11", path: "product/addon" },
        {
          title: "Create Additional",
          value: "12",
          path: "product/create-addon",
        },
      ],
    },
    {
      title: "Waiver Form",
      icon: ordersIcon,
      children: [
        { title: "Waiver Form List", value: "13" },
        { title: "Create Waiver Form", value: "14" },
      ],
    },
    {
      title: "Mode",
      icon: modeIcon,
      children: [
        { title: "Booking", value: "15" },
        { title: "Package", value: "16" },
        { title: "Member", value: "17" },
      ],
    },
    {
      title: "Marketing",
      icon: ordersIcon,
      children: [
        { title: "Promotion", value: "18" },
        { title: "Campaign", value: "19" },
      ],
    },
    {
      title: "Customer User",
      icon: customerIcon,
      value: "20",
      path: "customer",
    },
    {
      title: "News",
      icon: ordersIcon,
      children: [
        { title: "Banner", value: "21" },
        { title: "Happening", value: "22" },
        { title: "Promotion", value: "23" },
      ],
    },
  ],
});
</script>

<style scoped>
.custom-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 4;
}

.v-navigation-drawer__scrim {
  display: none !important;
}
</style>
