<template>
  <!-- title and buttons -->
  <v-row>
    <v-col class="title"> Create Product</v-col>
    <v-btn class="cancelBtn" to="/dashboard/product/list">
      <img class="pr-2" width="30" src="../../assets/icon/cancel.svg" />
      Cancel
    </v-btn>
    <v-btn class="createBtn" @click="create_product()" :loading="loading_btn">
      <img class="pr-2" :src="createIcon" />
      Create Product
    </v-btn>
  </v-row>
  <!-- form -->
  <v-row>
    <v-col>
      <v-card class="elevation-3">
        <v-form ref="form">
          <v-card-title style="font-size: 16px; font-weight: 700"
            >CREATE Product
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title class="pb-6">
            <div class="py-4">
              <span class="label">Image</span><span class="star">*</span>
            </div>
            <v-row class="py-2">
              <!-- Product Profile Image -->
              <v-col lg="4" md="4">
                <div class="subtitle">Product Profile Image</div>
                <v-hover v-slot="{ isHovering, props }" open-delay="200">
                  <v-card
                    :ripple="false"
                    :color="isHovering && imageSrc ? 'black' : ''"
                    @click="openProfilePicker"
                    @dragover.prevent
                    @drop="handleDrop"
                    :class="[
                      single_img_valid
                        ? 'image-upload-box_error'
                        : 'image-upload-box',
                    ]"
                    flat
                    height="300"
                    v-bind="props"
                  >
                    <div v-if="!imageSrc" class="image-icon-text">
                      <img
                        src="../../assets/icon/image.svg"
                        alt="Image Icon"
                        width="130"
                      />
                      <div class="title" style="padding-top: 20px">
                        Insert or drag Image
                      </div>
                    </div>
                    <img
                      :style="{
                        opacity: isHovering ? '0.3' : '1',
                      }"
                      v-if="imageSrc"
                      :src="imageSrc"
                      alt="Uploaded Image"
                      class="uploaded-image"
                    />
                    <div
                      v-if="isHovering && imageSrc"
                      style="position: absolute"
                    >
                      <v-row justify="center">
                        <v-btn
                          class="editpf-btn"
                          size="x-large"
                          :ripple="false"
                          prepend-icon="mdi-pencil"
                          variant="text"
                          @click="editProfilePicker"
                        >
                          Edit
                        </v-btn>
                      </v-row>
                      <v-row justify="center">
                        <v-btn
                          class="editpf-btn"
                          size="x-large"
                          :ripple="false"
                          prepend-icon="mdi-magnify-plus-outline"
                          variant="text"
                          @click="dialog = true"
                          >Zoom
                        </v-btn>
                      </v-row>
                    </div>
                    <input
                      type="file"
                      ref="ProfileInput"
                      @change="handleFileUpload"
                      accept="image/png, image/jpeg, image/jpg, image/svg"
                      style="display: none"
                    />
                    <v-dialog v-model="dialog" width="auto">
                      <v-card>
                        <img v-if="imageSrc" :src="imageSrc" />
                      </v-card>
                    </v-dialog>
                  </v-card>
                </v-hover>
                <small v-if="single_img_valid" class="error"
                  >Image required</small
                >
              </v-col>
              <!-- Product Image -->
              <v-col
                :lg="imagePreviews.length > 4 ? '12' : '8'"
                :md="imagePreviews.length > 2 ? '12' : '8'"
                :sm="imagePreviews.length > 1 ? '12' : '6'"
              >
                <div class="subtitle">Product Image</div>
                <div
                  :class="[
                    product_img_valid
                      ? 'image-upload-box_2_error'
                      : 'image-upload-box_2',
                  ]"
                >
                  <!-- Hidden Input Element to allow file selection -->
                  <input
                    type="file"
                    ref="fileInput"
                    style="display: none"
                    multiple
                    accept="image/png, image/jpeg, image/jpg, image/svg"
                    @change="handleFileSelection"
                  />
                  <div
                    style="
                      position: absolute;
                      left: 50%;
                      top: 20%;
                      transform: translateX(-50%);
                    "
                  >
                    <img
                      v-if="imagePreviews.length === 0"
                      src="../../assets/icon/image.svg"
                      alt="Image Icon"
                      width="130"
                    />
                  </div>
                  <v-row style="margin: auto">
                    <div v-for="(item, index) in imagePreviews" :key="index">
                      <v-col cols="3">
                        <v-card
                          height="170"
                          width="180"
                          class="pa-2"
                          color="grey-lighten-3"
                        >
                          <v-row justify="end" style="height: 40px">
                            <v-col cols="3" class="d-flex justify-end"
                              ><v-btn
                                color="grey-darken-1"
                                size="x-small"
                                density="comfortable"
                                icon="mdi-close"
                                @click="removeImage(index)"
                              ></v-btn
                            ></v-col>
                          </v-row>
                          <div class="d-flex">
                            <img
                              src="../../assets/icon/filename.svg"
                              alt="Image Icon"
                              width="15"
                            />
                            <div class="pl-2" style="font-size: medium">
                              {{ item.name }}
                            </div>
                          </div>
                          <div>
                            <img
                              :src="item.src"
                              style="
                                object-fit: contain;
                                height: 100px;
                                width: 100%;
                              "
                            />
                          </div>
                        </v-card>
                      </v-col>
                    </div>
                  </v-row>

                  <v-btn
                    class="insertBtn"
                    @click="openImagePicker"
                    style="position: absolute; bottom: 30px"
                    >Insert File</v-btn
                  >
                </div>
                <small v-if="product_img_valid" class="error"
                  >Image required</small
                >
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider class="mx-5"></v-divider>
          <!-- Name -->
          <v-card-title>
            <div class="py-4">
              <span class="label">Name</span><span class="star">*</span>
            </div>
            <v-row>
              <v-col cols="12" lg="4" md="6">
                <div class="subtitle">Product Name TH</div>
                <v-text-field
                  :rules="[rules.required]"
                  v-model="name_th"
                  variant="outlined"
                  density="compact"
                  placeholder="Product Name TH"
                  class="input"
                ></v-text-field>
              </v-col>
              <v-col lg="4" md="6">
                <div class="subtitle">Product Name ENG</div>
                <v-text-field
                  :rules="[rules.required]"
                  v-model="name_eng"
                  variant="outlined"
                  density="compact"
                  placeholder="Product Name ENG"
                  class="input"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider class="mx-5"></v-divider>
          <!-- Channel -->
          <v-card-title>
            <div class="py-4">
              <span class="label">Channel</span><span class="star">*</span>
            </div>
            <v-row>
              <v-col>
                <div class="subtitle">Product Channel</div>
              </v-col>
            </v-row>
            <!-- {{ selected }} -->
            <div style="min-height: 110px">
              <v-row style="margin-top: -2%">
                <v-col
                  class="checkbox-col"
                  cols="12"
                  lg="auto"
                  md="auto"
                  sm="3"
                >
                  <v-checkbox
                    :error="err_msg_checkbox != ''"
                    :error-messages="err_msg_checkbox"
                    :color="selected.includes('Booking') ? '#d9633c' : ''"
                    v-model="selected"
                    value="Booking"
                    :hide-details="false"
                  >
                    <template v-slot:label>
                      <span
                        :class="{
                          'checkbox-label': selected.includes('Booking'),
                        }"
                        >Booking</span
                      >
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col
                  class="checkbox-col"
                  cols="12"
                  lg="auto"
                  md="auto"
                  sm="3"
                >
                  <v-checkbox
                    :error="err_msg_checkbox != ''"
                    :error-messages="err_msg_checkbox"
                    :color="selected.includes('Package') ? '#d9633c' : ''"
                    v-model="selected"
                    value="Package"
                    :hide-details="true"
                  >
                    <template v-slot:label>
                      <span
                        :class="{
                          'checkbox-label': selected.includes('Package'),
                        }"
                        >Package</span
                      >
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col
                  class="checkbox-col"
                  cols="12"
                  lg="auto"
                  md="auto"
                  sm="3"
                >
                  <v-checkbox
                    :error="err_msg_checkbox != ''"
                    :error-messages="err_msg_checkbox"
                    :color="selected.includes('Member') ? '#d9633c' : ''"
                    v-model="selected"
                    value="Member"
                    :hide-details="true"
                  >
                    <template v-slot:label>
                      <span
                        :class="{
                          'checkbox-label': selected.includes('Member'),
                        }"
                        >Member</span
                      >
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col cols="12" lg="auto" md="auto" sm="3">
                  <v-checkbox
                    :error="err_msg_checkbox != ''"
                    :error-messages="err_msg_checkbox"
                    :color="selected.includes('Create Order') ? '#d9633c' : ''"
                    v-model="selected"
                    value="Create Order"
                    :hide-details="true"
                    :rules="[rules.required]"
                  >
                    <template v-slot:label>
                      <span
                        :class="{
                          'checkbox-label': selected.includes('Create Order'),
                        }"
                        >Create Order</span
                      >
                    </template>
                  </v-checkbox>
                </v-col>
              </v-row>
            </div>
          </v-card-title>
          <v-divider class="mx-5"></v-divider>
          <!-- Expire -->
          <v-card-title>
            <div class="py-4">
              <span class="label">Expire</span><span class="star">*</span>
            </div>
            <v-row>
              <v-col cols="12" lg="4" md="6" sm="6">
                <div class="subtitle">Expired Type</div>
                <v-select
                  :rules="[rules.required]"
                  class="select"
                  transition="slide-y-transition"
                  :items="exp_type"
                  v-model="selected_exp_type"
                  variant="outlined"
                  density="compact"
                  placeholder="Select Type"
                  item-color="#D9633C"
                >
                </v-select>
              </v-col>
              <v-col cols="12" lg="4" md="6" sm="6">
                <div v-if="selected_exp_type === 'Specific Date'">
                  <div class="subtitle">Expired Date</div>
                  <v-menu
                    v-model="close"
                    :close-on-content-click="false"
                    transition="scale-transition"
                  >
                    <template v-slot:activator="{ props }">
                      <v-text-field
                        :rules="[rules.required]"
                        placeholder="Select Date"
                        v-model="format"
                        v-bind="props"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi-calendar"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date"></v-date-picker>
                  </v-menu>
                </div>
                <div v-if="selected_exp_type === 'Countdown'">
                  <div class="subtitle">Expired In</div>
                  <v-text-field
                    type="number"
                    class="hide-arrow"
                    :rules="[rules.required_number]"
                    v-model="date_amount"
                    hide-spin-buttons
                    variant="outlined"
                    density="compact"
                    suffix="Days"
                  >
                  </v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider class="mx-5"></v-divider>
          <!-- Price -->
          <v-card-title class="pb-4" style="min-height: 600px">
            <div class="py-4">
              <span class="label">Price</span><span class="star">*</span>
            </div>
            <v-row>
              <v-col lg="4">
                <div class="subtitle" style="padding-bottom: 0%">
                  Seperate Adult / Child Price
                </div>
                <v-switch
                  v-model="open_switch"
                  :hide-details="true"
                  color="primary"
                  :value="1"
                ></v-switch>
              </v-col>
              <v-col lg="4">
                <div class="subtitle" style="padding-bottom: 0%">
                  Have Sale Price
                </div>
                <v-switch
                  v-model="open_switch"
                  :hide-details="true"
                  color="primary"
                  :value="2"
                ></v-switch>
              </v-col>
            </v-row>

            <v-row v-if="open_switch.includes(1)">
              <v-col lg="4" sm="6">
                <div class="subtitle" style="padding-bottom: 0%">
                  Standard Adult Price THB
                </div>
                <v-text-field
                  type="number"
                  class="hide-arrow"
                  :rules="[rules.required_number]"
                  v-model="std_adult_price_thb"
                  variant="outlined"
                  density="compact"
                  suffix="THB"
                ></v-text-field>
                <div class="subtitle" style="padding-bottom: 0%">
                  Standard Child Price THB
                </div>
                <v-text-field
                  type="number"
                  class="hide-arrow"
                  :rules="[rules.required_number]"
                  v-model="std_child_price_thb"
                  :hide-details="false"
                  variant="outlined"
                  density="compact"
                  suffix="THB"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="!open_switch.includes(1)">
              <v-col lg="4" md="6" sm="6">
                <div class="subtitle" style="padding-bottom: 0%">
                  Standard Price THB
                </div>
                <v-text-field
                  type="number"
                  class="hide-arrow"
                  :rules="[rules.required_number]"
                  v-model="std_price_thb"
                  :hide-details="false"
                  variant="outlined"
                  density="compact"
                  suffix="THB"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="open_switch.includes(2) && !open_switch.includes(1)">
              <v-col cols="12" lg="4" md="6" sm="6">
                <div class="subtitle" style="padding-bottom: 0%">
                  Sale Price THB
                </div>
                <v-text-field
                  type="number"
                  class="hide-arrow"
                  :rules="[rules.required_number]"
                  v-model="sale_price_thb"
                  variant="outlined"
                  density="compact"
                  suffix="THB"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row v-if="open_switch.length == 2">
              <v-col cols="12" lg="4" md="6" sm="6">
                <div class="subtitle" style="padding-bottom: 0%">
                  Adult Sale Price THB
                </div>
                <v-text-field
                  type="number"
                  class="hide-arrow"
                  :rules="[rules.required_number]"
                  v-model="sale_adult_price_thb"
                  variant="outlined"
                  density="compact"
                  suffix="THB"
                ></v-text-field>
                <div class="subtitle" style="padding-bottom: 0%">
                  Child Sale Price THB
                </div>
                <v-text-field
                  type="number"
                  class="hide-arrow"
                  :rules="[rules.required_number]"
                  v-model="sale_child_price_thb"
                  variant="outlined"
                  density="compact"
                  suffix="THB"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider class="mx-5"></v-divider>
          <!-- Description -->
          <v-card-title>
            <div class="py-4">
              <span class="label">Description</span><span class="star">*</span>
            </div>
            <v-row>
              <v-col cols="12" lg="5" md="6">
                <div class="subtitle">Description TH</div>
                <v-textarea
                  :rules="[rules.required]"
                  v-model="description_th"
                  :hide-details="false"
                  placeholder="Description TH"
                  variant="outlined"
                  density="compact"
                  rows="5"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" lg="5" md="6">
                <div class="subtitle">Description ENG</div>
                <v-textarea
                  :rules="[rules.required]"
                  v-model="description_eng"
                  placeholder="Description ENG"
                  variant="outlined"
                  density="compact"
                  rows="5"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider class="mx-5"></v-divider>
          <!-- Categories -->
          <v-card-title>
            <div class="py-4">
              <span class="label">Categories</span><span class="star">*</span>
            </div>
            <v-row justify="space-between" class="px-3 py-5">
              <div class="subtitle">Category</div>
              <v-btn @click="open_dialog" class="catBtn" flat
                >Select Category</v-btn
              >
            </v-row>
            <v-divider></v-divider>
            <!-- select category dialog -->
            <v-dialog v-model="selectCategory" max-width="600">
              <v-card rounded="xl">
                <v-col>
                  <v-card-title style="font-size: 18px; font-weight: 600">
                    Select Category
                  </v-card-title>
                  <v-card-item>
                    <v-text-field
                      v-model="search"
                      class="dialog-search"
                      height="40"
                      variant="outlined"
                      placeholder="Search Category"
                      prepend-inner-icon="mdi-magnify"
                      rounded="lg"
                      :hide-details="true"
                    >
                    </v-text-field>
                  </v-card-item>
                  <v-row class="pl-3" v-if="filteredItems.length > 0">
                    <v-col cols="6">
                      <v-checkbox
                        style="font-weight: 600; opacity: 1"
                        :hide-details="true"
                        color="#d9633c"
                        label="Select All"
                        v-model="allSelected"
                        @click="selectAll"
                      >
                      </v-checkbox>
                    </v-col>
                    <v-col cols="6" class="mt-4">
                      <div style="font-weight: 600">Category</div>
                    </v-col>
                  </v-row>
                  <v-divider
                    class="pb-2"
                    v-if="filteredItems.length > 0"
                  ></v-divider>
                  <div class="checkbox-container">
                    <v-row
                      v-for="(item, index) in filteredItems"
                      :key="index"
                      class="pl-3"
                    >
                      <v-col cols="6">
                        <v-checkbox
                          color="#d9633c"
                          :value="item"
                          v-model="temp_checkedItems"
                          @click="select"
                          :hide-details="true"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="6" class="mt-4">
                        {{ item.name }}
                      </v-col>
                      <v-divider></v-divider>
                    </v-row>

                    <div class="text-center" v-if="filteredItems.length === 0">
                      No categories found.
                    </div>
                  </div>
                  <v-card-title>
                    <v-card-actions>
                      <v-row justify="space-between">
                        <v-btn
                          style="
                            font-size: 15px;
                            font-weight: 600;
                            color: #f23232;
                          "
                          @click="selectCategory = false"
                        >
                          Close
                        </v-btn>
                        <v-btn class="createBtn" @click="confirmCat"
                          >Select Category</v-btn
                        >
                      </v-row>
                    </v-card-actions>
                  </v-card-title>
                </v-col>
              </v-card>
            </v-dialog>
            <div style="min-height: 100px">
              <v-row class="py-5" v-if="checkedItems.length != 0">
                <v-chip
                  v-for="item in checkedItems"
                  :key="item.name"
                  class="ma-2"
                  color="primary"
                  variant="outlined"
                  closable
                  @click:close="closeChip(item.name)"
                >
                  {{ item.name }}
                </v-chip>
              </v-row>
              <div
                :class="[err_category ? 'text-red' : '']"
                v-if="checkedItems.length == 0"
                class="py-5 text-center"
                style="font-size: 16px; font-weight: 500; color: #acacac"
              >
                No Category Selected
              </div>
            </div>
          </v-card-title>
          <v-divider class="mx-5"></v-divider>
          <!-- Add-on -->
          <v-card-title>
            <div class="py-4">
              <span class="label">Add-on</span><span class="star">*</span>
            </div>
            <v-row justify="space-between" class="px-3 py-5">
              <div class="subtitle">Add-on</div>
              <v-btn @click="open_dialog_addon" width="160" class="catBtn" flat
                >Select Add-on</v-btn
              >
            </v-row>
            <v-divider></v-divider>
            <!-- Add-on dialog -->
            <v-dialog v-model="selectAddOn" max-width="600">
              <v-card rounded="xl">
                <v-col>
                  <v-card-title style="font-size: 18px; font-weight: 600">
                    Select Add-on
                  </v-card-title>
                  <v-card-item>
                    <v-text-field
                      v-model="search_addon"
                      class="dialog-search"
                      height="40"
                      variant="outlined"
                      placeholder="Search Add-on"
                      prepend-inner-icon="mdi-magnify"
                      rounded="lg"
                      :hide-details="true"
                    >
                    </v-text-field>
                  </v-card-item>
                  <v-row class="pl-3" v-if="filteredAddOn.length > 0">
                    <v-col cols="6">
                      <v-checkbox
                        style="font-weight: 600; opacity: 1"
                        :hide-details="true"
                        color="#d9633c"
                        label="Select All"
                        v-model="allSelected_addon"
                        @click="selectAll_addon"
                      >
                      </v-checkbox>
                    </v-col>
                    <v-col cols="6" class="mt-4">
                      <div style="font-weight: 600">Add-on</div>
                    </v-col>
                  </v-row>
                  <v-divider
                    class="pb-2"
                    v-if="filteredAddOn.length > 0"
                  ></v-divider>
                  <div class="checkbox-container">
                    <v-row
                      v-for="(item, index) in filteredAddOn"
                      :key="index"
                      class="pl-3"
                    >
                      <v-col cols="6">
                        <v-checkbox
                          color="#d9633c"
                          :value="item"
                          v-model="temp_selectedItems"
                          @click="select_addon"
                          :hide-details="true"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="6" class="mt-4">
                        {{ item.name }}
                      </v-col>
                      <v-divider></v-divider>
                    </v-row>

                    <div class="text-center" v-if="filteredAddOn.length === 0">
                      No add-on found.
                    </div>
                  </div>
                  <v-card-title>
                    <v-card-actions>
                      <v-row justify="space-between">
                        <v-btn
                          style="
                            font-size: 15px;
                            font-weight: 600;
                            color: #f23232;
                          "
                          @click="selectAddOn = false"
                        >
                          Close
                        </v-btn>
                        <v-btn class="createBtn" @click="confirmAdd"
                          >Select Add-on</v-btn
                        >
                      </v-row>
                    </v-card-actions>
                  </v-card-title>
                </v-col>
              </v-card>
            </v-dialog>
            <div style="min-height: 100px">
              <v-row class="py-5" v-if="selectedItems.length != 0">
                <v-chip
                  v-for="item in selectedItems"
                  :key="item.name"
                  class="ma-2"
                  color="primary"
                  variant="outlined"
                  closable
                  @click:close="closeAddChip(item.name)"
                >
                  {{ item.name }}
                </v-chip>
              </v-row>
              <div
                v-if="selectedItems.length == 0"
                :class="[
                  err_addon ? 'py-5 text-center text-red' : 'py-5 text-center',
                ]"
                style="font-size: 16px; font-weight: 500; color: #acacac"
              >
                No Add-on Selected
              </div>
            </div>
          </v-card-title>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import createIcon from "../../assets/icon/create.svg";
