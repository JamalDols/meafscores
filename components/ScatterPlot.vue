<template>
  <div ref="chart" class="chart bg-white p-4 rounded-xl"></div>
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

      const svg = d3.select(this.$refs.chart).append("svg").attr("width", containerWidth).attr("height", containerHeight).append("g").attr("transform", `translate(${margin.left},${margin.top})`);

      // Definir el degradado
      const defs = svg.append("defs");

      const gradient = defs.append("linearGradient").attr("id", "area-gradient").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "rgba(162,211,237, 0.8)").attr("stop-opacity", 1);

      gradient.append("stop").attr("offset", "100%").attr("stop-color", "rgba(162,211,237, 0.2)").attr("stop-opacity", 0);

      // Escala x que empieza en el día 2
      const x = d3.scaleLinear().domain([2, this.maxX]).range([0, width]);

      // Escala y (fija entre 0 y 10)
      const y = d3.scaleLinear().domain([0, 10]).range([height, 0]);

      // Ejes
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(
          d3
            .axisBottom(x)
            .tickValues(d3.range(2, this.maxX + 1)) // Ajusta para días que empiezan en 2
            .tickFormat(d3.format("d"))
        );

      svg.append("g").call(d3.axisLeft(y));

      // Leyendas de los ejes
      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 10)
        .attr("class", "text-red-500");

      svg
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -margin.top - height / 2 + 20)
        .text(this.title);

      // Gráfica de línea con área sombreada
      const line = d3
        .line()
        .x((d) => x(d.x))
        .y((d) => y(d.y))
        .curve(d3.curveBasis);

      const area = d3
        .area()
        .x((d) => x(d.x))
        .y0(height)
        .y1((d) => y(d.y))
        .curve(d3.curveBasis);

      // Área sombreada con degradado
      svg
        .append("path")
        .datum(this.data)
        .attr("fill", "url(#area-gradient)") // Usar el degradado
        .attr("d", area);

      // Línea
      svg
        .append("path")
        .datum(this.data)
        .attr("fill", "none")
        .attr("stroke", "#0086CF") // Color de la línea
        .attr("stroke-width", 2)
        .attr("d", line);

      // Puntos
      svg
        .selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", 5)
        .style("fill", "#0086CF");
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
  width: 50%;
  height: 400px;
}
</style>
