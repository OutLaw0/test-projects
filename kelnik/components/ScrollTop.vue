<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

function updateVisibility() {
	const scrollable = document.documentElement.scrollHeight > document.documentElement.clientHeight
	visible.value = scrollable && window.scrollY > 300
}

function scrollTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
	updateVisibility()
	window.addEventListener('scroll', updateVisibility, { passive: true })
	window.addEventListener('resize', updateVisibility)
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', updateVisibility)
	window.removeEventListener('resize', updateVisibility)
})
</script>

<template>
	<div class="scroll-top" v-show="visible">
		<button class="button btn-secondary" @click="scrollTop" aria-label="Наверх">Наверх</button>
	</div>
</template> 