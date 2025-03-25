<template>
  <div class="container">
    <header>
      <h1>科目三灯光模拟考试</h1>
      
      <quiz-header 
        v-if="quizStore.showingQuestion"
        :current-question="quizStore.currentQuestionIndex + 1"
        :total-questions="quizStore.shuffledQuestions.length"
        :score="quizStore.score"
        :progress="quizStore.progress"
        :time-left="timeLeft"
      />
    </header>
    
    <main>
      <transition name="fade-slide" mode="out-in">
        <welcome-view 
          v-if="!quizStore.showResult && !quizStore.showingQuestion"
          @start-quiz="startQuizWithTime"
        />

        <quiz-view 
          v-else-if="quizStore.showingQuestion && !quizStore.showResult" 
          :time-left="timeLeft"
          @time-out="timeOutAnswer"
          @check-answer="checkAnswerWithTimer"
          @next-question="nextQuestionWithTimer"
        />
        
        <result-view 
          v-else-if="quizStore.showResult" 
          @restart="restartQuizWithTimer"
        />
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuizStore } from './stores/quiz';
import { useTimer } from './composables/useTimer';

import WelcomeView from './views/WelcomeView.vue';
import QuizView from './views/QuizView.vue';
import ResultView from './views/ResultView.vue';
import QuizHeader from './components/QuizHeader.vue';

export default defineComponent({
  name: 'App',
  components: {
    WelcomeView,
    QuizView,
    ResultView,
    QuizHeader
  },
  setup() {
    const quizStore = useQuizStore();
    const { timeLimit, timeLeft, startTimer, stopTimer } = useTimer();

    // 时间耗尽自动判为失败
    const timeOutAnswer = () => {
      quizStore.showFeedback = true;
      quizStore.answeredQuestions[quizStore.currentQuestionIndex] = true;
      stopTimer();
    };

    // 重写部分Store方法以集成计时器功能
    const nextQuestionWithTimer = () => {
      if (quizStore.currentQuestionIndex < quizStore.shuffledQuestions.length - 1) {
        quizStore.nextQuestion();
        startTimer(timeOutAnswer);
      } else {
        quizStore.showResult = true;
        quizStore.showingQuestion = false;
      }
    };

    const startQuizWithTime = (time: number) => {
      timeLimit.value = time;
      quizStore.startQuiz();
      startTimer(timeOutAnswer);
    };

    const restartQuizWithTimer = () => {
      quizStore.restartQuiz();
      startTimer(timeOutAnswer);
    };
    
    const checkAnswerWithTimer = () => {
      quizStore.checkAnswer();
      stopTimer();
    };

    return {
      quizStore,
      timeLeft,
      timeOutAnswer,
      nextQuestionWithTimer,
      startQuizWithTime,
      restartQuizWithTimer,
      checkAnswerWithTimer
    };
  }
});
</script>

<style>
:root {
  --primary-color: #3498db;
  --secondary-color: #2980b9;
  --correct-color: #2ecc71;
  --wrong-color: #e74c3c;
  --background-color: #f9f9f9;
  --card-bg: #ffffff;
  --text-color: #333333;
  --border-color: #e0e0e0;
  --accent-color: #9b59b6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans SC', sans-serif;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  margin-bottom: 20px;
  color: var(--primary-color);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-out;
}

