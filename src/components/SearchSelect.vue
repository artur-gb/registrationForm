<template>
  <v-select
    v-model="selectedCountry"
    :items="filteredCountries"
    item-title="name"
    item-value="dial_code"
    :label="t('country')"
    return-object
    hide-details
    class="my-4 w-full"
    variant="outlined"
    :filter="() => true"
    @update:model-value="(val) => emits('changeCountry', val)"
  >
    <template v-slot:prepend-item>
      <v-text-field
        v-model="search"
        :placeholder="t('search')"
        clearable
        @click.stop
        solo
        flat
        class="p-4 max-h-38"
        hide-details
        prepend-inner-icon="mdi-magnify"
        rounded="8px"
      />
    </template>

    <template v-slot:item="{ props, item }">
      <div
        v-bind="props"
        class="grid grid-cols-[min-content_1fr_auto] align-center p-4 max-h-[48px] cursor-pointer"
      >
        <span>{{ item.raw.flag }}</span>
        <span class="ml-2">{{ item.raw.name }} </span>
        <span class="font-bold justify-self-end">{{ item.raw.dial_code }}</span>
      </div>
    </template>

  </v-select>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Country } from "../entities/Country";
import { countryCodes } from "../assets/countryCodes";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const emits = defineEmits<{
  (e: "changeCountry", value: Country): void;
}>();

const selectedCountry = ref<Country | undefined>(undefined);
const search = ref("");

const filteredCountries = computed(() => {
  if (!search.value) return countryCodes;
  return countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(search.value.toLowerCase()) ||
      country.dial_code.includes(search.value)
  );
});
</script>


