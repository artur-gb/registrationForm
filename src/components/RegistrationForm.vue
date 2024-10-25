<template>
  <div class="flex flex-col items-center justify-center pb-[30px] h-[191px]">
    <div class="flex items-center justify-center grow">
      <div class="h-[40px] max-w-[300px] bg-[#F8F8F8] rounded-lg">logo</div>
    </div>
    <div class="flex flex-col items-center justify-center max-h-[71px]">
      <span class="text-[32px] font-medium">{{ t("enterPhone") }}</span>
      <span class="text-[#666666]">{{ t("toSignIn") }}</span>
    </div>
  </div>
  <search-select
    class="pb-[24px] mt-0"
    @change-country="(val) => (selectedCountry = val)"
  />
  <input-number
    :selected-country="selectedCountry"
    :error-number="errorNumber"
    class="pb-[28px]"
    @number-enter="(val) => (phone = val)"
  />
  <v-btn class="w-full" height="55px" color="#007AFF" @click="sendData">
    {{ t("next") }}
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Country } from "../entities/Country";
import SearchSelect from "./SearchSelect.vue";
import InputNumber from "./InputNumber.vue";
import { useRegistrationService } from "../service/useRegistrationService";
import { ConfirmationType } from "../entities/ConfirmationType";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emits = defineEmits<{
  (e: "sessionIdFetch", value: { sessionId: string; phone: string }): void;
}>();

const selectedCountry = ref<Country>();

const isDataSending = ref(false);

const registrationService = useRegistrationService();

const phone = ref("");
const errorNumber = ref(false);

const sendData = async () => {
  isDataSending.value = true;
  try {
    const result = await registrationService.create({
      phone: phone.value,
      confirmType: ConfirmationType.WHATSAPP,
    });
    if (result.success) {
      emits("sessionIdFetch", {
        sessionId: result.data.session_id,
        phone: phone.value,
      });
      errorNumber.value = false;
    } else errorNumber.value = true;
  } catch (error) {
    console.error(error);
  }
  isDataSending.value = false;
};
</script>

<style scoped></style>
