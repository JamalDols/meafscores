<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col">
      <label class="font-medium text-sm">ALT max until day {{ day }}</label>
      <input :value="gpt" @input="$emit('update:gpt', $event.target.value)" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'gpt' + day" placeholder="ALT max">
    </div>
    <div class="flex flex-col">
      <label class="font-medium text-sm">INR max until day {{ day }}</label>
      <input :value="inr" @input="$emit('update:inr', $event.target.value)" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'inr' + day" placeholder="INR max">
    </div>

    <div class="flex">
        <div class="flex flex-col">
          <label class="font-medium text-sm">Billirrubin day {{ day }}</label>
          <input :value="bbValue" @input="updateBB($event.target.value)" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'bb' + day" :placeholder="bbPlaceholder">
        </div>
      <div class="flex flex-col gap-1">
        <button :class="{'text-xs duration-300  bg-blue-500 text-white': unit === 'mg/dL', 'text-xs duration-300  bg-gray-200 text-black': unit !== 'mg/dL'}" @click="convertToMgDl" class="rounded-sm py-1 px-2 ml-2">mg/dL</button>
        <button :class="{'text-xs duration-300  bg-blue-500 text-white': unit === 'umol/L', 'text-xs duration-300  bg-gray-200 text-black': unit !== 'umol/L'}" @click="convertToUmol" class="rounded-sm py-1 px-2 ml-2">umol/L</button>
      </div>
    </div>


    <div class="flex flex-col">
      <label class="font-medium text-sm">AST max until day {{ day }}</label>
    <input :value="got" @input="$emit('update:got', $event.target.value)" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'got' + day" placeholder="AST max">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: Number,
      required: true
    },
    gpt: {
      type: [Number, String],
      required: true
    },
    inr: {
      type: [Number, String],
      required: true
    },
    bb: {
      type: [Number, String],
      required: true
    },
    got: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      bbValue: this.bb,
      bbPlaceholder: 'BB (umol/L)',
      unit: 'umol/L'
    };
  },
  methods: {
    convertToUmol() {
      if (this.unit === 'mg/dL') {
        this.bbValue = (parseFloat(this.bbValue) * 17.1).toFixed(2);
        this.unit = 'umol/L';
        this.bbPlaceholder = 'BB (umol/L)';
        this.$emit('update:bb', this.bbValue);
      }
    },
    convertToMgDl() {
      if (this.unit === 'umol/L') {
        this.bbValue = (parseFloat(this.bbValue) / 17.1).toFixed(2);
        this.unit = 'mg/dL';
        this.bbPlaceholder = 'BB (mg/dL)';
        this.$emit('update:bb', this.bbValue);
      }
    },
    updateBB(value) {
      this.bbValue = value;
      this.$emit('update:bb', value);
    }
  },
  watch: {
    bb(value) {
      this.bbValue = value;
    }
  }
};
</script>

<style scoped>
input {
  max-width: 120px;
}
</style>