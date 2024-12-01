<template>
  <div class="container mx-auto grid-cols-12 grid px-4 gap-10">
    <div class="col-span-12 flex gap-8">
      <DayInput
        v-for="day in visibleDays"
        :key="day"
        :day="day"
        :constants="constants['DPO' + day]"
        :calculatedData="calculatedData[day]"
        @update-data="updateData"
      />
    </div>
    <div class="col-span-12 flex flex-col items-center">
      <button
        v-if="visibleDays.length < 5"
        @click="addDay"
        class="bg-brand-500 text-white rounded-sm py-2 px-4 mb-4"
      >
        Add Day
      </button>
      <button
        @click="calculateAll"
        class="bg-green-500 text-white rounded-lg py-3 px-4 mb-4"
      >
        Calculate!
      </button>
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div class="chart-container">
        <ScatterPlot
          :data="chartDataGPT"
          title="MEAF ALT"
          :maxX="Math.max(...visibleDays)"
        />
        <ScatterPlot
          :data="chartDataGOT"
          title="MEAF AST"
          :maxX="Math.max(...visibleDays)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DayInput from "@/components/DayInput.vue";
import ScatterPlot from "@/components/ScatterPlot.vue";

export default {
  components: {
    DayInput,
    ScatterPlot,
  },
  data() {
    return {
      days: [2, 3, 4, 5],
      visibleDays: [2], // Inicialmente solo mostrar el día 2
      constants: {
        DPO2: {
          gptB: -2.0125491,
          gptD: 3.2831146,
          gptE: 549.5562336,
          inrB: -5.0120686,
          inrD: 3.293744,
          inrE: 1.9530051,
          bbB: -1.9272168,
          bbD: 3.3797542,
          bbE: 3.2702441,
          gotB: -2.1489028,
          gotD: 3.2382656,
          gotE: 745.2758055,
        },
        DPO3: {
          gptB: -2.001,
          gptD: 3.287,
          gptE: 565.189,
          inrB: -4.996,
          inrD: 3.294,
          inrE: 1.958,
          bbB: -1.907,
          bbD: 3.414,
          bbE: 3.584,
          gotB: -2.14,
          gotD: 3.241,
          gotE: 749.212,
        },
        DPO4: {
          gptB: -2.012,
          gptD: 3.284,
          gptE: 567.397,
          inrB: -5.0,
          inrD: 3.292,
          inrE: 1.959,
          bbB: -1.872,
          bbD: 3.504,
          bbE: 4.587,
          gotB: -2.141,
          gotD: 3.239,
          gotE: 748.93,
        },
        DPO5: {
          gptB: -2.029,
          gptD: 3.286,
          gptE: 565.942,
          inrB: -5.019,
          inrD: 3.288,
          inrE: 1.956,
          bbB: -1.781,
          bbD: 3.609,
          bbE: 5.559,
          gotB: -2.148,
          gotD: 3.243,
          gotE: 746.883,
        },
      },
      inputData: {},
      calculatedData: {
        2: {
          scoreALT: "",
          scoreINR: "",
          scoreBB: "",
          scoreAST: "",
          meafALT: "",
          meafAST: "",
        },
        3: {
          scoreALT: "",
          scoreINR: "",
          scoreBB: "",
          scoreAST: "",
          meafALT: "",
          meafAST: "",
        },
        4: {
          scoreALT: "",
          scoreINR: "",
          scoreBB: "",
          scoreAST: "",
          meafALT: "",
          meafAST: "",
        },
        5: {
          scoreALT: "",
          scoreINR: "",
          scoreBB: "",
          scoreAST: "",
          meafALT: "",
          meafAST: "",
        },
      },
      chartDataGPT: [],
      chartDataGOT: [],
      error: "",
    };
  },
  methods: {
    addDay() {
      if (this.visibleDays.length < 4) {
        const nextDay = this.days[this.visibleDays.length];
        this.visibleDays.push(nextDay);
      } else {
        this.error = "You can only add up to 4 days.";
      }
    },
    updateData({ day, field, value }) {
      if (!this.inputData[day]) {
        this.inputData[day] = {};
      }
      this.inputData[day][field] = value;
    },
    calculateAll() {
      this.chartDataGPT = [];
      this.chartDataGOT = [];
      this.error = "";

      this.visibleDays.forEach((day) => {
        const dayData = this.inputData[day];
        if (dayData && this.isComplete(dayData)) {
          const { gpt, inr, bb, got } = dayData;
          const constants = this.constants["DPO" + day];
          const gptScore = this.calculateScore(
            gpt,
            constants.gptB,
            constants.gptD,
            constants.gptE
          );
          const inrScore = this.calculateScore(
            inr,
            constants.inrB,
            constants.inrD,
            constants.inrE
          );
          const bbScore = this.calculateScore(
            bb,
            constants.bbB,
            constants.bbD,
            constants.bbE
          );
          const gotScore = this.calculateScore(
            got,
            constants.gotB,
            constants.gotD,
            constants.gotE
          );

          const meafALT =
            parseFloat(gptScore) + parseFloat(inrScore) + parseFloat(bbScore);
          const meafAST =
            parseFloat(inrScore) + parseFloat(bbScore) + parseFloat(gotScore);

          this.calculatedData[day] = {
            scoreALT: gptScore,
            scoreINR: inrScore,
            scoreBB: bbScore,
            scoreAST: gotScore,
            meafALT,
            meafAST,
          };

          this.chartDataGPT.push({ x: day, y: meafALT });
          this.chartDataGOT.push({ x: day, y: meafAST });
        } else {
          this.error = `Faltan datos para el día ${day}`;
        }
      });
    },
    isComplete(dayData) {
      return dayData.gpt && dayData.inr && dayData.bb && dayData.got;
    },
    calculateScore(value, B, D, E) {
      if (value === null || value === "" || isNaN(value)) {
        return 0;
      }
      const score = D / (1 + Math.exp(B * (Math.log(value) - Math.log(E))));
      return score.toFixed(3);
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
