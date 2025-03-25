<template>
  <div 
    class="option"
    :class="{
      'selected': selected,
      'correct': showFeedback && isCorrect,
      'wrong': showFeedback && selected && !isCorrect
    }"
    @click="select"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QuizOption',
  props: {
    text: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    showFeedback: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const select = () => {
      emit('select', props.index);
    };

    return {
      select
    };
  }
});
</script> 
