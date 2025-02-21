<template>
  <div class="container mx-auto grid-cols-12 grid px-4 gap-10">
    <div class="col-span-12 flex justify-center text-[#0086CF]">
      <div
        v-for="(day, index) in visibleDays"
        :key="index"
        class="p-6 border-b text-sm text-nowrap border-[#0086CF] cursor-pointer opacity-40 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-[#0086CF] after:bottom-0 after:left-0 after:opacity-0 after:transition-opacity-300 hover:after:opacity-100"
        @click="scrollToDay(day)"
      >
        Day {{ day }}
      </div>
    </div>
    <div class="col-span-12 flex gap-4 items-start overflow-scroll" id="DayInputWrapper" ref="dayInputWrapper">
      <DayInput
        v-for="day in visibleDays"
        :key="day"
        :day="day"
        :constants="constants['DPO' + day]"
        :calculatedData="calculatedData[day]"
        @update-data="updateData"
        @add-day-cloned="handleAddDayCloned"
      />
      <div v-if="visibleDays.length < 5" @click="addDay" class="addDayButton h-[1px] w-[1px] overflow-hidden p-0 fixed top-0 right-0">
        <div class="text-center">
          <span class="block">Add Another Day</span>
          <span class="block">Click to add calculations for a new day</span>
          <span class="text-xl font-medium block mb-4 text-brand-900">Add Day</span>
        </div>
      </div>
    </div>
    <div class="col-span-12 flex flex-col items-center">
      <button @click="calculateAll" class="bg-[#0086CF] text-2xl text-white rounded-lg py-3 px-4 mb-12">Calculate!</button>
      <div v-if="error" class="bg-red-200 text-red-500 rounded-lg py-2 px-4 text-left mb-10 text-sm">
        {{ error }}
      </div>

      <section id="resultsWrapper" class="flex gap-6 hidden">
        <div>
          <div class="title font-medium text-[#65747B] text-2xl">MEAF ALT</div>
          <div class="bg-white rounded-xl flex gap-12 justify-between py-4 px-3 mt-6 mb-12">
            <div
              v-for="day in visibleDays"
              :key="day"
              class="flex flex-col items-center relative after:content-[''] after:absolute after:h-16 after:w-[1px] after:bg-[#9ACFEC] after:-right-6 after:last:hidden"
            >
              <span class="text-base text-[#4E5E63]"> {{ day }}<span v-if="day === 2">nd</span><span v-else-if="day === 3">rd</span><span v-else>th</span> POD </span>

              <span class="text-3xl text-[#1B2428] font-semibold">{{ calculatedData[day].meafALT }}</span>
            </div>
          </div>
        </div>
        <div>
          <div class="title font-medium text-[#65747B] text-2xl">MEAF AST</div>
          <div class="bg-white rounded-xl flex gap-12 justify-between py-4 px-3 mt-6 mb-12">
            <div
              v-for="day in visibleDays"
              :key="day"
              class="flex flex-col items-center relative after:content-[''] after:absolute after:h-16 after:w-[1px] after:bg-[#9ACFEC] after:-right-6 after:last:hidden"
            >
              <span class="text-base text-[#4E5E63]"> {{ day }}<span v-if="day === 2">nd</span><span v-else-if="day === 3">rd</span><span v-else>th</span> POD </span>
              <span class="text-3xl text-[#1B2428] font-semibold">{{ calculatedData[day].meafAST }}</span>
            </div>
          </div>
        </div>
      </section>
      <div class="chart-container flex gap-8">
        <ScatterPlot :data="chartDataGPT" title="MEAF ALT" :maxX="Math.max(...visibleDays)" />
        <ScatterPlot :data="chartDataGOT" title="MEAF AST" :maxX="Math.max(...visibleDays)" />
      </div>
    </div>
  </div>
  <div class="fixed top-0 right-0 opacity-45">
    <button @click="clickAddDayButtons" class="bg-blue-500 text-white rounded-lg py-3 px-4 mb-4">Add Day 5 Times</button>
    <button @click="clickAddDefaultValuesButtons" class="bg-red-500 text-white rounded-lg py-3 px-4 mb-4">Add Default Values 5 Times</button>
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
      calculatedData: {},
      chartDataGPT: [],
      chartDataGOT: [],
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
        this.$nextTick(() => {
          const newDayElement = document.querySelector(`#day${nextDay}`);
          if (newDayElement) {
            newDayElement.style.transition = "opacity 0.8s";
            newDayElement.style.opacity = 0;
            setTimeout(() => {
              newDayElement.style.opacity = 1;
            }, 0);
          }
        });
      }
      if (this.visibleDays.length === 4) {
        document.querySelector(".addDayButton").classList.add("hidden");
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
          const gptScore = Number(this.calculateScore(gpt, constants.gptB, constants.gptD, constants.gptE)).toFixed(2);
          const inrScore = Number(this.calculateScore(inr, constants.inrB, constants.inrD, constants.inrE)).toFixed(2);
          const bbScore = Number(this.calculateScore(bb, constants.bbB, constants.bbD, constants.bbE)).toFixed(2);
          const gotScore = Number(this.calculateScore(got, constants.gotB, constants.gotD, constants.gotE)).toFixed(2);

          const meafALT = (parseFloat(gptScore) + parseFloat(inrScore) + parseFloat(bbScore)).toFixed(2);
          const meafAST = (parseFloat(inrScore) + parseFloat(bbScore) + parseFloat(gotScore)).toFixed(2);

          this.calculatedData[day] = {
            scoreALT: gptScore,
            scoreINR: inrScore,
            scoreBB: bbScore,
            scoreAST: gotScore,
            meafALT,
            meafAST,
          };

          this.chartDataGPT.push({ x: day, y: parseFloat(meafALT) });
          this.chartDataGOT.push({ x: day, y: parseFloat(meafAST) });
          document.getElementById("resultsWrapper").classList.remove("hidden");
        } else {
          this.error = `Faltan datos para el día ${day}`;
        }
      });
    },
    handleAddDayCloned(event) {
      this.addDay();
      event.target.remove();
      const clonedText = document.querySelector(".addDayClonedText");
      if (clonedText) {
        clonedText.remove();
      }
    },
    //TODO: Hacer que esto funcione
    scrollToDay(day) {
      this.$nextTick(() => {
        console.log("scrolling to day", day);
        const dayInputWrapper = this.$refs.dayInputWrapper;

        const dayInput = document.getElementById("day" + this.day);

        if (dayInputWrapper && dayInput) {
          console.log(`dayInputWrapper`, dayInputWrapper);
          dayInputWrapper.scrollLeft = dayInputWrapper.scrollWidth;
          const dayInputWidth = dayInput.offsetWidth;
          const gap = parseInt(window.getComputedStyle(dayInputWrapper).gap) || 0;
          dayInputWrapper.scrollLeft += dayInputWidth + gap;
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

    clickAddDayButtons() {
      const buttons = document.querySelectorAll("[data-addday]");
      this.clickButtonsSequentially(buttons, 5);
    },
    clickAddDefaultValuesButtons() {
      const buttons = document.querySelectorAll("[data-adddefaultvalues]");
      this.clickButtonsSequentially(buttons, 5);
    },
    clickButtonsSequentially(buttons, times) {
      let count = 0;
      const interval = setInterval(() => {
        if (count < times && count < buttons.length) {
          buttons[count].click();
          count++;
        } else {
          clearInterval(interval);
        }
      }, 100);
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
}
</style>
