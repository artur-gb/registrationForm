<template>
  <div class="w-[500px] border rounded-lg p-8">
    <confirmation-form
      v-if="sessionId"
      :session-id="sessionId"
      :phone="phone"
      @back="() => (sessionId = undefined)"
    />
    <registration-form
      v-else
      @session-id-fetch="
        (val) => {
          sessionId = val.sessionId;
          phone = val.phone;
        }
      "
    />
    <div
      class="flex flex-row items-center justify-between text-[#666666] w-full pt-[70px]"
    >
      <div class="w-max">
        <v-select
          v-model="currentLanguage"
          :items="languages"
          variant="underlined"
          item-value="lang"
          item-title="label"
          @update:model-value="changeLang"
          hide-details
        ></v-select>
      </div>
      <div class="flex gap-6">
        <v-btn variant="text" disabled max-height="24px" size="x-small">{{
          t("terms")
        }}</v-btn>
        <v-btn variant="text" disabled max-height="24px" size="x-small">{{
          t("privacy")
        }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RegistrationForm from "../components/RegistrationForm.vue";
import ConfirmationForm from "../components/ConfirmationForm.vue";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const currentLanguage = ref(locale.value);

const sessionId = ref<string>();
const phone = ref<string>("");
// const isConfirmationAwaiting = ref(false);

const languages = [
  {
    lang: "ru",
    label: t("ru"),
  },
  {
    lang: "en",
    label: t("en"),
  },
];

const changeLang = (lang: string) => {
  locale.value = lang;
  currentLanguage.value = lang;
};

watch(locale, (newLocale) => {
  currentLanguage.value = newLocale;
});
</script>

<style scoped></style>
