<template>
  <div class="quiz-container">
    <div class="question-text">
      <h2>{{ currentQuestion.title }}</h2>
    </div>
    
    <div class="options-container">
      <transition-group name="flip-list" tag="div" class="options-grid">
        <quiz-option
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          :text="option"
          :index="index"
          :selected="quizStore.selectedAnswers.includes(index)"
          :is-correct="currentQuestion.correctAnswers.includes(index)"
          :show-feedback="quizStore.showFeedback"
          @select="toggleOption"
        />
      </transition-group>
    </div>
    
    <div class="buttons">
      <button 
        class="btn submit-btn" 
        @click="checkAnswer" 
        :disabled="quizStore.selectedAnswers.length === 0 || quizStore.showFeedback"
      >
        提交答案
      </button>
    </div>
    
    <transition name="fade">
      <quiz-feedback
        v-if="quizStore.showFeedback"
        :is-correct="quizStore.isCorrect"
        :explanation="currentQuestion.explanation"
        :correct-options="getCorrectOptionTexts()"
        :is-last-question="quizStore.currentQuestionIndex >= quizStore.shuffledQuestions.length - 1"
        @next="nextQuestion"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect } from 'vue';
import { useQuizStore } from '../stores/quiz';
import QuizOption from '../components/QuizOption.vue';
import QuizFeedback from '../components/QuizFeedback.vue';

export default defineComponent({
  name: 'QuizView',
  components: {
    QuizOption,
    QuizFeedback
  },
  props: {
    timeLeft: {
      type: Number,
      required: true
    }
  },
  emits: ['time-out', 'check-answer', 'next-question'],
  setup(props, { emit }) {
    const quizStore = useQuizStore();
    
    const currentQuestion = computed(() => quizStore.currentQuestion);

    const toggleOption = (index: number) => {
      quizStore.toggleOption(index);
    };

    const checkAnswer = () => {
      emit('check-answer');
    };

    const nextQuestion = () => {
      emit('next-question');
    };

    // 监听倒计时，当时间用完时触发超时事件
    watchEffect(() => {
      if (props.timeLeft === 0 && !quizStore.showFeedback) {
        emit('time-out');
      }
    });

    const getCorrectOptionTexts = () => {
      return currentQuestion.value.correctAnswers.map(
        index => currentQuestion.value.options[index]
      );
    };

    return {
      quizStore,
      currentQuestion,
      toggleOption,
      checkAnswer,
      nextQuestion,
      getCorrectOptionTexts
    };
  }
});
</script> 
