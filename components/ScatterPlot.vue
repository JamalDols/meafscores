<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    maxX: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.createChart();
    window.addEventListener("resize", this.createChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.createChart);
    if (this.chart) {
      this.chart.dispose();
    }
  },
  methods: {
    createChart() {
      const margin = { top: 20, right: 30, bottom: 40, left: 50 };

      const containerWidth = this.$refs.chart.clientWidth;
      const containerHeight = this.$refs.chart.clientHeight;

      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;

      d3.select(this.$refs.chart).selectAll("*").remove();

      const svg = d3
        .select(this.$refs.chart)
        .append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear().domain([1, this.maxX]).range([0, width]);

      const y = d3.scaleLinear().domain([0, 10]).range([height, 0]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(
          d3
            .axisBottom(x)
            .tickValues(d3.range(1, this.maxX + 1))
            .tickFormat(d3.format("d"))
        );

      svg.append("g").call(d3.axisLeft(y));

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.top + 20)
        .text("Days after liver transplantation");

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top - height / 2 + 20)
        .text(this.title);

      svg
        .selectAll("dot")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", 5)
        .style("fill", "#69b3a2");
    },
  },
  watch: {
    data() {
      this.createChart();
    },
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px; /* Puedes ajustar esta altura según tus necesidades */
}
</style>
