<template>
  <div class="feedback">
    <div class="feedback-header">
      <span :class="isCorrect ? 'correct-feedback' : 'wrong-feedback'">
        {{ isCorrect ? '回答正确!' : '回答错误!' }}
      </span>
    </div>
    <div class="explanation">{{ explanation }}</div>
    <div class="correct-answers" v-if="!isCorrect">
      <p>正确答案是：</p>
      <span v-for="(option, i) in correctOptions" :key="i">
        {{ i > 0 ? '、' : '' }}{{ option }}
      </span>
    </div>
    <button class="btn next-btn" @click="next">
      {{ isLastQuestion ? '查看结果' : '下一题' }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuizFeedback',
  props: {
    isCorrect: {
      type: Boolean,
      required: true
    },
    explanation: {
      type: String,
      required: true
    },
    correctOptions: {
      type: Array as () => string[],
      required: true
    },
    isLastQuestion: {
      type: Boolean,
      default: false
    }
  },
  emits: ['next'],
  setup(props, { emit }) {
    const next = () => {
      emit('next');
    };

    return {
      next
    };
  }
});
</script> 
