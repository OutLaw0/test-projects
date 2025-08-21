<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
import { useApartmentsStore } from '@/stores/apartments'
import { storeToRefs } from 'pinia'

const store = useApartmentsStore()
const { filters, loading, meta } = storeToRefs(store)

const roomsList = [1, 2, 3, 4]

const priceEl = ref<HTMLDivElement | null>(null)
const areaEl = ref<HTMLDivElement | null>(null)
let priceSlider: noUiSlider.API | null = null
let areaSlider: noUiSlider.API | null = null

function onRoomClick(room: number) {
	if (store.locked || loading.value) return
	store.setRooms([room])
	store.applyFilters()
}

function resetAll() {
	if (store.locked || loading.value) return
	store.setOrder('none')
	store.resetFilters()
	// Reset slider UI positions
	if (priceSlider) {
		priceSlider.set([meta.value.priceMin, meta.value.priceMax])
	}
	if (areaSlider) {
		areaSlider.set([meta.value.areaMin, meta.value.areaMax])
	}
	store.applyFilters()
}

function initSliders() {
	if (priceEl.value && !priceSlider) {
		priceSlider = noUiSlider.create(priceEl.value, {
			start: [filters.value.price[0], filters.value.price[1]],
			connect: true,
			range: { min: meta.value.priceMin, max: meta.value.priceMax },
			step: 10000,
			tooltips: true,
			format: {
				to: (v: number) => Math.round(v).toLocaleString('ru-RU'),
				from: (v: string) => Number(v.replace(/\s/g, ''))
			}
		})
		priceSlider.on('set', (values: (string | number)[]) => {
			if (store.locked || loading.value) return
			const raw = values.map(v => Number(String(v).replace(/[^\d]/g, '')))
			store.setPriceRange([raw[0], raw[1]] as [number, number])
			store.applyFilters()
		})
	}

	if (areaEl.value && !areaSlider) {
		areaSlider = noUiSlider.create(areaEl.value, {
			start: [filters.value.area[0], filters.value.area[1]],
			connect: true,
			range: { min: meta.value.areaMin, max: meta.value.areaMax },
			step: 1,
			tooltips: true,
			format: {
				to: (v: number) => Math.round(v).toString(),
				from: (v: string) => Number(v)
			}
		})
		areaSlider.on('set', (values: (string | number)[]) => {
			if (store.locked || loading.value) return
			const raw = values.map(v => Number(String(v).replace(/[^\d]/g, '')))
			store.setAreaRange([raw[0], raw[1]] as [number, number])
			store.applyFilters()
		})
	}
}

watch(meta, () => {
	if (priceSlider) priceSlider.updateOptions({ range: { min: meta.value.priceMin, max: meta.value.priceMax } } as any, false)
	if (areaSlider) areaSlider.updateOptions({ range: { min: meta.value.areaMin, max: meta.value.areaMax } } as any, false)
})

onMounted(() => { initSliders() })
</script>

<template>
	<div class="filter">
		<div class="rooms">
			<button
				v-for="room in roomsList"
				:key="room"
				type="button"
				class="pill"
				:class="{ active: filters.rooms[0] === room }"
				:disabled="loading || store.locked"
				@click="onRoomClick(room)"
			>{{ room }}к</button>
		</div>
		<div class="group">
			<div class="label">Стоимость квартиры, ₽</div>
			<div ref="priceEl"></div>
		</div>
		<div class="group">
			<div class="label">Площадь, м²</div>
			<div ref="areaEl"></div>
		</div>
		<div class="foot">
			<button class="reset" type="button" :disabled="loading || store.locked" @click="resetAll">Сбросить параметры ✕</button>
		</div>
	</div>
</template>

<style scoped>
.filter { background: transparent; }
.rooms { display:flex; gap: 12px; padding: 8px 6px; }
.pill { min-width: 44px; height: 44px; border-radius: 22px; border: 1px solid #d8efe3; background:#fff; color:#0b254b; font-weight:600; cursor:pointer; }
.pill.active { background:#3bb273; border-color:#3bb273; color:#fff; }
.group { padding: 12px 6px; }
.label { color:#0b254b; font-weight:600; margin-bottom:50px; font-size: 14px; }
.foot { padding: 8px 6px; }
.reset { appearance:none; background:none; border:none; color:#6b7280; cursor:pointer; font-size: 14px; }
</style> 