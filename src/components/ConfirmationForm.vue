<template>
  <div class="flex flex-col items-center justify-center pb-[30px] h-[191px]">
    <div class="flex items-center justify-center grow">
      <div class="h-[40px] max-w-[300px] bg-[#F8F8F8] rounded-lg">logo</div>
    </div>
    <div class="flex flex-col items-center justify-center max-h-[71px]">
      <span class="text-[32px] font-medium">{{ t("enterCode") }}</span>
      <span class="text-[#666666]"
        >{{ t("codeWasSended") }} +{{ props.phone }}</span
      >
    </div>
  </div>

  <v-select
    class="pb-[24px] mt-0"
    v-model="selectedReceiveType"
    :label="t('confirmationType')"
    item-title="label"
    :items="receiveTypes"
    return-object
    variant="outlined"
  >
    <template v-slot:item="{ props, item }">
      <div
        v-bind="props"
        class="d-flex align-center p-4 max-h-[48px] cursor-pointer"
      >
        <v-icon :icon="item.raw.icon" />
        <span class="ml-2">{{ item.raw.label }}</span>
      </div>
    </template>
  </v-select>
  <send-code-input
    class="pb-[28px]"
    @code-enter="(val) => (code = val)"
    @send-new-code="sendNewCode"
  />
  <div class="flex w-full gap-[10px]">
    <v-btn
      variant="text"
      class="grow"
      height="55px"
      color="#007AFF"
      prepend-icon="mdi-arrow-left"
      @click="() => emits('back')"
    >
      {{ t("back") }}
    </v-btn>
    <v-btn height="55px" class="grow" color="#007AFF" @click="checkCode">
      {{ t("continue") }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ConfirmationType } from "../entities/ConfirmationType";
import { useRegistrationService } from "../service/useRegistrationService";
import SendCodeInput from "./SendCodeInput.vue";
import { ref } from "vue";

const props = defineProps<{
  sessionId: string;
  phone: string;
}>();

const emits = defineEmits<{
  (e: "back"): void;
}>();

const { t } = useI18n();

const sessionId = ref(props.sessionId);

type receiveType = {
  name: string;
  icon: string;
  label: string;
};

const selectedReceiveType = ref<receiveType>({
  name: ConfirmationType.WHATSAPP,
  icon: "mdi-whatsapp",
  label: "WhatsApp",
});

const receiveTypes: receiveType[] = [
  {
    name: ConfirmationType.WHATSAPP,
    icon: "mdi-whatsapp",
    label: "WhatsApp",
  },
  {
    name: ConfirmationType.TELEGRAM,
    icon: "mdi-send-variant",
    label: "Telegram",
  },
  {
    name: ConfirmationType.SMS,
    icon: "mdi-message-processing",
    label: "SMS",
  },
];

const isCodeChecking = ref(false);

const registrationService = useRegistrationService();

const code = ref("");

const checkCode = async () => {
  isCodeChecking.value = true;
  try {
    const result = await registrationService.check({
      session_id: sessionId.value,
      code: code.value,
    });
    if (result.success) console.log(result.data.verify_token);
  } catch (error) {
    console.error(error);
  }
  isCodeChecking.value = false;
};

const isNewCodeFetching = ref(false);

const sendNewCode = async () => {
  isNewCodeFetching.value = true;
  try {
    const result = await registrationService.send({
      session_id: sessionId.value,
      confirmType: selectedReceiveType.value?.name as ConfirmationType,
    });
    if (result.success) sessionId.value = result.data.session_id;
  } catch (error) {
    console.error(error);
  }
  isNewCodeFetching.value = false;
};
</script>

<style scoped></style>
