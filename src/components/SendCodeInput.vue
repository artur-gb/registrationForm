<template>
  <v-text-field
    v-model="code"
    variant="outlined"
    :label="t('enterCode')"
    append-outer
    @update:model-value="(val) => emitCode(val)"
  >
    <template v-slot:append-inner>
      <v-btn
        :disabled="isButtonDisabled"
        @click.prevent.stop="sendNewCode"
        variant="text"
        color="#007AFF"
      >
        {{
          isButtonDisabled
            ? `00:${timer.toString().padStart(2, "0")}`
            : t("send")
        }}
      </v-btn>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const emits = defineEmits<{
  (e: "sendNewCode"): void;
  (e: "codeEnter", value: string): void;
}>();

const { t } = useI18n();

const code = ref("");
const timer = ref(10);
const isButtonDisabled = ref(false);
// let countdown: any = null;

const disableButton = () => {
  isButtonDisabled.value = true;
  timer.value = 10;

  const countdown = setInterval(() => {
    timer.value -= 1;
    if (timer.value === 0) {
      clearInterval(countdown);
      isButtonDisabled.value = false;
    }
  }, 1000);
};

const sendNewCode = () => {
  emits("sendNewCode");
  disableButton();
};
onMounted(disableButton);

const emitCode = (val: string) => {
  emits("codeEnter", val);
};
</script>