.progress-container {
  width: 100%;
  height: 10px;
  background-color: var(--border-color);
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  border-radius: 5px;
  transition: width 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.stats {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 500;
  margin-top: 15px;
}

.timer {
  background-color: var(--primary-color);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  transition: all 0.3s;
}

.timer-warning {
  background-color: var(--wrong-color);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

main {
  background-color: var(--card-bg);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
  min-height: 400px;
  transition: all 0.3s ease;
}

.welcome-screen {
  text-align: center;
  padding: 30px 0;
}

.welcome-screen h2 {
  color: var(--primary-color);
  margin-bottom: 15px;
}

.welcome-screen p {
  color: #666;
  margin-bottom: 30px;
}

.settings-panel {
  margin: 20px auto;
  padding: 15px;
  background-color: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
  max-width: 400px;
}

.time-setting {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.time-setting label {
  margin-right: 10px;
  font-weight: 500;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.time-setting input {
  padding: 10px;
  border: 2px solid var(--primary-color);
  border-radius: 6px;
  width: 80px;
  text-align: center;
  font-size: 16px;
  background-color: white;
  transition: all 0.3s;
  -moz-appearance: textfield;
}

.time-setting input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
}

.time-setting input::-webkit-outer-spin-button,
.time-setting input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input-controls {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}

.input-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  margin: 2px 0;
}

.input-btn:hover {
  background-color: var(--secondary-color);
}

.features {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 20px;
}

.feature {
  background-color: rgba(52, 152, 219, 0.1);
  padding: 15px;
  border-radius: 8px;
  width: 120px;
  text-align: center;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.quiz-header {
  animation: fadeIn 0.5s ease-out;
}

.question-text {
  margin-bottom: 20px;
  animation: fadeIn 0.5s ease-out;
}

.question-text h2 {
  font-size: 20px;
  font-weight: 500;
}

.options-container {
  margin-bottom: 20px;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
}

.option {
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);
  transform: scale(0);
  transition: transform 0.3s ease-out;
  pointer-events: none;
}

.option:hover {
  background-color: #eef5fa;
  transform: translateY(-2px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.option:active::before {
  transform: scale(2);
}

.option.selected {
  background-color: #d4e6f1;
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.option.correct {
  background-color: rgba(46, 204, 113, 0.2);
  border-color: var(--correct-color);
  animation: correct 0.5s;
}

.option.wrong {
  background-color: rgba(231, 76, 60, 0.2);
  border-color: var(--wrong-color);
  animation: wrong 0.5s;
}

@keyframes correct {
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
}

@keyframes wrong {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  margin: 0 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.btn::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: -100%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
  transition: left 0.5s;
}

.btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}

.btn:hover::after {
  left: 100%;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn:disabled::after {
  display: none;
}

.submit-btn {
  width: 100%;
  max-width: 200px;
}

.start-btn {
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  font-weight: 500;
  padding: 12px 30px;
  margin-top: 10px;
}

.next-btn {
  margin-top: 15px;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
}

.feedback {
  background-color: #f7f7f7;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.feedback-header {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 18px;
}

.correct-feedback {
  color: var(--correct-color);
}

.wrong-feedback {
  color: var(--wrong-color);
}

.explanation {
  font-size: 15px;
  margin-bottom: 15px;
  line-height: 1.5;
  color: #555;
}

.correct-answers {
  margin: 15px 0;
  font-weight: 500;
  padding: 10px;
  background-color: rgba(46, 204, 113, 0.1);
  border-radius: 5px;
}

.result-screen {
  text-align: center;
  padding: 30px 0;
  animation: fadeIn 0.5s ease-out;
}

.result-screen h2 {
  color: var(--primary-color);
  margin-bottom: 25px;
  font-size: 26px;
}

.result-stats {
  margin: 30px auto;
  max-width: 350px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 18px;
}

.result-label {
  font-weight: 500;
}

.result-value {
  font-weight: 700;
  color: var(--primary-color);
}

.result-gauge {
  height: 20px;
  background-color: #eee;
  border-radius: 10px;
  margin: 25px 0;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.gauge-fill {
  height: 100%;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  border-radius: 10px;
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.restart-btn {
  margin-top: 20px;
  padding: 12px 30px;
  font-weight: 500;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
}

footer {
  text-align: center;
  margin-top: 20px;
  padding: 10px;
  color: #777;
  font-size: 14px;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.flip-list-move {
  transition: transform 0.5s;
}

.flip-list-enter-active {
  transition: all 0.5s ease;
}

.flip-list-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}

.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  
  header {
    margin-bottom: 20px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .question-text h2 {
    font-size: 18px;
  }
  
  .option {
    padding: 12px;
  }
  
  .btn {
    padding: 10px 20px;
    font-size: 15px;
  }
  
  .options-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .features {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 22px;
  }
  
  main {
    padding: 15px;
  }
  
  .stats {
    font-size: 16px;
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }
  
  .question-text h2 {
    font-size: 16px;
  }
  
  .option {
    padding: 10px;
    font-size: 15px;
  }
  
  .explanation {
    font-size: 14px;
  }
  
  .options-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .time-setting {
    flex-direction: column;
    gap: 5px;
  }
}
</style> 