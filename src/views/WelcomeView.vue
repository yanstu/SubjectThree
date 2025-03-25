<template>
  <div class="welcome-screen">
    <h2>欢迎参加科目三灯光模拟考试</h2>
    <p>请先设置每题答题时间，然后点击"开始考试"按钮</p>
    
    <div class="time-setting">
      <label for="time-limit">每题答题时间(秒):</label>
      <div class="input-container">
        <input
          type="number"
          id="time-limit"
          v-model="timeLimit"
          min="5"
          max="60"
          step="5"
        />
        <div class="input-controls">
          <button class="input-btn" @click="incrementTime(5)">+</button>
          <button class="input-btn" @click="decrementTime(5)">-</button>
        </div>
      </div>
    </div>
    
    <button class="btn start-btn" @click="startQuiz">开始考试</button>
    
    <div class="features">
      <div class="feature">
        <div class="feature-icon">🔀</div>
        <div class="feature-text">题目随机排序</div>
      </div>
      <div class="feature">
        <div class="feature-icon">⏱️</div>
        <div class="feature-text">计时作答</div>
      </div>
      <div class="feature">
        <div class="feature-icon">📊</div>
        <div class="feature-text">详细解析</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTimer } from '../composables/useTimer';

export default defineComponent({
  name: 'WelcomeView',
  emits: ['start-quiz'],
  setup(props, { emit }) {
    const { timeLimit, incrementTime, decrementTime } = useTimer();

    const startQuiz = () => {
      emit('start-quiz', timeLimit.value);
    };

    return {
      timeLimit,
      incrementTime,
      decrementTime,
      startQuiz
    };
  }
});
</script> 
