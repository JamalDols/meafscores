<template>
  <div ref="chart" class="chart bg-white p-4 rounded-xl relative">
    <div ref="tooltip" class="tooltip hidden absolute bg-gray-500 text-white px-2 py-1 text-sm rounded"></div>
  </div>
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

      // Escala X con etiquetas "Day 2", "Day 3", etc.
      const x = d3.scaleLinear().domain([2, this.maxX]).range([0, width]);

      // Escala Y ajustada de 4 a 6
      const y = d3.scaleLinear().domain([4, 6]).range([height, 0]);

      // Ejes personalizados con color gris
      const xAxis = d3
        .axisBottom(x)
        .tickValues(d3.range(2, this.maxX + 1))
        .tickFormat((d) => `Day ${d}`);

      const yAxis = d3
        .axisLeft(y)
        .tickValues([4.0, 4.5, 5.0, 5.5, 6.0]) // Solo 5 líneas
        .tickFormat(d3.format(".1f"));

      // Agregar líneas horizontales en el fondo con color gris
      svg
        .append("g")
        .attr("class", "grid")
        .call(d3.axisLeft(y).tickValues([4.0, 4.5, 5.0, 5.5, 6.0]).tickSize(-width).tickFormat(""))
        .selectAll("line")
        .style("stroke", "rgb(204, 204, 204)");

      // Agregar ejes con color gris
      const xAxisGroup = svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

      xAxisGroup.selectAll("text").style("fill", "rgb(204, 204, 204)"); // Cambia color de texto
      xAxisGroup.selectAll(".domain, .tick line").style("stroke", "rgb(204, 204, 204)"); // Cambia color de líneas

      const yAxisGroup = svg.append("g").call(yAxis);
      yAxisGroup.selectAll("text").style("fill", "rgb(204, 204, 204)"); // Cambia color de texto
      yAxisGroup.selectAll(".domain, .tick line").style("stroke", "rgb(204, 204, 204)"); // Cambia color de líneas

      // Agregar etiquetas a los ejes con color gris
      // svg
      //   .append("text")
      //   .attr("text-anchor", "middle")
      //   .attr("x", width / 2)
      //   .attr("y", height + margin.bottom - 10)
      //   .text("Days")
      //   .attr("fill", "rgb(204, 204, 204)");

      // svg
      //   .append("text")
      //   .attr("text-anchor", "middle")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", -margin.left + 20)
      //   .attr("x", -height / 2)
      //   .text(this.title)
      //   .attr("fill", "rgb(204, 204, 204)");

      // Línea de la gráfica
      const line = d3
        .line()
        .x((d) => x(d.x))
        .y((d) => y(d.y))
        .curve(d3.curveBasis);

      // Área sombreada con degradado
      const area = d3
        .area()
        .x((d) => x(d.x))
        .y0(height)
        .y1((d) => y(d.y))
        .curve(d3.curveBasis);

      svg.append("path").datum(this.data).attr("fill", "url(#area-gradient)").attr("d", area);

      svg.append("path").datum(this.data).attr("fill", "none").attr("stroke", "#0086CF").attr("stroke-width", 2).attr("d", line);

      // Tooltip
      const tooltip = d3.select(this.$refs.tooltip);

      // Puntos en la línea con tooltip
      svg
        .selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", 5)
        .style("fill", "#0086CF")
        .on("mouseover", (event, d) => {
          tooltip
            .classed("hidden", false)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 30}px`)
            .text(`Value: ${d.y}`);
        })
        .on("mouseout", () => {
          tooltip.classed("hidden", true);
        });
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
.tooltip {
  position: absolute;
  background-color: rgba(50, 50, 50, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  pointer-events: none;
}
.hidden {
  display: none;
}
</style>
