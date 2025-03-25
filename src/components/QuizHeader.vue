<template>
  <div class="quiz-header">
    <div class="progress-container">
      <div :style="{ width: `${progress}%` }" class="progress-bar"></div>
    </div>
    <div class="stats">
      <span>{{ currentQuestion }}/{{ totalQuestions }}</span>
      <span class="score-container">得分: {{ score }}</span>
      <span class="timer" :class="{ 'timer-warning': timeLeft <= 5 }">
        剩余时间: {{ timeLeft }}秒
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuizHeader',
  props: {
    currentQuestion: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    progress: {
      type: Number,
      required: true
    },
    timeLeft: {
      type: Number,
      required: true
    }
  }
});
</script> 
