<template>
  <div class="result-screen">
    <h2>测试结果</h2>
    <div class="result-stats">
      <div class="result-item">
        <div class="result-label">总题数:</div>
        <div class="result-value">{{ quizStore.shuffledQuestions.length }}</div>
      </div>
      <div class="result-item">
        <div class="result-label">正确数:</div>
        <div class="result-value">{{ quizStore.score }}</div>
      </div>
      <div class="result-item">
        <div class="result-label">得分率:</div>
        <div class="result-value">{{ percentage }}%</div>
      </div>
      <div class="result-gauge">
        <div class="gauge-fill" :style="{ width: `${percentage}%` }"></div>
      </div>
    </div>
    <button class="btn restart-btn" @click="restart">重新开始</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useQuizStore } from '../stores/quiz';

export default defineComponent({
  name: 'ResultView',
  emits: ['restart'],
  setup(props, { emit }) {
    const quizStore = useQuizStore();
    
    const percentage = computed(() => {
      return Math.round((quizStore.score / quizStore.shuffledQuestions.length) * 100);
    });

    const restart = () => {
      emit('restart');
    };

    return {
      quizStore,
      percentage,
      restart
    };
  }
});
</script> 
