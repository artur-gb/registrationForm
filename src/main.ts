import { createApp } from "vue";
import "./tailwind.css";
import "./style.css";
import "@mdi/font/css/materialdesignicons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import { createI18n } from "vue-i18n";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { messages } from "./i18n/strings";

import { IRegistrationServiceKey } from "./service/IRegistrationService";
import { ApiRegistrationService } from "./service/ApiRegistrationService";

import App from "./App.vue";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

const i18n = createI18n({
  locale: navigator.language,
  fallbackLocale: "en",
  globalInjection: true,
  legacy: false,
  messages,
});

app.use(vuetify);
app.use(i18n);
app.provide(IRegistrationServiceKey, new ApiRegistrationService());
app.mount("#app");