import { ref, watch, computed, onMounted } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const form = ref(false);
const route = useRouter();
const loading_btn = ref<boolean>(false);

// image upload
const ProfileInput = ref<HTMLInputElement | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const imageSrc = ref<string>("");
const selectedFile = ref<File | null>(null);
const imagePreviews = ref<{ src: string; name: string }[]>([]);
// image zoom dialog
const dialog = ref(false);

// name
const name_th = ref<string>("");
const name_eng = ref<string>("");

//channel
const selected = ref<string[]>([]);
const product_channel = ref<unknown[]>([]);

const exp_type = ["Specific Date", "Countdown"];
const selected_exp_type = ref<string | null>(null);

// expire date picker
const date = ref<string>("");
const close = ref(false);
const format = ref<string | null>(null);

// expire countdown
const date_amount = ref<number | null>(0);

// price
const open_switch = ref<Number[]>([]);
const std_price_thb = ref<Number>(0);
const std_adult_price_thb = ref<Number>(0);
const std_child_price_thb = ref<Number>(0);
const sale_price_thb = ref<Number>(0);
const sale_adult_price_thb = ref<Number>(0);
const sale_child_price_thb = ref<Number>(0);
// description
const description_th = ref<string>("");
const description_eng = ref<string>("");

//validation
const err_msg_checkbox = ref<string>("");
const err_category = ref<boolean>(false);
const err_addon = ref<boolean>(false);
const single_img_valid = ref(false);
const product_img_valid = ref(false);
const rules = {
  required: (value: string) => !!value || "Field is required",
  required_number: (value: number) => (value > 0 ? true : "Field is required"),
};
watch(selected, (value) => {
  if (value.length > 0) {
    err_msg_checkbox.value = "";
  } else err_msg_checkbox.value = "Please select channel";
});

