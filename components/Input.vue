<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col">
      <label class="font-medium text-xs text-brand-900 mb-1"
        >ALT max until day {{ day }}</label
      >
      <input
        :value="gpt"
        @input="$emit('update:gpt', $event.target.value)"
        type="number"
        minlength="1"
        maxlength="3"
        class="bg-brand-200 rounded-md py-2 px-2 placeholder-brand-300"
        :name="'gpt' + day"
        placeholder="Enter ALT max value"
      />
    </div>
    <div class="flex flex-col">
      <label class="font-medium text-xs text-brand-900 mb-1"
        >INR max until day {{ day }}</label
      >
      <input
        :value="inr"
        @input="$emit('update:inr', $event.target.value)"
        type="number"
        minlength="1"
        maxlength="3"
        class="bg-brand-200 rounded-md py-2 px-2 placeholder-brand-300"
        :name="'inr' + day"
        placeholder="Enter INR max value"
      />
    </div>

    <div class="flex">
      <div class="flex flex-col">
        <label class="font-medium text-xs text-brand-900 mb-1"
          >Billirrubin day {{ day }}</label
        >
        <input
          :value="bbValue"
          @input="updateBB($event.target.value)"
          type="number"
          minlength="1"
          maxlength="5"
          class="bg-brand-200 rounded-md py-2 px-2 placeholder-brand-300"
          :name="'bb' + day"
          :placeholder="bbPlaceholder"
        />
      </div>
      <div class="flex flex-col gap-1">
        <button
          :class="{
            'text-xs duration-300 bg-blue-500 text-white': unit === 'mg/dL',
            'text-xs duration-300 bg-gray-200 text-black': unit !== 'mg/dL',
          }"
          @click="convertToMgDl"
          class="rounded-md py-1 px-2 ml-2"
        >
          mg/dL
        </button>
        <button
          :class="{
            'text-xs duration-300 bg-blue-500 text-white': unit === 'umol/L',
            'text-xs duration-300 bg-gray-200 text-black': unit !== 'umol/L',
          }"
          @click="convertToUmol"
          class="rounded-md py-1 px-2 ml-2"
        >
          umol/L
        </button>
      </div>
    </div>

    <div class="flex flex-col">
      <label class="font-medium text-xs text-brand-900 mb-1"
        >AST max until day {{ day }}</label
      >
      <input
        :value="got"
        @input="$emit('update:got', $event.target.value)"
        type="number"
        minlength="1"
        maxlength="3"
        class="bg-brand-200 rounded-md py-2 px-2 placeholder-brand-300"
        :name="'got' + day"
        placeholder="Enter AST max value"
      />
    </div>

    <div class="flex flex-col">
      <button
        @click="addDefaultValues"
        class="bg-green-500 text-white rounded-sm py-2 px-4 mt-4"
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
    bb: {
      type: [Number, String],
      required: true,
    },
    got: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      bbValue: this.bb, // Almacenamos el valor tal como es ingresado
      bbPlaceholder: "BB (umol/L)",
      unit: "umol/L", // umol/L es la unidad por defecto
    };
  },
  methods: {
    convertToUmol() {
      if (this.unit === "mg/dL") {
        this.bbValue = (parseFloat(this.bbValue) / 0.0113096584483149).toFixed(
          2
        );
        this.unit = "umol/L";
        this.bbPlaceholder = "BB (umol/L)";
        this.$emit("update:bb", this.bbValue);
      }
    },
    convertToMgDl() {
      if (this.unit === "umol/L") {
        this.bbValue = (parseFloat(this.bbValue) * 0.0113096584483149).toFixed(
          2
        );
        this.unit = "mg/dL";
        this.bbPlaceholder = "BB (mg/dL)";
        this.$emit("update:bb", this.bbValue);
      }
    },
    updateBB(value) {
      // Al escribir, solo actualizamos el valor internamente sin convertirlo
      this.bbValue = value;
      this.$emit("update:bb", value);
    },
    addDefaultValues() {
      this.$emit("update:gpt", 123);
      this.$emit("update:inr", 35);
      this.bbValue = 50; // umol/L
      this.$emit("update:bb", this.bbValue.toFixed(2));
      this.$emit("update:got", 158);
    },
  },
  watch: {
    bb(value) {
      this.bbValue = value; // Actualizamos bbValue si cambia la prop
    },
  },
};
</script>

<style scoped>
input {
  max-width: 120px;
}
</style>
