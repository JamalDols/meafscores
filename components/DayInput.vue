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
      <div>score ALT: <span>{{ scoreALT }}</span></div>
      <div>score INR: <span>{{ scoreINR }}</span></div>
      <div>score BB: <span>{{ scoreBB }}</span></div>
      <div>score AST: <span>{{ scoreAST }}</span></div>
      <div>MEAF-ALT {{ day }}DPO: <span>{{ meafALT }}</span></div>
      <div>MEAF-AST {{ day }}DPO: <span>{{ meafAST }}</span></div>
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
        scoreALT: '',
        scoreINR: '',
        scoreBB: '',
        scoreAST: '',
        meafALT: '',
        meafAST: ''
      })
    }
  },
  data() {
    return {
      gpt: '',
      inr: '',
      bb: '',
      got: '',
      scoreALT: '',
      scoreINR: '',
      scoreBB: '',
      scoreAST: '',
      meafALT: '',
      meafAST: ''
    };
  },
  watch: {
    calculatedData: {
      handler(newVal) {
        this.scoreALT = newVal.scoreALT;
        this.scoreINR = newVal.scoreINR;
        this.scoreBB = newVal.scoreBB;
        this.scoreAST = newVal.scoreAST;
        this.meafALT = newVal.meafALT;
        this.meafAST = newVal.meafAST;
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