// triggers the click event on the hidden file input
const openProfilePicker = () => {
  if (imageSrc.value) return;
  ProfileInput.value?.click();
};
const editProfilePicker = () => {
  ProfileInput.value?.click();
};

// triggers the click event on the hidden file input
const openImagePicker = () => {
  fileInput.value?.click();
};

// const handleFileUpload = (event: Event) => {
//   const input = event.target as HTMLInputElement;
//   const file = input.files?.[0];
//   if (file) {
//     selectedFile.value = file; // Store the File object
//     console.log("Got a file through file picker.", file); // Log the file
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       imageSrc.value = reader.result as string;
//       single_img_valid.value = false;
//     };
//   }
// };

const handleFileUpload = (event: Event) => {
  let file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      imageSrc.value = reader.result as string;
      console.log(imageSrc.value);
      single_img_valid.value = false;
    };
  }
  // let file =
  //   (event.target as HTMLInputElement).files || event.dataTransfer.files;
  // let img = file[0];
  // const reader = new FileReader();
  // reader.readAsDataURL(img);
  // reader.onload = () => {
  //   const base64EncodedImage = reader.result;
  //   console.log(base64EncodedImage);
  // };
};

// let files = event.target.files || event.dataTransfer.files;
//         name_type.value.push(files[0].type.substr(-3));
//         store.commit("dashboard/pushIndex", files);
//         let img = files[0];
//         const reader = new FileReader();
//         reader.readAsDataURL(img);
//         reader.onload = () => {
//           const base64EncodedImage = reader.result;
//           let body = {
//             pdf_name: "bookbank",
//             pdf_file: base64EncodedImage,
//           };
//           imagesName.value.push(files[0].name);
//           let res = store.dispatch("dashboard/upload_singlefile", body);
//           if (res == false) {
//             alert("Can't upload files");
//           }
//         };

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) {
    selectedFile.value = file; // Store the File object
    console.log("Got a file through drag-and-drop.", file); // Log the file
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      imageSrc.value = reader.result as string;
      single_img_valid.value = false;
    };
  }
};

