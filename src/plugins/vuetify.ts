// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { VDataTable } from "vuetify/labs/VDataTable";
import { VDatePicker } from "vuetify/labs/VDatePicker";

// Vuetify
import { createVuetify, ThemeDefinition } from "vuetify";

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#D9633C",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#B00020",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    orange: "#D9633C",
    black: "#000000",
    "title-text": "#6A6A6A",
  },
};

export default createVuetify({
  defaults: {
    icons: {
      iconfont: "mdi",
    },
    VBtn: {
      style: "text-transform: none;",
    },
  },
  components: {
    VDataTable,
    VDatePicker,
  },
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
    },
  },
  display: {
    mobileBreakpoint: "sm",
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  },
});
