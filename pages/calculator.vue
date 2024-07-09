<template>
    <div class="container mx-auto grid-cols-12 grid px-4 gap-10">
      <div class="col-span-12 flex gap-8">
        <DayInput :day="2" :constants="constants2DPO" />
        <DayInput :day="3" :constants="constants3DPO" />
        <DayInput :day="4" :constants="constants4DPO" />
        <DayInput :day="5" :constants="constants5DPO" />
      </div>
    </div>
  </template>
  
  <script>
  import DayInput from '@/components/DayInput.vue';
  
  export default {
    components: {
      DayInput
    },
    data() {
      return {
        constants2DPO: {
          gptB: -2.0125491, gptD: 3.2831146, gptE: 549.5562336,
          inrB: -5.0120686, inrD: 3.293744, inrE: 1.9530051,
          bbB: -1.9272168, bbD: 3.3797542, bbE: 3.2702441,
          gotB: -2.1489028, gotD: 3.2382656, gotE: 745.2758055
        },
        constants3DPO: {
          gptB: -2.001, gptD: 3.287, gptE: 565.189,
          inrB: -4.996, inrD: 3.294, inrE: 1.958,
          bbB: -1.907, bbD: 3.414, bbE: 3.584,
          gotB: -2.140, gotD: 3.241, gotE: 749.212
        },
        constants4DPO: {
          gptB: -2.012, gptD: 3.284, gptE: 567.397,
          inrB: -5.000, inrD: 3.292, inrE: 1.959,
          bbB: -1.872, bbD: 3.504, bbE: 4.587,
          gotB: -2.141, gotD: 3.239, gotE: 748.930
        },
        constants5DPO: {
          gptB: -2.029, gptD: 3.286, gptE: 565.942,
          inrB: -5.019, inrD: 3.288, inrE: 1.956,
          bbB: -1.781, bbD: 3.609, bbE: 5.559,
          gotB: -2.148, gotD: 3.243, gotE: 746.883
        }
      };
    }
  };
  </script>
  
  <style scoped>
  /* Styles for the main view */
  </style>