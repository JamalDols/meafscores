<template>
  <div class="">
    <div
      class="h-full w-full fixed top-0 left-0 z-0"
      style="
        background: linear-gradient(180deg, #fbfdfd 0%, #badff3 100%);
        z-index: -1;
      "
    ></div>
    <AppHeader />
    <div class="py-[120px]">
      <NuxtPage />
    </div>

    <!-- <section class="fixed w-full pointer-events-none top-0 left-0 h-screen opacity-15">
        <div class="container grid-cols-12 grid gap-4 h-full mx-auto">
          <div v-for="index in 12" :key="index" class="col-span-1 bg-red-500 h-full"></div>
        </div>
      </section> -->
    <div
      ref="breakpointDiv"
      class="fixed bottom-0 right-0 p-4 bg-black-900 text-white z-50"
    ></div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const breakpointDiv = ref(null);

const updateBreakpoint = () => {
  const width = window.innerWidth;
  let breakpoint;

  if (width >= 1536) {
    breakpoint = "2xl";
  } else if (width >= 1280) {
    breakpoint = "xl";
  } else if (width >= 1024) {
    breakpoint = "lg";
  } else if (width >= 768) {
    breakpoint = "md";
  } else if (width >= 640) {
    breakpoint = "sm";
  } else {
    breakpoint = "";
  }

  if (breakpointDiv.value) {
    breakpointDiv.value.textContent = `${breakpoint} (${width}px)`;
  }
};

onMounted(() => {
  updateBreakpoint();
  window.addEventListener("resize", updateBreakpoint);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateBreakpoint);
});
</script>
