<template>
  <div :id="'day' + day">
    <span class="text-lg font-bold text-center block mb-4">Day {{ day }}</span>
    <div class="flex flex-col gap-4 justify-between h-full">
      <Input
        :day="day"
        :gpt="gpt"
        @update:gpt="updateField('gpt', $event)"
        :inr="inr"
        @update:inr="updateField('inr', $event)"
        :bb="bb"
        @update:bb="updateField('bb', $event)"
        :got="got"
        @update:got="updateField('got', $event)"
      />
      <div>score GPT-ALT: <span>{{ scoreGPTALT }}</span></div>
      <div>score INR: <span>{{ scoreINR }}</span></div>
      <div>score BB: <span>{{ scoreBB }}</span></div>
      <div>score GOT-AST: <span>{{ scoreGOTAST }}</span></div>
      <div>MEAF-GPT {{ day }}DPO: <span>{{ meafGPT }}</span></div>
      <div>MEAF-GOT {{ day }}DPO: <span>{{ meafGOT }}</span></div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input.vue';

export default {
  components: {
    Input
  },
  props: {
    day: {
      type: Number,
      required: true
    },
    constants: {
      type: Object,
      required: true
    },
    calculatedData: {
      type: Object,
      default: () => ({
        scoreGPTALT: '',
        scoreINR: '',
        scoreBB: '',
        scoreGOTAST: '',
        meafGPT: '',
        meafGOT: ''
      })
    }
  },
  data() {
    return {
      gpt: '',
      inr: '',
      bb: '',
      got: '',
      scoreGPTALT: '',
      scoreINR: '',
      scoreBB: '',
      scoreGOTAST: '',
      meafGPT: '',
      meafGOT: ''
    };
  },
  watch: {
    calculatedData: {
      handler(newVal) {
        this.scoreGPTALT = newVal.scoreGPTALT;
        this.scoreINR = newVal.scoreINR;
        this.scoreBB = newVal.scoreBB;
        this.scoreGOTAST = newVal.scoreGOTAST;
        this.meafGPT = newVal.meafGPT;
        this.meafGOT = newVal.meafGOT;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    updateField(field, value) {
      this[field] = value;
      this.$emit('update-data', { day: this.day, field, value });
    }
  }
};
</script>

<style scoped>
/* Agrega cualquier estilo adicional aquí */
</style>