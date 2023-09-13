<template>
  <v-row>
    <v-col class="title"> PRODUCT LIST </v-col>
    <v-btn class="createBtn" to="/dashboard/product/create">
      <img class="pr-2" :src="createIcon" />
      Create Product
    </v-btn>
  </v-row>
  <!-- table -->
  <v-row>
    <v-col>
      <v-data-table
        v-model:page="page"
        :items-per-page="itemsPerPage"
        :headers="headers"
        :items="filterProducts"
        item-key="product_id"
        class="elevation-5"
        style="border-radius: 10px"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-row>
              <v-col align-self="center">
                <v-card-title>PRODUCT LIST</v-card-title>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2">
                <v-text-field
                  v-model="search"
                  placeholder="Search Product"
                  hide-details
                  density="compact"
                  variant="outlined"
                  bg-color="#F3F5F7"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              @click="searchProduct"
              class="search"
              icon="mdi-magnify"
            ></v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.index="{ index }">
          {{ (page - 1) * itemsPerPage + index + 1 }}
        </template>

        <template v-slot:item.active="{ item }">
          <v-switch
            v-model="item.columns.active"
            color="#D9633C"
            density="compact"
          ></v-switch>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-row class="ml-0 text-center">
            <v-icon
              icon="mdi-pencil-outline"
              variant="text"
              size="small"
              @click="
                edit(item.columns.product_id) // <--- here
              "
            >
            </v-icon>
            <v-icon
              size="small"
              @click="deleteProduct(item.columns.product_id)"
            >
              mdi-delete-outline
            </v-icon>
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
                :length="Math.ceil(filterProducts.length / itemsPerPage)"
              ></v-pagination>
            </v-col>
          </v-row>
        </template>
      </v-data-table>

      <v-dialog v-model="deleteDialog" max-width="300">
        <v-card>
          <v-card-text>Are you sure you want to delete?</v-card-text>
          <v-card-actions>
            <v-btn
              color="green darken-1"
              variant="text"
              @click="deleteDialog = false"
              >Cancel</v-btn
            >
            <v-btn
              color="red darken-1"
              variant="text"
              @click="confirmDelete = true"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import createIcon from "../../assets/icon/create.svg";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { watch } from "vue";

const store = useStore();
const router = useRouter();
const products = computed(() => store.getters["product/allProducts"].data);
const page = ref(1);
const itemsPerPage = ref(10);
const deleteDialog = ref(false);
const confirmDelete = ref(false);

const headers = [
  { title: "No.", key: "index", sortable: false },
  { title: "Product ID", key: "product_id", sortable: false },
  { title: "Product Name", key: "product_name_en", sortable: false },
  { title: "Adult Price", key: "product_adult_price", sortable: false },
  { title: "Child Price", key: "product_child_price", sortable: false },
  { title: "Total Price", key: "product_total_price", sortable: false },
  { title: "Add-On", key: "product_addon", sortable: false },
  { title: "Active", key: "active", sortable: false },
  { title: "Action", key: "actions", sortable: false },
];

const filterProducts = ref([]);
const search = ref("");

const searchProduct = () => {
  filterProducts.value = products.value.filter((product: any) => {
    return (
      product.product_name_en
        .toLowerCase()
        .includes(search.value.toLowerCase()) ||
      product.product_id.toString().includes(search.value.toLowerCase())
    );
  });
};

const deleteProduct = async (id: number) => {
  deleteDialog.value = true;
  // console.log("Delete product id:", id);
  watch(confirmDelete, async (value) => {
    if (value === true) {
      try {
        await store.dispatch("product/deleteProduct", String(id));
        filterProducts.value = filterProducts.value.filter(
          (product: any) => product.product_id !== id
        );
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        deleteDialog.value = false;
        confirmDelete.value = false;
      }
    } else {
      confirmDelete.value = false;
    }
  });
};

onMounted(async () => {
  try {
    await store.dispatch("product/fetchProducts");
    console.log("Products from store:", products.value);
    filterProducts.value = products.value;
    console.log("Search Products:", filterProducts.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

const edit = (id: number) => {
  console.log("Edit product id:", id);
  router.push({ name: "editProduct", params: { id: id } });
};
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
