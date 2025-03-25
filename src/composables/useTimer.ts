import { ref, onUnmounted } from 'vue';

export function useTimer() {
  const timeLimit = ref(10);
  const timeLeft = ref(0);
  const timer = ref<number | null>(null);
  const isTimerRunning = ref(false);

  const incrementTime = (value: number) => {
    if (timeLimit.value + value <= 60) {
      timeLimit.value += value;
    }
  };

  const decrementTime = (value: number) => {
    if (timeLimit.value - value >= 5) {
      timeLimit.value -= value;
    }
  };

  const startTimer = (onTimeOut?: () => void) => {
    if (timer.value) clearInterval(timer.value);
    
    timeLeft.value = timeLimit.value;
    isTimerRunning.value = true;
    
    timer.value = window.setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        // 时间到，执行超时回调
        if (onTimeOut) {
          onTimeOut();
        }
        stopTimer();
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
      isTimerRunning.value = false;
    }
  };

  // 组件卸载时清除计时器
  onUnmounted(() => {
    stopTimer();
  });

  return {
    timeLimit,
    timeLeft,
    isTimerRunning,
    incrementTime,
    decrementTime,
    startTimer,
    stopTimer
  };
} 
