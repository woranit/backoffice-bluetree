<template>
  <v-row>
    <v-col class="title"> ADDITIONAL LIST </v-col>
    <v-btn class="createBtn" to="/dashboard/product/create-addon">
      <img class="pr-2" :src="createIcon" />
      Create Add-on
    </v-btn>
  </v-row>
  <!-- table -->
  <v-row>
    <v-col>
      <v-data-table
        v-model:page="page"
        :items-per-page="itemsPerPage"
        :headers="headers"
        :items="filterAddon"
        item-key="product_id"
        class="elevation-5"
        style="border-radius: 10px"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-row>
              <v-col align-self="center">
                <v-card-title>ADDITIONAL LIST</v-card-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2">
                <v-text-field
                  v-model="search"
                  placeholder="Search Add-on"
                  hide-details
                  density="compact"
                  variant="outlined"
                  bg-color="#F3F5F7"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              @click="searchAddon"
              class="search"
              icon="mdi-magnify"
            ></v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.index="{ index }">
          {{ (page - 1) * itemsPerPage + index + 1 }}
        </template>

        <template v-slot:item.addon_price_thb="{ item }">
          <span> ฿{{ item.columns.addon_price_thb.toLocaleString() }} </span>
        </template>

        <template v-slot:item.active="{ item }">
          <v-switch
            v-model="item.columns.active"
            color="#D9633C"
            density="compact"
          ></v-switch>
        </template>

        <template v-slot:item.actions="{}">
          <v-row class="ml-0 text-center">
            <v-icon icon="mdi-pencil-outline" variant="text" size="small">
            </v-icon>
            <v-icon size="small" @click=""> mdi-delete-outline </v-icon>
          </v-row>
        </template>

        <template v-slot:bottom>
          <v-row class="pt-2 px-2">
            <v-col cols="auto">
              <v-select
                variant="solo-filled"
                :hide-details="true"
                flat
                :items-per-page="itemsPerPage"
                v-model="itemsPerPage"
                :items="[10, 20, 30, 40, 50]"
              ></v-select>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-pagination
                active-color="primary"
                v-model="page"
                :length="Math.ceil(filterAddon.length / itemsPerPage)"
              ></v-pagination>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import createIcon from "../../assets/icon/create.svg";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const addon = computed(() => store.getters["product/getAddonList"].data);
const page = ref(1);
const itemsPerPage = ref(10);

const headers = [
  { title: "No.", key: "index", sortable: false },
  { title: "ADD-ON ID", key: "addon_id", sortable: false },
  { title: "ADD-ON Name", key: "addon_name_en", sortable: false },
  { title: "Total Price", key: "addon_price_thb", sortable: false },
  { title: "Active", key: "active", sortable: false },
  { title: "Action", key: "actions", sortable: false },
];

const filterAddon = ref([]);
const search = ref("");

const searchAddon = () => {
  filterAddon.value = addon.value.filter((addon: any) => {
    return (
      addon.addon_name_en.toLowerCase().includes(search.value.toLowerCase()) ||
      addon.addon_id.toString().includes(search.value.toLowerCase())
    );
  });
};

onMounted(async () => {
  try {
    await store.dispatch("product/fetchAddon");
    // console.log("Products from store:", products.value);
    filterAddon.value = addon.value;
    console.log("Search addon:", filterAddon.value);
  } catch (error) {
    console.error("Error fetching addon:", error);
  }
});
</script>

<style scoped>
.v-text-field ::placeholder {
  color: #8d8e96;
  font-size: 14px;
  font-weight: 500;
  opacity: 1;
}

.search {
  background-color: #ad1f2d;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  height: 65%;
  width: 43px;
  margin: 4px 10px;
}

.v-toolbar {
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.v-card-title {
  font-size: 16px;
  font-weight: 700;
}

/* header font style */
:deep(.v-table > .v-table__wrapper > table > thead > tr > th) {
  color: #3c3c3c;
  font-size: 16px;
  font-weight: 600;
}

/* header Action font style */
:deep(
    .v-table > .v-table__wrapper > table > thead > tr > th:nth-last-child(1)
  ) {
  color: #d9633c;
}

:deep(.v-table .v-table__wrapper > table > tbody > tr > td) {
  color: #848484;
  font-weight: 500;
}

/* Style for even rows */
:deep(.v-table .v-table__wrapper > table > tbody > tr:nth-child(even) > td) {
  background-color: #fefaf9;
}

/* Style for odd rows */
:deep(.v-table .v-table__wrapper > table > tbody > tr:nth-child(odd) > td) {
  background-color: white;
}

/* Remove default border-bottom */
:deep(.v-table .v-table__wrapper > table > tbody > tr > td) {
  border-bottom: none;
}

:deep(.v-switch__track) {
  height: 21px;
  opacity: 0.8;
}

.v-switch {
  display: flex;
  align-items: center;
}

:deep(.v-switch__thumb) {
  height: 18px;
  width: 18px;
}

.v-icon {
  margin: 0 5px;
}

.v-icon:hover {
  color: #d9633c;
}

:deep(.v-pagination__list) {
  justify-content: right;
}

:deep(.text-primary) {
  color: #fefaf9 !important;
  background-color: #d9633c;
}
</style>
```
