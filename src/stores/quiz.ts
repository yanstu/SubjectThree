import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { questions as originalQuestions, Question } from '../data/questions';

export const useQuizStore = defineStore('quiz', () => {
  // 状态
  const shuffledQuestions = ref<Question[]>([]);
  const currentQuestionIndex = ref(0);
  const score = ref(0);
  const selectedAnswers = ref<number[]>([]);
  const showFeedback = ref(false);
  const showResult = ref(false);
  const answeredQuestions = ref<boolean[]>([]);
  const showingQuestion = ref(false);

  // 计算属性
  const currentQuestion = computed((): Question => {
    return shuffledQuestions.value[currentQuestionIndex.value];
  });

  const isCorrect = computed((): boolean => {
    if (!currentQuestion.value || selectedAnswers.value.length !== currentQuestion.value.correctAnswers.length) {
      return false;
    }
    
    return selectedAnswers.value.every(answer => 
      currentQuestion.value.correctAnswers.includes(answer)
    ) && currentQuestion.value.correctAnswers.every(answer => 
      selectedAnswers.value.includes(answer)
    );
  });

  const progress = computed((): number => {
    const answeredCount = answeredQuestions.value.filter(Boolean).length;
    return (answeredCount / shuffledQuestions.value.length) * 100;
  });

  // 方法
  const shuffleQuestions = () => {
    const questionsArray = [...originalQuestions];
    for (let i = questionsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questionsArray[i], questionsArray[j]] = [questionsArray[j], questionsArray[i]];
    }
    shuffledQuestions.value = questionsArray;
    answeredQuestions.value = new Array(shuffledQuestions.value.length).fill(false);
  };

  const toggleOption = (index: number) => {
    if (showFeedback.value) return;
    
    if (selectedAnswers.value.includes(index)) {
      selectedAnswers.value = selectedAnswers.value.filter(i => i !== index);
    } else {
      selectedAnswers.value.push(index);
    }
  };

  const checkAnswer = () => {
    showFeedback.value = true;
    
    if (isCorrect.value) {
      score.value++;
    }
    
    answeredQuestions.value[currentQuestionIndex.value] = true;
  };

  const nextQuestion = () => {
    if (currentQuestionIndex.value < shuffledQuestions.value.length - 1) {
      currentQuestionIndex.value++;
      resetQuestion();
    } else {
      showResult.value = true;
      showingQuestion.value = false;
    }
  };

  const resetQuestion = () => {
    selectedAnswers.value = [];
    showFeedback.value = false;
  };

  const startQuiz = () => {
    shuffleQuestions();
    score.value = 0;
    currentQuestionIndex.value = 0;
    showResult.value = false;
    showingQuestion.value = true;
    resetQuestion();
  };

  const restartQuiz = () => {
    shuffleQuestions();
    currentQuestionIndex.value = 0;
    score.value = 0;
    showResult.value = false;
    showingQuestion.value = true;
    resetQuestion();
  };

  return {
    // 状态
    shuffledQuestions,
    currentQuestionIndex,
    score,
    selectedAnswers,
    showFeedback,
    showResult,
    answeredQuestions,
    showingQuestion,
    
    // 计算属性
    currentQuestion,
    isCorrect,
    progress,
    
    // 方法
    shuffleQuestions,
    toggleOption,
    checkAnswer,
    nextQuestion,
    resetQuestion,
    startQuiz,
    restartQuiz
  };
}); 
