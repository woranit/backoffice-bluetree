<template>
  <v-row>
    <v-col class="title"> Create Additional</v-col>
    <v-btn class="cancelBtn" to="/dashboard/product/addon">
      <img class="pr-2" width="30" src="../../assets/icon/cancel.svg" />
      Cancel
    </v-btn>
    <v-btn class="createBtn" @click="createAddon" :loading="loading_btn">
      <img class="pr-2" :src="createIcon" />
      Create Add-on
    </v-btn>
  </v-row>
  <!-- form -->
  <v-row>
    <v-col>
      <v-card class="elevation-3">
        <v-form ref="form">
          <v-card-title style="font-size: 16px; font-weight: 700"
            >CREATE Additional
          </v-card-title>
          <v-divider></v-divider>
          <!-- Image -->
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
                  v-model="name_en"
                  variant="outlined"
                  density="compact"
                  placeholder="Product Name ENG"
                  class="input"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider class="mx-5"></v-divider>
          <!-- Price -->
          <v-card-title style="min-height: 450px">
            <div class="py-4">
              <span class="label">Price</span><span class="star">*</span>
            </div>
            <v-row>
              <v-col lg="4">
                <div class="subtitle" style="padding-bottom: 0%">
                  Have Sale Price
                </div>
                <v-switch
                  v-model="switch_on"
                  :hide-details="true"
                  color="primary"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="4" md="6">
                <div class="subtitle" style="padding-bottom: 0%">
                  Standard Price THB
                </div>
                <v-text-field
                  type="number"
                  class="hide-arrow"
                  :rules="[rules.required_number]"
                  v-model="std_price_thb"
                  variant="outlined"
                  density="compact"
                  suffix="THB"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col v-if="switch_on" lg="4" md="6">
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
                  v-model="description_en"
                  placeholder="Description ENG"
                  variant="outlined"
                  density="compact"
                  rows="5"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
            <v-card-actions></v-card-actions>
          </v-card-title>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import createIcon from "../../assets/icon/create.svg";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const loading_btn = ref<boolean>(false);
const form = ref(false);
const imageSrc = ref<string>("");
const ProfileInput = ref<HTMLInputElement | null>(null);
const single_img_valid = ref(false);
const dialog = ref(false);
const name_th = ref<string>("");
const name_en = ref<string>("");
const switch_on = ref(false);
const std_price_thb = ref<Number>(0);
const sale_price_thb = ref<Number>(0);
const description_th = ref<string>("");
const description_en = ref<string>("");
const store = useStore();
const route = useRouter();

const rules = {
  required: (value: string) => !!value || "Field is required",
  required_number: (value: number) => (value > 0 ? true : "Field is required"),
};

const openProfilePicker = () => {
  if (imageSrc.value) return;
  ProfileInput.value?.click();
};
const editProfilePicker = () => {
  ProfileInput.value?.click();
};

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
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const file = event.dataTransfer?.files[0];
  if (file) {
    console.log("Got a file through drag-and-drop.", file); // Log the file
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      imageSrc.value = reader.result as string;
      single_img_valid.value = false;
    };
  }
};

const createAddon = async () => {
  single_img_valid.value = false;
  let { valid } = await form.value.validate();

  if (imageSrc.value == "") {
    single_img_valid.value = true;
  }
  if (valid == true && single_img_valid.value == false) {
    console.log("pass");
    const sale_price = ref(0);
    if (switch_on.value == true) {
      sale_price.value = 1;
    }

    let data = {
      addon_name_th: name_th.value,
      addon_name_en: name_en.value,
      addon_description_th: description_th.value,
      addon_description_en: description_en.value,
      addon_profile_image: imageSrc.value,
      addon_alotment: 1,
      addon_have_sale_price: sale_price.value,
      addon_standard_price_thb:
        std_price_thb.value == 0 ? null : Number(std_price_thb.value),
      addon_standard_price_usd: null,
      addon_sale_price_thb:
        sale_price_thb.value == 0 ? null : Number(sale_price_thb.value),
      addon_sale_price_usd: null,
    };
    console.log(data);
    loading_btn.value = true;
    let response = await store.dispatch("product/createAddon", data);
    if (response == false) {
      alert("cannot create product");
      loading_btn.value = false;
      return;
    }
    loading_btn.value = false;
    route.push({ path: "/dashboard/product/addon" });
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

:deep(.v-switch__track) {
  height: 20px;
  opacity: 0.8;
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
