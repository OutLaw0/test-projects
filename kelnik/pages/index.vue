<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useApartmentsStore } from '@/stores/apartments'

const apartmentsStore = useApartmentsStore()
const { apartments, total, canLoadMore, loading } = storeToRefs(apartmentsStore)

const heading = computed(() => `Квартиры`)

onMounted(() => {
	apartmentsStore.fetchApartments({ reset: true })
})

function loadMore() {
	apartmentsStore.loadMore()
}
</script>

<template>
	<div>
		<header class="header container">
			<h1 style="font-size:40px; line-height:1.2; margin: 0 0 12px 0; color:#0b254b;">{{ heading }}</h1>
		</header>

		<section class="section container layout">
			<div>
				<ApartmentsTable :items="apartments" />
				<div class="load-more" v-if="canLoadMore">
					<button class="button btn-secondary" :disabled="loading" @click="loadMore">
						Загрузить ещё
					</button>
				</div>
			</div>
			<aside>
				<div class="filter-card">
					<FilterPanel />
				</div>
			</aside>
		</section>

		<ScrollTop />
	</div>
</template>

<style scoped>
.layout { display:grid; gap: 24px; align-items:start; }
@media (min-width: 960px) { .layout { grid-template-columns: 1fr 400px; } }
@media (max-width: 959px) { .layout { grid-template-columns: 1fr 400px; } }
.filter-card { background:#eaf6ef; border-radius: 16px; padding: 45px; position: sticky; top: 16px; }
</style> 