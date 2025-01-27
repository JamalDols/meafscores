<template>
  <div>
    <div class="title font-medium text-[#65747B] text-2xl">{{ title }}</div>
    <div
      class="bg-white rounded-xl flex gap-12 justify-between py-4 px-3 mt-6 mb-12"
    >
      <div
        v-for="day in visibleDays"
        :key="day"
        class="flex flex-col items-center relative after:content-[''] after:absolute after:h-16 after:w-[1px] after:bg-[#9ACFEC] after:-right-6 after:last:hidden"
      >
        <span class="text-base text-[#4E5E63]">{{ day }}th POD</span>
        <span class="text-3xl text-[#1B2428] font-semibold">{{
          data[day]
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    visibleDays: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Agrega cualquier estilo adicional aquí */
</style>
