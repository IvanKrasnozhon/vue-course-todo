<script setup lang="ts">
import { ref, type Ref } from 'vue';
import AddForm from './components/AddForm.vue';
import Todos from './components/Todos.vue';
import type Task from './models/Task';
import { useNotes } from './composables/useTasks'

const notes = useNotes()
const { addTask, removeTask, toggleDone } = useNotes()

const tasks: Ref<Task[]> = notes.tasks


function onAddTask(text: string) {
  if (text.trim() == '')
    return;

  addTask(text)
}

function remove(id : number)
{
  console.log(`removing: ${id}`)
  removeTask(id)
}

function changeState(id: number)
{
  console.log(`change state: ${id}`)
  toggleDone(id)
}
</script>

<template>
  <div class="container flex flex-col gap-6 py-8">
    <AddForm v-on:add="onAddTask" style="height: 50px; width: 100%;"></AddForm>
    <Todos :tasks="tasks" v-on:change-state="changeState" v-on:remove="remove" class=""></Todos>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  width: 480px;
  color: #fcf8dd;
}
</style>
