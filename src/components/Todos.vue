<script setup lang="ts">
import type Task from '../models/Task.ts'

const emit = defineEmits(['remove', 'changeState'])

defineProps<{
  tasks: Task[]
}>()

function removeTask(id: number) {
  emit('remove', id)
}

function changeState(id: number) {
  emit('changeState', id)
}
</script>

<template>
  <ul v-if="tasks.length > 0" data-testid="tasks" >
    <transition-group name="neon-fade" tag="ul" class="task-list flex flex-col gap-3">
      <li v-for="task in tasks" :key="task.id"
        class="text-xl flex justify-between items-center border p-4 border-[#948979]">
        <div class="flex space-x-2 items-center">
          <input type="checkbox" name="" id="" v-model="task.done" @input="changeState(task.id)" class="w-5 h-5">
          <div>{{ task.task }}</div>
        </div>
        <button @click.prevent="removeTask(task.id)" class="p-2 border  rounded-md">Remove</button>
      </li>
    </transition-group>
  </ul>
  <div v-else data-testid="no-tasks-message">
    There are no tasks added!
  </div>
</template>
<style scoped>
.neon-fade-enter-from,
.neon-fade-leave-to {
  opacity: 0;
  box-shadow: 0 0 0px #0ff;
}

.neon-fade-enter-active {
  animation: neonIn 0.6s ease forwards;
}

.neon-fade-leave-active {
  animation: neonOut 0.5s ease forwards;
}

/* Ключевые кадры */
@keyframes neonIn {
  0% {
    opacity: 0;
    box-shadow: 0 0 0px #0ff;
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 12px #0ff, 0 0 24px #0ff;
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 6px #0ff;
  }
}

@keyframes neonOut {
  0% {
    opacity: 1;
    box-shadow: 0 0 6px #0ff;
  }
  50% {
    box-shadow: 0 0 12px #0ff, 0 0 24px #0ff;
  }
  100% {
    opacity: 0;
    box-shadow: 0 0 0px #0ff;
  }
}

</style>