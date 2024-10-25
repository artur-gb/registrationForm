<template>
  <v-text-field
    v-model="phoneNumber"
    :label="t('phoneNumber')"
    :rules="[validatePhoneNumber]"
    :placeholder="placeholder"
    :error-messages="props.errorNumber ? t('errorNumber') : ''"
    variant="outlined"
    @input="formatPhoneNumber"
    @update:model-value="(val) => emitPhoneNumber(val)"
  />
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { Country } from "../entities/Country";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  selectedCountry: Country | undefined;
  errorNumber: boolean;
}>();

const emits = defineEmits<{
  (e: "numberEnter", value: string): void;
}>();

const { t } = useI18n();

const phoneNumber = ref("");

const placeholder = computed(() => {
  return props.selectedCountry ? `${props.selectedCountry.dial_code} ` : "";
});

const formatPhoneNumber = () => {
  if (!props.selectedCountry) return;

  const code = props.selectedCountry.dial_code;

  if (phoneNumber.value.startsWith(code)) {
    phoneNumber.value = phoneNumber.value.replace(code, "").trim();
  }

  phoneNumber.value = `${code} ${phoneNumber.value}`;
};

const validatePhoneNumber = (value: string) => {
  if (
    props.selectedCountry &&
    value.length < props.selectedCountry?.dial_code.length
  )
    return "Введите корректный номер телефона";
  else return true;
};

watch(
  () => props.selectedCountry,
  () => {
    phoneNumber.value = props.selectedCountry
      ? `${props.selectedCountry.dial_code} `
      : "";
  }
);

const emitPhoneNumber = (val: string) => {
  const formattedNumber = val.replace(/[+\s]/g, "");
  emits("numberEnter", formattedNumber);
};
</script>
