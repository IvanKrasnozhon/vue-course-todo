<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['add'])

const text = ref('')

function onSubmit() {
    if(!text.value.trim() && text.value.trim().length <= 0 )
        return;

    const _text = text.value.trim()
    emit('add', _text)
    text.value = ''
}

</script>

<template>
    <form @submit.prevent="onSubmit" class="flex gap-2 text-lg text-[#dfd0b8]">
        <input type="text" v-model="text" data-testid="task-input" class="bg-[#393e46] border rounded-md border-none p-2 w-[100%]">
        <button  data-testid="add-button" class="w-12 text-xl font-black border border-solid  rounded-md border-[#ffd700] p-2">+</button>
    </form>
</template>