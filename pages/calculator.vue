<template>
    <div class="container mx-auto grid-cols-12 grid px-4 gap-10">
        <div class="col-span-3">
            <span class="text-lg font-bold text-center block mb-4">Legend</span>
            <div class="flex flex-col gap-4 justify-between h-full">
                <span>GPT-ALT max</span>
                <span>INR max</span>
                <span>BB (umol/L)</span>
                <span>GOT-AST max</span>
            </div>
        </div>
        <div class="col-span-3" id="day2">
            <span class="text-lg font-bold text-center block mb-4">Day 2</span>
            <div class="flex flex-col gap-4 justify-between h-full">
                <input v-model="gpt2" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" name="gpt2" placeholder="GPT-ALT max">
                <input v-model="inr2" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" name="inr2" placeholder="INR max">
                <input v-model="bb2" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" name="bb2" placeholder="BB (umol/L)">
                <input v-model="got2" type="number" minlength="1" maxlength="3" class="bg-black-200 rounded-sm py-2 px-2" name="got2" placeholder="GOT-AST max">
                <button @click="calculate" class="bg-green-500 text-white rounded-sm py-3 px-4">Calculate!</button>
                <div>score GPT-ALT: <span>{{ scoreGPTALT2 }}</span></div>
                <div>score INR: <span>{{ scoreINR2 }}</span></div>
                <div>score BB: <span>{{ scoreBB2 }}</span></div>
                <div>score GOT-AST: <span>{{ scoreGOTAST2 }}</span></div>
                <div>MEAF-GPT 2DPO: <span>{{ meafGPT2 }}</span></div>
                <div>MEAF-GOT 2DPO: <span>{{ meafGOT2 }}</span></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gpt2: null,
            inr2: null,
            bb2: null,
            got2: null,
            scoreGPTALT2: '',
            scoreINR2: '',
            scoreBB2: '',
            scoreGOTAST2: '',
            meafGPT2: '',
            meafGOT2: ''
        };
    },
    methods: {
        calculate() {
            const DPO2gptB = -2.0125491;
            const DPO2gptD = 3.2831146;
            const DPO2gptE = 549.5562336;
            
            const DPO2inrB = -5.0120686;
            const DPO2inrD = 3.293744;
            const DPO2inrE = 1.9530051;
            
            const DPO2bbB = -1.9272168;
            const DPO2bbD = 3.3797542;
            const DPO2bbE = 3.2702441;
            
            const DPO2gotB = -2.1489028;
            const DPO2gotD = 3.2382656;
            const DPO2gotE = 745.2758055;

            const gpt2Score = this.calculateScore(this.gpt2, DPO2gptB, DPO2gptD, DPO2gptE);
            this.scoreGPTALT2 = gpt2Score;
            
            const inr2Score = this.calculateScore(this.inr2, DPO2inrB, DPO2inrD, DPO2inrE);
            this.scoreINR2 = inr2Score;
            
            const bb2Score = this.calculateScore(this.bb2, DPO2bbB, DPO2bbD, DPO2bbE);
            this.scoreBB2 = bb2Score;
            
            const got2Score = this.calculateScore(this.got2, DPO2gotB, DPO2gotD, DPO2gotE);
            this.scoreGOTAST2 = got2Score;
            
            this.meafGPT2 = parseFloat(this.scoreGPTALT2) + parseFloat(this.scoreINR2) + parseFloat(this.scoreBB2);
            this.meafGOT2 = parseFloat(this.scoreINR2) + parseFloat(this.scoreBB2) + parseFloat(this.scoreGOTAST2);
        },
        calculateScore(value, B, D, E) {
            const score = D / (1 + Math.exp(B * (Math.log(value) - Math.log(E))));
            return score.toFixed(3);
        }
    }
};
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
}
</style>