const handleFileSelection = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const selectedFiles = inputElement.files;
  console.log(selectedFiles);
  if (selectedFiles) {
    for (let i = 0; i < selectedFiles.length; i++) {
      const reader = new FileReader();
      const fileName = selectedFiles[i].name;
      reader.readAsDataURL(selectedFiles[i]);
      reader.onload = () => {
        if (reader.result) {
          imagePreviews.value.push({
            src: reader.result as string,
            name: fileName,
          });
          console.log(imagePreviews.value);
          product_img_valid.value = false;
        }
      };
    }
  }
};

const removeImage = (index: number) => {
  imagePreviews.value.splice(index, 1);
};

// expire date picker
const formattedDate = (value: string) => {
  format.value = moment(value).format("DD-MM-YYYY");
};

watch(date, (value) => {
  if (value) {
    close.value = false;
    formattedDate(date.value);
  }
});

// categories
const selectCategory = ref(false);

const open_dialog = () => {
  search.value = "";
  temp_checkedItems.value = [...checkedItems.value];
  selectCategory.value = true;

  // Check if all categories are selected
  const allCategoriesSelected = filteredItems.value.every((item) =>
    temp_checkedItems.value.includes(item)
  );

  allSelected.value = allCategoriesSelected;
};

const search = ref("");

