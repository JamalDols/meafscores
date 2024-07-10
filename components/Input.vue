<template>
    <div>
      <input :value="gpt" @input="$emit('update:gpt', $event.target.value)" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'gpt' + day" placeholder="GPT-ALT max">
      <input :value="inr" @input="$emit('update:inr', $event.target.value)" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'inr' + day" placeholder="INR max">
      <div class="flex items-center">
        <input :value="bbValue" @input="updateBB($event.target.value)" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'bb' + day" :placeholder="bbPlaceholder">
        <button :class="{'bg-blue-500 text-white': unit === 'umol/L', 'bg-gray-200 text-black': unit !== 'umol/L'}" @click="convertToUmol" class="rounded-sm py-1 px-2 ml-2">umol/L</button>
        <button :class="{'bg-blue-500 text-white': unit === 'mg/dL', 'bg-gray-200 text-black': unit !== 'mg/dL'}" @click="convertToMgDl" class="rounded-sm py-1 px-2 ml-2">mg/dL</button>
      </div>
      <input :value="got" @input="$emit('update:got', $event.target.value)" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" :name="'got' + day" placeholder="GOT-AST max">
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
  .bg-blue-500 {
    background-color: #4299e1;
  }
  
  .text-white {
    color: #ffffff;
  }
  
  .bg-gray-200 {
    background-color: #edf2f7;
  }
  
  .text-black {
    color: #000000;
  }
  
  button {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  </style>