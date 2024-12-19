<template>
  <div class="">
    <span class="text-2xl font-bold block mb-2 text-brand-900"
      >Day {{ day }}</span
    >
    <div
      :id="'day' + day"
      class="border border-brand-100 p-4 rounded-lg flex-grow-0 flex-shrink basis-auto bg-white"
    >
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
        <div class="flex flex-col gap-2">
          <div>
            score ALT: <span>{{ scoreALT }}</span>
          </div>
          <div>
            score INR: <span>{{ scoreINR }}</span>
          </div>
          <div>
            score BB: <span>{{ scoreBB }}</span>
          </div>
          <div>
            score AST: <span>{{ scoreAST }}</span>
          </div>
          <div>
            MEAF-ALT {{ day }}DPO: <span>{{ meafALT }}</span>
          </div>
          <div>
            MEAF-AST {{ day }}DPO: <span>{{ meafAST }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/Input.vue";

export default {
  components: {
    Input,
  },
  props: {
    day: {
      type: Number,
      required: true,
    },
    constants: {
      type: Object,
      required: true,
    },
    calculatedData: {
      type: Object,
      default: () => ({
        scoreALT: "",
        scoreINR: "",
        scoreBB: "",
        scoreAST: "",
        meafALT: "",
        meafAST: "",
      }),
    },
  },
  data() {
    return {
      gpt: "",
      inr: "",
      bb: "",
      got: "",
      scoreALT: "",
      scoreINR: "",
      scoreBB: "",
      scoreAST: "",
      meafALT: "",
      meafAST: "",
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
      immediate: true,
    },
  },
  methods: {
    updateField(field, value) {
      this[field] = value;
      this.$emit("update-data", { day: this.day, field, value });
    },
  },
};
</script>

<style scoped>
/* Agrega cualquier estilo adicional aquí */
</style>
