<template>
    <div :id="'day' + day" class="flex-grow-0 flex-shrink  basis-full">
      <span class="text-lg font-bold text-center block mb-4">Day {{ day }}</span>
      <div class="flex flex-col gap-4 justify-between h-full">
        <input v-model="gpt" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'gpt' + day" placeholder="GPT-ALT max">
        <input v-model="inr" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'inr' + day" placeholder="INR max">
        <input v-model="bb" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'bb' + day" placeholder="BB (umol/L)">
        <input v-model="got" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'got' + day" placeholder="GOT-AST max">
        <button @click="calculate" class="bg-green-500 text-white rounded-sm py-3 px-4">Calculate!</button>
        <div>score GPT-ALT: <span>{{ scoreGPTALT }}</span></div>
        <div>score INR: <span>{{ scoreINR }}</span></div>
        <div>score BB: <span>{{ scoreBB }}</span></div>
        <div>score GOT-AST: <span>{{ scoreGOTAST }}</span></div>
        <div>MEAF-GPT {{ day }}DPO: <span>{{ meafGPT }}</span></div>
        <div>MEAF-GOT {{ day }}DPO: <span>{{ meafGOT }}</span></div>
        <div>
          <ScatterPlot :data="chartData" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ScatterPlot from '@/components/ScatterPlot.vue';
  
  export default {
    components: {
      ScatterPlot
    },
    props: {
      day: {
        type: Number,
        required: true
      },
      constants: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        gpt: null,
        inr: null,
        bb: null,
        got: null,
        scoreGPTALT: '',
        scoreINR: '',
        scoreBB: '',
        scoreGOTAST: '',
        meafGPT: '',
        meafGOT: '',
        chartData: []
      };
    },
    methods: {
      calculate() {
        const { gptB, gptD, gptE, inrB, inrD, inrE, bbB, bbD, bbE, gotB, gotD, gotE } = this.constants;
  
        const gptScore = this.calculateScore(this.gpt, gptB, gptD, gptE);
        this.scoreGPTALT = gptScore;
  
        const inrScore = this.calculateScore(this.inr, inrB, inrD, inrE);
        this.scoreINR = inrScore;
  
        const bbScore = this.calculateScore(this.bb, bbB, bbD, bbE);
        this.scoreBB = bbScore;
  
        const gotScore = this.calculateScore(this.got, gotB, gotD, gotE);
        this.scoreGOTAST = gotScore;
  
        this.meafGPT = parseFloat(gptScore) + parseFloat(inrScore) + parseFloat(bbScore);
        this.meafGOT = parseFloat(inrScore) + parseFloat(bbScore) + parseFloat(gotScore);
  
        this.chartData = [
          { x: this.day, y: this.meafGPT },
          { x: this.day, y: this.meafGOT }
        ];
      },
      calculateScore(value, B, D, E) {
        if (value === null || value === '') {
          return 0;
        }
        const score = D / (1 + Math.exp(B * (Math.log(value) - Math.log(E))));
        return score.toFixed(3);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles for the component */
  </style>