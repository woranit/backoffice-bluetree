<template>
  <v-col lg="4">
    <div class="subtitle">Expired Date</div>
    <!-- <v-text-field
      variant="outlined"
      density="compact"
      v-model="formattedDate"
      @click="toggleDatePicker"
      append-inner-icon="mdi-calendar"
      readonly
    ></v-text-field> -->

    <!-- <v-menu
      v-model="showDatePicker"
      :close-on-content-click="true"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ props }">
        <v-text-field
          v-bind="props"
          variant="outlined"
          density="compact"
          v-model="formattedDate"
          @click="toggleDatePicker"
          append-inner-icon="mdi-calendar"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        @input="updateFormattedDate"
      ></v-date-picker>
    </v-menu> -->

    <v-menu
      v-model="close"
      :close-on-content-click="false"
      transition="scale-transition"
    >
      <template v-slot:activator="{ props }">
        <!-- <v-btn color="primary" v-bind="props"> Scale Transition </v-btn> -->
        <v-text-field
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
    <!-- {{ date }} -->
    <!-- <v-date-picker v-model="date"></v-date-picker> -->
  </v-col>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import moment from "moment";
const date = ref<string>("");
const close = ref(false);
const format = ref<string>("");
// const showDatePicker = ref(false);
// const formattedDate = ref<string | null>(null);

// const toggleDatePicker = () => {
//   showDatePicker.value = !showDatePicker.value;
// };

// const updateFormattedDate = () => {
//   if (date.value.length > 0) {
//     formattedDate.value = date.value[0];
//   }
//   showDatePicker.value = false;
// };
const formattedDate = (value: string) => {
  format.value = moment(value).format("DD-MM-YYYY");
};
watch(date, (value) => {
  if (value) {
    close.value = false;
    formattedDate(date.value);
  }
});
</script>
