<template>
  <div class="flex flex-col gap-6 relative">
    <div class="flex gap-3 justify-between items-center">
      <!-- ALT Max -->
      <div class="flex flex-col">
        <label class="font-medium text-md text-[#23363C] mb-1">
          ALT max until day {{ day }}
        </label>
        <input
          :value="gpt"
          @input="$emit('update:gpt', $event.target.value)"
          type="number"
          minlength="1"
          maxlength="3"
          class="bg-[#F8FCFD] rounded-md py-2 px-2 text-brand-800 placeholder:!text-[#9DA7AA] focus:outline-none focus:outline-brand-500 outline-1 outline-offset-0"
          :name="'gpt' + day"
          placeholder="Enter ALT max value"
        />
      </div>
      <div>
        <span class="translate-y-4 block opacity-50 text-[#23363C] text-sm"
          >OR / AND</span
        >
      </div>

      <!-- AST Max -->
      <div class="flex flex-col">
        <label class="font-medium text-md text-[#23363C] mb-1">
          AST max until day {{ day }}
        </label>
        <input
          :value="got"
          @input="$emit('update:got', $event.target.value)"
          type="number"
          minlength="1"
          maxlength="3"
          class="bg-[#F8FCFD] rounded-md py-2 px-2 text-brand-800 placeholder:!text-[#9DA7AA] focus:outline-none focus:outline-brand-500 outline-1 outline-offset-0"
          :name="'got' + day"
          placeholder="Enter AST max value"
        />
      </div>
    </div>

    <div class="flex gap-8 justify-between">
      <!-- Bilirrubina -->
      <div class="flex gap-4 w-full">
        <div class="flex flex-col w-full">
          <label class="font-medium text-md text-[#23363C] mb-1">
            Bilirubin day {{ day }}
          </label>
          <div class="flex items-center gap-2">
            <input
              v-model="bilirubin"
              type="number"
              minlength="1"
              maxlength="5"
              class="bg-[#F8FCFD] rounded-md py-2 px-2 text-brand-800 placeholder:!text-[#9DA7AA] flex-1 focus:outline-none focus:outline-brand-800"
              placeholder="Enter bilirubin value"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <label class="font-medium text-md text-[#23363C] mb-1"> Unit </label>
          <div class="flex gap-2">
            <button
              @click="setUnit('mg/dL')"
              :class="{
                'bg-[#0086CF] duration-300 text-white text-xs h-10 pointer-events-none':
                  unit === 'mg/dL',
                'bg-[#9CB7C5] duration-300 text-black text-xs h-10 hover:bg-[#07A8FF] hover:text-white':
                  unit !== 'mg/dL',
              }"
              class="rounded-md py-2 px-4"
            >
              mg/dL
            </button>
            <button
              @click="setUnit('umol/L')"
              :class="{
                'bg-[#0086CF] duration-300 text-white text-xs h-10 pointer-events-none':
                  unit === 'umol/L',
                'bg-[#9CB7C5] duration-300 text-black text-xs h-10 hover:bg-[#07A8FF] hover:text-white':
                  unit !== 'umol/L',
              }"
              class="rounded-md py-2 px-4"
            >
              umol/L
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-8 justify-between">
      <!-- INR Max -->
      <div class="flex flex-col">
        <label class="font-medium text-md text-[#23363C] mb-1">
          INR max until day {{ day }}
        </label>
        <input
          :value="inr"
          @input="$emit('update:inr', $event.target.value)"
          type="number"
          minlength="1"
          maxlength="3"
          class="bg-[#F8FCFD] rounded-md py-2 px-2 text-brand-800 placeholder:!text-[#9DA7AA] focus:outline-none focus:outline-brand-500 outline-1 outline-offset-0"
          :name="'inr' + day"
          placeholder="Enter INR max value"
        />
      </div>
    </div>

    <!-- Add Default Values Button -->
    <div class="flex flex-col absolute">
      <button
        @click="addDefaultValues"
        class="bg-green-500 text-white rounded-sm py-0 px-0 absolute w-[1px] h-[1px] overflow-hidden"
        data-AddDefaultValues
      >
        Add Default Values
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: Number,
      required: true,
    },
    gpt: {
      type: [Number, String],
      required: true,
    },
    inr: {
      type: [Number, String],
      required: true,
    },
    got: {
      type: [Number, String],
      required: true,
    },
    bb: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      bilirubin: this.bb, // Valor de bilirrubina inicial
      unit: "mg/dL", // Unidad inicial por defecto
    };
  },
  methods: {
    setUnit(unit) {
      if (this.unit !== unit) {
        this.unit = unit;
        this.convertUnit();
      }
    },
    convertUnit() {
      // Cambiar entre unidades al seleccionar en el dropdown
      if (this.unit === "mg/dL") {
        // Convertir de umol/L a mg/dL
        this.bilirubin = this.bilirubin
          ? (parseFloat(this.bilirubin) / 17.1).toFixed(2)
          : "";
      } else if (this.unit === "umol/L") {
        // Convertir de mg/dL a umol/L
        this.bilirubin = this.bilirubin
          ? (parseFloat(this.bilirubin) * 17.1).toFixed(2)
          : "";
      }
    },
    addDefaultValues() {
      // Asignar valores por defecto
      this.$emit("update:gpt", 123); // ALT
      this.$emit("update:inr", 35); // INR
      this.bilirubin = "50"; // Bilirrubina
      this.unit = "mg/dL"; // Seleccionar mg/dL por defecto
      this.convertUnit(); // Convertir a la unidad actual
      this.$emit("update:bb", this.bilirubin); // Emitir bilirrubina
      this.$emit("update:got", 158); // AST
    },
  },
  watch: {
    bb(value) {
      // Si cambia la prop bb desde el padre, sincronizar con el campo
      this.bilirubin = value;
    },
  },
};
</script>

<style scoped>
input::placeholder {
  color: var(--brand-300);
}
</style>