const category = ref<Array<{ name: string; value: Number }>>([]);

const checkedItems = ref<Array<{ name: string; value: Number }>>([]);
const temp_checkedItems = ref<Array<{ name: string; value: Number }>>([]); //store the checked items before confirm

const filteredItems = computed(() => {
  return category.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const allSelected = ref(false); //state of the select all checkbox

const selectAll = () => {
  temp_checkedItems.value = [];

  if (allSelected.value) {
    temp_checkedItems.value = [];
    allSelected.value = false;
  } else {
    temp_checkedItems.value = filteredItems.value.map((item) => item);
    allSelected.value = true;
  }
};

//when a single checkbox is clicked reset the select all state
const select = () => {
  allSelected.value = false;
};

const confirmCat = () => {
  checkedItems.value = [...temp_checkedItems.value];
  selectCategory.value = false;
};

const closeChip = (item: string) => {
  checkedItems.value = checkedItems.value.filter((i) => i.name !== item);
};

// add-on
const selectAddOn = ref(false);
const search_addon = ref("");
const selectedItems = ref<Array<{ name: string; value: Number }>>([]);
const temp_selectedItems = ref<Array<{ name: string; value: Number }>>([]); //store the checked items before confirm
const allSelected_addon = ref(false); //state of the select all checkbox

const addOn = ref<Array<{ name: string; value: Number }>>([]);
const addon = computed(() => store.getters["product/getAddonList"].data);

onMounted(async () => {
  await store.dispatch("product/fetchAddon");
  const Category = await store.dispatch("product/fetchCategory");

  addon.value.forEach((item: { addon_id: number; addon_name_en: string }) => {
    addOn.value.push({ name: item.addon_name_en, value: item.addon_id });
  });

  Category.forEach(
    (item: { category_id: number; category_name_en: string }) => {
      category.value.push({
        name: item.category_name_en,
        value: item.category_id,
      });
    }
  );
  console.log("Addon", addOn.value);
  console.log("Category", category.value);
});

const open_dialog_addon = () => {
  selectAddOn.value = true;
  search_addon.value = "";
  temp_selectedItems.value = [...selectedItems.value];

  // Check if all add-on are selected
  const allAddonSelected = filteredAddOn.value.every((item) =>
    temp_selectedItems.value.includes(item)
  );

  allSelected_addon.value = allAddonSelected;
};

const selectAll_addon = () => {
  temp_selectedItems.value = [];

  if (allSelected_addon.value) {
    temp_selectedItems.value = [];
    allSelected_addon.value = false;
  } else {
    temp_selectedItems.value = filteredAddOn.value.map((item) => item);
    allSelected_addon.value = true;
  }
};

const filteredAddOn = computed(() => {
  return addOn.value.filter((item) =>
    item.name.toLowerCase().includes(search_addon.value.toLowerCase())
  );
});

const select_addon = () => {
  allSelected_addon.value = false;
};

const confirmAdd = () => {
  selectedItems.value = [...temp_selectedItems.value];
  selectAddOn.value = false;
};

const closeAddChip = (item: string) => {
  selectedItems.value = selectedItems.value.filter((i) => i.name !== item);
};

const create_product = async () => {
  //reset validation
  single_img_valid.value = false;
  product_img_valid.value = false;
  err_category.value = false;
  err_addon.value = false;

  let { valid } = await form.value.validate();

  if (imageSrc.value == "") {
    single_img_valid.value = true;
  }
  if (imagePreviews.value.length == 0) {
    product_img_valid.value = true;
  }
  if (selected.value.length == 0) {
    err_msg_checkbox.value = "Please select channel";
  }
  if (checkedItems.value.length == 0) {
    err_category.value = true;
  }
  if (selectedItems.value.length == 0) {
    err_addon.value = true;
  }
  console.log("create product enter");

  //pass validation
  if (
    valid == true &&
    single_img_valid.value == false &&
    product_img_valid.value == false &&
    selected.value.length != 0 &&
    err_category.value == false &&
    err_addon.value == false
  ) {
    // alert("ผ่าน");
    console.log("pass");

    const exp_type = ref(0);
    if (selected_exp_type.value == "Specific Date") {
      exp_type.value = 1;
      format.value = moment(date.value).format("YYYY-MM-DD");
    } else {
      exp_type.value = 2;
      format.value = null;
    }

    const adult_child = ref(0);
    const sale_price = ref(0);
    if (open_switch.value.includes(1)) {
      adult_child.value = 1;
    }
    if (open_switch.value.includes(2)) {
      sale_price.value = 1;
    }

    const product_image = ref<unknown[]>([]);
    imagePreviews.value.forEach((item, index) => {
      let data = {
        product_image_id: index + 1,
        product_image_image: item.src,
      };
      product_image.value.push(data);
    });

    product_channel.value = [];

    selected.value.forEach((item) => {
      if (item == "Booking") {
        let data = {
          channel_id: 1,
          channel_name_en: item,
        };
        product_channel.value.push(data);
      } else if (item == "Package") {
        let data = {
          channel_id: 2,
          channel_name_en: item,
        };
        product_channel.value.push(data);
      } else if (item == "Member") {
        let data = {
          channel_id: 3,
          channel_name_en: item,
        };
        product_channel.value.push(data);
      } else if (item == "Create Order") {
        let data = {
          channel_id: 4,
          channel_name_en: item,
        };
        product_channel.value.push(data);
      }
    });
    console.log("Channel : ", product_channel.value);

    const product_category = ref<unknown[]>([]);
    checkedItems.value.forEach((item) => {
      let data = {
        category_id: item.value,
        category_name_en: item.name,
      };
      product_category.value.push(data);
    });

    const product_addon = ref<unknown[]>([]);
    selectedItems.value.forEach((item) => {
      let data = {
        addon_id: item.value,
        addon_name_en: item.name,
      };
      product_addon.value.push(data);
    });

    console.log("Category : ", product_category.value);

    let data = {
      product: {
        product_name_th: name_th.value,
        product_name_en: name_eng.value,
        product_description_th: description_th.value,
        product_description_en: description_eng.value,
        product_expired_type: exp_type.value,
        product_expired_date: format.value,
        product_expried_in:
          date_amount.value == 0 ? null : Number(date_amount.value),
        product_alotment: 1,
        product_seperate_adult_child: adult_child.value,
        product_have_sale_price: sale_price.value,
        product_standard_price_thb:
          std_price_thb.value == 0 ? null : Number(std_price_thb.value),
        product_standard_price_usd: null,
        product_standard_adult_price_thb:
          std_adult_price_thb.value == 0
            ? null
            : Number(std_adult_price_thb.value),
        product_standard_adult_price_usd: null,
        product_standard_child_price_thb:
          std_child_price_thb.value == 0
            ? null
            : Number(std_child_price_thb.value),
        product_standard_child_price_usd: null,
        product_sale_price_thb:
          sale_price_thb.value == 0 ? null : Number(sale_price_thb.value),
        product_sale_price_usd: null,
        product_adult_sale_price_thb:
          sale_adult_price_thb.value == 0
            ? null
            : Number(sale_adult_price_thb.value),
        product_adult_sale_price_usd: null,
        product_child_sale_price_thb:
          sale_child_price_thb.value == 0
            ? null
            : Number(sale_child_price_thb.value),
        product_child_sale_price_usd: null,
        product_profile_image: imageSrc.value,
      },
      product_image: product_image.value,
      product_channel: product_channel.value,
      product_category: product_category.value,
      product_addon: product_addon.value,
    };
    loading_btn.value = true;
    let response = await store.dispatch("product/createProducts", data);
    if (response == false) {
      alert("cannot create product");
      loading_btn.value = false;
      return;
    }
    loading_btn.value = false;
    route.push({ path: "/dashboard/product/list" });
    console.log(data);
  }
};
</script>

<style scoped>
.error {
  font-size: 12px;
  color: #b00020;
}

.label {
  font-size: 20px;
  font-weight: 700;
  color: #000000;
}

.star {
  color: red;
  font-weight: 700;
}

.subtitle {
  font-size: 17px;
  font-weight: 600;
  color: #464646;
  padding-bottom: 10px;
}

.image-upload-box {
  position: relative;
  min-height: 300px;
  border: 2px solid #e3e3e3;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}
.image-upload-box_error {
  position: relative;
  min-height: 300px;
  border: 2px solid #b00020;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}
.image-upload-box_2 {
  position: relative;
  min-height: 300px;
  border: 2px solid #e3e3e3;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
}

.image-upload-box_2_error {
  position: relative;
  min-height: 300px;
  border: 2px solid #b00020;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
}

.image-icon-text {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.uploaded-image {
  max-height: 300px;
  width: 100%;
  object-fit: contain;
}

.editpf-btn {
  color: white;
}

.editpf-btn:hover {
  color: #d9633c;
}

.v-text-field ::placeholder {
  color: #9f9f9f;
  font-size: 14px;
  font-weight: 500;
  opacity: 1;
}

.v-checkbox {
  font-weight: 500;
}

.checkbox-label {
  color: #d9633c;
  font-weight: bold;
}

:deep(.v-switch__track) {
  height: 20px;
  opacity: 0.8;
}

.catBtn {
  background-color: #ffefeb;
  color: #d9633c;
  font-size: 13px;
  font-weight: 600;
  border-radius: 5px;
  border: 2px solid #d9633c;
}

.dialog-search ::placeholder {
  font-size: medium;
  color: #c8c8c8;
}

.checkbox-container {
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-right: -50px;
  padding-right: 50px;
}

.v-chip.v-chip--density-default {
  background-color: #ffefeb;
}

.v-chip.v-chip--size-default {
  font-size: 14px;
  font-weight: 600;
  font-family: "Sarabun", sans-serif;
  --v-chip-height: 35px;
}

.v-chip--variant-outlined {
  border: 2px solid;
}

.hide-arrow :deep(input[type="number"]) {
  appearance: textfield;
}

.hide-arrow :deep(input[type="number"]::-webkit-inner-spin-button),
.hide-arrow :deep(input[type="number"]::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

.hide-arrow :deep(input[type="number"]::-webkit-inner-spin-button),
.hide-arrow :deep(input[type="number"]::-webkit-outer-spin-button),
.hide-arrow :deep(input[type="number"]::-ms-clear) {
  display: none;
}
</style>
